import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Thread, Message } from './chat';
import { MessageService } from './message.service';
import * as _ from 'lodash';

@Injectable()
export class ThreadService {

  // `threads` is a observable that contains the most up to date list of threads
  threads: Observable<{ [key: string]: Thread }>;

  // `orderedThreads` contains a newest-first chronological list of threads
  orderedThreads: Observable<Thread[]>;

  // `currentThread` contains the currently selected thread
  currentThread: Subject<Thread> = new BehaviorSubject<Thread>(new Thread());

  private openWindowSubject = new Subject<boolean>();
  public openChatWindow = this.openWindowSubject.asObservable();

  // `currentThreadMessages` contains the set of messages for the currently
  // selected thread
  currentThreadMessages: Observable<Message[]>;

  constructor(public messagesService: MessageService) {

    this.threads = messagesService.messages
      .map( (messages: Message[]) => {
        const threads: {[key: string]: Thread} = {};
        // Store the message's thread in our accumulator `threads`
        messages.map((message: Message) => {
          threads[message.thread.id] = threads[message.thread.id] ||
            message.thread;

          // Cache the most recent message for each thread
          const messagesThread: Thread = threads[message.thread.id];
          if (!messagesThread.lastMessage ||
              messagesThread.lastMessage.sentAt < message.sentAt) {
            messagesThread.lastMessage = message;
          }
        });
        return threads;
      });

    this.orderedThreads = this.threads
      .map((threadGroups: { [key: string]: Thread }) => {
        const threads: Thread[] = _.values(threadGroups);
        return _.sortBy(threads, (t: Thread) => t.lastMessage.sentAt).reverse();
      });

    this.currentThreadMessages = this.currentThread
      .combineLatest(messagesService.messages,
                     (currentThread: Thread, messages: Message[]) => {
        if (currentThread && messages.length > 0) {
          return _.chain(messages)
            .filter((message: Message) =>
                    (message.thread.id === currentThread.id))
            .map((message: Message) => {
              message.isRead = true;
              return message; })
            .value();
        } else {
          return [];
        }
      });

    this.currentThread.subscribe(this.messagesService.markThreadAsRead);
  }

  setCurrentThread(newThread: Thread, openWnd: boolean = false): void {
    this.currentThread.next(newThread);
    this.openWindow(openWnd);
  }

  openWindow(status:boolean) {
    this.openWindowSubject.next(status);
  }
}

/*export const threadsServiceInjectables: Array<any> = [
  ThreadsService
];*/
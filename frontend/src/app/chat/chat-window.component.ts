import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../model/general';
//import { UsersService } from '../model/user.service';
import { UserDataService } from '../model/user-data.service';
import { Thread, Message } from '../model/chat';

import { ThreadService } from '../model/thread.service';
import { MessageService } from '../model/message.service';

@Component({
  selector: 'chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWindowComponent implements OnInit {
  messages: Observable<any>;
  currentThread: Thread;
  draftMessage: Message;
  currentUser: User;

  constructor(public _messageService: MessageService,
              public _threadService: ThreadService,
              public _userService: UserDataService,
              public el: ElementRef) {
  }

  ngOnInit(): void {
    this.messages = this._threadService.currentThreadMessages;

    this.draftMessage = new Message();

    this._threadService.currentThread.subscribe(
      (thread: Thread) => {
        this.currentThread = thread;
      });

    this._userService.currentUser
      .subscribe(
        (user: User) => {
          this.currentUser = user;
        });

    this.messages
      .subscribe(
        (messages: Array<Message>) => {
          setTimeout(() => {
            this.scrollToBottom();
          });
        });
  }

  onEnter(event: any): void {
    this.sendMessage();
    event.preventDefault();
  }

  sendMessage(): void {
    const m: Message = this.draftMessage;
    m.author = this.currentUser;
    m.thread = this.currentThread;
    m.isRead = true;
    this._messageService.addMessage(m);
    this.draftMessage = new Message();
  }

  scrollToBottom(): void {
    const scrollPane: any = this.el.nativeElement.querySelector('#chat-messages');
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }
}
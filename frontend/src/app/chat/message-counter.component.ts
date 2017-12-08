import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { Thread, Message } from "../model/chat";
import { ThreadService } from '../model/thread.service';
import { MessageService } from '../model/message.service';

import * as _ from 'lodash';

@Component({
  selector: 'message-count',
  templateUrl: './message-counter.component.html',
  styleUrls: ['./message-counter.component.css']
})

export class MessageCounterComponent implements OnInit {
  unreadMessagesCount: number = 0;

  constructor(
    private _router: Router,
    private _msgService: MessageService,
    private _threadService: ThreadService
  ) {}

  ngOnInit() {
    this._msgService.messages
      .combineLatest(
        this._threadService.currentThread,
        (messages: Message[], currentThread: Thread) => [currentThread, messages] )

      .subscribe(([currentThread, messages]: [Thread, Message[]]) => {
        this.unreadMessagesCount =
          _.reduce(
            messages,
            (sum: number, m: Message) => {
              const messageIsInCurrentThread: boolean = m.thread &&
                currentThread &&
                (currentThread.id === m.thread.id);
              // note: in a "real" app you should also exclude
              // messages that were authored by the current user b/c they've
              // already been "read"
              if (m && !m.isRead && !messageIsInCurrentThread) {
                sum = sum + 1;
              }
              return sum;
            }, 0);
      });
  }

  /*public viewCourse(courseId:string):void {
    this._router.navigate(['/course', courseId]);
  }

  public viewSchool(schoolId:string):void {
    this._router.navigate(['/school', schoolId]);
  }*/
}
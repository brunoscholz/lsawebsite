import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Thread } from '../model/chat';
import { ThreadService } from '../model/thread.service';

  //styleUrls: ['./threads.component.css']
@Component({
  selector: 'chat-threads',
  templateUrl: './threads.component.html',
})
export class ThreadsComponent {
  threads: Observable<any>;

  constructor(private _threadService: ThreadService) {
    this.threads = _threadService.orderedThreads;
  }
}
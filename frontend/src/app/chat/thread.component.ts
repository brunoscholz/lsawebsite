import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ThreadService } from '../model/thread.service';
import { Thread } from '../model/chat';

@Component({
  selector: 'chat-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class SingleThreadComponent implements OnInit {
  @Input() thread: Thread;
  selected = false;

  constructor(private _threadService: ThreadService) {
  }

  ngOnInit(): void {
    this._threadService.currentThread
      .subscribe( (currentThread: Thread) => {
        this.selected = currentThread &&
          this.thread &&
          (currentThread.id === this.thread.id);
      });
  }

  clicked(event: any): void {
    this._threadService.setCurrentThread(this.thread);
    event.preventDefault();
  }
}
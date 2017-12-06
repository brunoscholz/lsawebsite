import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { Observable } from 'rxjs';

import { UserDataService } from '../model/user-data.service';
import { ThreadService } from '../model/thread.service';
import { MessageService } from '../model/message.service';

import { Message, Thread } from '../model/chat';
import { User } from '../model/general';

@Component({
  selector: 'chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {
  @Input('message') message: Message;
  currentUser: User;
  incoming: boolean;

  constructor(public _userService: UserDataService) {
  }

  ngOnInit(): void {
    this._userService.currentUser
      .subscribe(
        (user: User) => {
          this.currentUser = user;
          if (this.message.author && user) {
            this.incoming = this.message.author.userId !== user.userId;
          }
        });
  }
}
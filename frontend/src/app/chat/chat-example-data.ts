/* tslint:disable:max-line-length */
import { ChatUser } from '../model/general';
import { Message, Thread } from '../model/chat';

import { MessageService } from '../model/message.service';
import { ThreadService } from '../model/thread.service';
import { UserDataService } from '../model/user-data.service';

import * as moment from 'moment';

// the person using the app us Juliet
const me: ChatUser      = new ChatUser('Juliet', 'assets/img/generic-avatar.png', 'admin');
const ladycap: ChatUser = new ChatUser('Lady Capulet', 'assets/img/avatars/female-avatar-2.png', 'staff');
const echo: ChatUser    = new ChatUser('Echo Bot', 'assets/img/avatars/male-avatar-1.png', 'bot');
const rev: ChatUser     = new ChatUser('Reverse Bot', 'assets/img/avatars/female-avatar-4.png', 'bot');
const wait: ChatUser    = new ChatUser('Waiting Bot', 'assets/img/logo.png', 'bot');

const tLadycap: Thread = new Thread('tLadycap', ladycap.name, ladycap.avatarSrc);
const tEcho: Thread    = new Thread('tEcho', echo.name, echo.avatarSrc);
const tRev: Thread     = new Thread('tRev', rev.name, rev.avatarSrc);
const tWait: Thread    = new Thread('tWait', wait.name, wait.avatarSrc);

const initialMessages: Array<Message> = [
  new Message({
    author: me,
    sentAt: moment().subtract(45, 'minutes').toDate(),
    text: 'Yet let me weep for such a feeling loss.',
    thread: tLadycap
  }),
  new Message({
    author: ladycap,
    sentAt: moment().subtract(20, 'minutes').toDate(),
    text: 'So shall you feel the loss, but not the friend which you weep for.',
    thread: tLadycap
  }),
  new Message({
    author: echo,
    sentAt: moment().subtract(1, 'minutes').toDate(),
    text: `I\'ll echo whatever you send me`,
    thread: tEcho
  }),
  new Message({
    author: rev,
    sentAt: moment().subtract(3, 'minutes').toDate(),
    text: `I\'ll reverse whatever you send me`,
    thread: tRev
  }),
  new Message({
    author: wait,
    sentAt: moment().subtract(4, 'minutes').toDate(),
    text: `I\'ll wait however many seconds you send to me before responding. Try sending '3'`,
    thread: tWait
  }),
];

export class ChatExampleData {
  static init(_messageService: MessageService,
              _threadService: ThreadService,
              _userService: UserDataService): void {

    // TODO make `messages` hot
    _messageService.messages.subscribe(() => ({}));

    // set "Juliet" as the current user
    _userService.setCurrentChatUser(me);

    // create the initial messages
    initialMessages.map( (message: Message) => _messageService.addMessage(message) );

    _threadService.setCurrentThread(tWait);

    this.setupBots(_messageService);
  }

  static setupBots(_messageService: MessageService): void {

    // echo bot
    _messageService.messagesForThreadUser(tEcho, echo)
      .forEach( (message: Message): void => {
        _messageService.addMessage(
          new Message({
            author: echo,
            text: message.text,
            thread: tEcho
          })
        );
      }, null);


    // reverse bot
    _messageService.messagesForThreadUser(tRev, rev)
      .forEach( (message: Message): void => {
        _messageService.addMessage(
          new Message({
            author: rev,
            text: message.text.split('').reverse().join(''),
            thread: tRev
          })
        );
      }, null);

    // waiting bot
    _messageService.messagesForThreadUser(tWait, wait)
      .forEach( (message: Message): void => {

        let waitTime: number = parseInt(message.text, 10);
        let reply: string;

        if (isNaN(waitTime)) {
          waitTime = 0;
          reply = `I didn\'t understand ${message.text}. Try sending me a number`;
        } else {
          reply = `I waited ${waitTime} seconds to send you this.`;
        }

        setTimeout(() => {
            _messageService.addMessage(
              new Message({
                author: wait,
                text: reply,
                thread: tWait
              })
            );
          }, waitTime * 1000);
      }, null);


  }
}
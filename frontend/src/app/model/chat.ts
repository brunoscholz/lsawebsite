import { ChatUser } from './general';
import { uuid } from '../util/uuid';

/**
 * Thread represents a group of Users exchanging Messages
 */
 export class Thread {
   id: string;
   lastMessage: Message;
   name: string;
   avatarSrc: string;

   constructor(
      id?: string,
      name?: string,
      avatarSrc?: string
    ) {
     this.id = id || uuid();
     this.name = name;
     this.avatarSrc = avatarSrc;
   }
 }

 /**
 * Message represents one message being sent in a Thread
 */
 export class Message {
   id: string;
   sentAt: Date;
   isRead: boolean;
   author: ChatUser;
   text: string;
   thread: Thread;

   constructor(obj?: any) {
     this.id              = obj && obj.id              || uuid();
     this.isRead          = obj && obj.isRead          || false;
     this.sentAt          = obj && obj.sentAt          || new Date();
     this.author          = obj && obj.author          || null;
     this.text            = obj && obj.text            || null;
     this.thread          = obj && obj.thread          || null;
   }
 }
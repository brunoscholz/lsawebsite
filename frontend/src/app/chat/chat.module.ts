import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ChatWindowComponent } from './chat-window.component';
import { ChatMessageComponent } from './chat-message.component';

import { MessageCounterComponent } from './message-counter.component';

import { ChatRoutingModule } from './chat-routing.module';

import { MomentModule } from 'angular2-moment';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        MomentModule,
        ChatRoutingModule,
    ],
    declarations: [
        ChatWindowComponent,
        ChatMessageComponent,
        MessageCounterComponent,
    ],
    exports: [
        ChatWindowComponent,
        ChatMessageComponent,
        MessageCounterComponent,
    ]
})
export class ChatModule {
}

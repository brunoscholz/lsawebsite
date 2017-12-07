import { Component } from '@angular/core';
import { SettingDataService } from "./model/setting-data.service";
import { UserDataService } from "./model/user-data.service";

import { ChatExampleData } from './chat/chat-example-data';
import { MessageService } from './model/message.service';
import { ThreadService } from './model/thread.service';

@Component({
    selector: 'body',
    templateUrl: './app.component.html'
})
export class AppComponent {
    constructor(
    	public _settingDataService: SettingDataService,
		public _userService: UserDataService,
		public _messageService: MessageService,
		public _threadService: ThreadService
	) {
        // get settings
        this._settingDataService.refreshGlobalSettings();

        // get user info... hopefully once only
        this._userService.populate();

        ChatExampleData.init(_messageService, _threadService, _userService);
    }
}

import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

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
    param = {value: 'world'};

    constructor(
    	public _settingDataService: SettingDataService,
		public _userService: UserDataService,
		public _messageService: MessageService,
		public _threadService: ThreadService,
        public translate: TranslateService
	) {
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.addLangs(['en', 'pt-BR']);
        translate.setDefaultLang('en');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        // translate.use('en');
        // console.log("Language: " + window.navigator.languages);
        let browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|pt-BR/) ? browserLang : 'en');

        // get settings
        this._settingDataService.refreshGlobalSettings();

        // get user info... hopefully once only
        this._userService.populate();

        ChatExampleData.init(_messageService, _threadService, _userService);
    }
}

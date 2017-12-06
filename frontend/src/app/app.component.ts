import { Component } from '@angular/core';
import { SettingDataService } from "./model/setting-data.service";
import { UserDataService } from "./model/user-data.service";

@Component({
    selector: 'body',
    template: '<router-outlet></router-outlet>'
})
export class AppComponent {
    constructor(public _settingDataService: SettingDataService,
				private _userService: UserDataService) {
        // get settings
        this._settingDataService.refreshGlobalSettings();

        // get user info... hopefully once only
        this._userService.populate();
    }
}

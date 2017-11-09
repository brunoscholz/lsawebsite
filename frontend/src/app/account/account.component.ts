import {Component, OnInit} from '@angular/core';
import {UserService} from "../model/user.service";
import {User} from "../model/user";
import {UserDataService} from "../model/user-data.service";

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {
     _errorMessage:string;
     _mode:string = '';
     _user:User;

    public userData:any = {};

    constructor(public _userService:UserService,
                public _userDataService:UserDataService) {
    }

    public ngOnInit() {
        this._errorMessage = "";
        this._userDataService.getMe()
            .subscribe(
                user => {
                    this._user = user;
                    this._mode = 'view';
                },
                error => {
                    // unauthorized access
                    if(error.status == 401 || error.status == 403) {
                        this._userService.unauthorizedAccess(error);
                    } else {
                        this._errorMessage = error.data.message;
                    }
                }
            );
    }
}

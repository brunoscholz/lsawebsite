import { Component, OnInit } from '@angular/core';

import { UserDataService } from '../model/user-data.service';
import { Router } from "@angular/router";

@Component({
    selector: 'app-logout',
    template: '<strong>Logging out...</strong>',
})
export class LogoutComponent implements OnInit {

    public submitted:boolean = false;
    public error:string = '';

    constructor(private _userService:UserDataService, private _router:Router) { }

    ngOnInit() {
        this._userService.logout();
        this._router.navigate(['/']);
    }


}

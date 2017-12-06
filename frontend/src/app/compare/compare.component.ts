import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CompareService } from "../model/compare.service";
import { User, Course, School } from "../model/general";

@Component({
    selector: 'app-compare',
    templateUrl: './compare.component.html',
    styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {
     _errorMessage:string;
     _mode:string = '';
     _user:User;
     _profileId: string;
     /*_currentUser:User;
     _isUser: boolean;*/

    constructor(public _route: ActivatedRoute,
                public _router: Router) {
    }

    public ngOnInit() {
        this._errorMessage = "";
        
        this._profileId = this._route.snapshot.params['userId'];
        
       /* this._userService.currentUser
        .subscribe((userData: User) => {
            this._user = userData;
            //this._isUser = (this._currentUser.username === this._profileId);
        });*/

        /*this._userDataService.getMe()
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
            );*/
    }
}

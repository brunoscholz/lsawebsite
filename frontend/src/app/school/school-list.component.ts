import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { CustomValidators } from 'ng2-validation';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from "../model/user.service";


import { SchoolDataService } from "../model/school-data.service";
import { School } from "../model/general";


@Component({
  selector: 'app-school',
  templateUrl: './school-list.component.html',
  styleUrls: ['../layouts/frontend-layout.component.scss']
})
export class SchoolListComponent implements OnInit {
    _errorMessage:string;
    _schools:School[];

    public userData:any = {};

    constructor(public _userService: UserService,
                public _route: ActivatedRoute,
                public _router: Router) {
    }

    ngOnInit() {
        /*let jwtValue:any = this._staffService.getJWTValue();
        this.userData = jwtValue.data;
        this.getSchools();*/
    }

    getSchools() {
        /*this._schools = null;
        this._schoolDataService.getAllSchools()
            .subscribe(
                schools => {
                    this._schools = schools;
                    console.log(this._schools);
                },
                error =>  {
                    // unauthorized access
                    if(error.status == 401 || error.status == 403) {
                        this._staffService.unauthorizedAccess(error);
                    } else {
                        this._errorMessage = error.data.message;
                    }
                }
            );*/
    }

    viewSchool(school:School):void {
        this._router.navigate(['/school', school.schoolId]);
    }

    editSchool(school:School):void {
        this._router.navigate(['/school/edit', school.schoolId]);
    }
}

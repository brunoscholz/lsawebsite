import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import swal, { SweetAlertOptions } from 'sweetalert2';

import { SchoolDataService } from "../model/school-data.service";
import { School } from "../model/general";

import { UserService } from "../model/user.service";

@Component({
    templateUrl: './school-detail.component.html'
})
export class SchoolDetailComponent implements OnInit {
    _id: string;
    _school: School;
    _errorMessage: string;

    constructor(public _schoolDataService: SchoolDataService,
                public _userService: UserService,
                public _route: ActivatedRoute,
                public _router: Router) {}

    ngOnInit() {
        this._id = this._route.snapshot.params['schoolId'];
        this.getSchool();
    }

    public getSchool() {
        this._school = null;
        this._schoolDataService.getSchoolById(this._id)
        .subscribe(
            school => {
                this._school = school
                console.log(school);
            },
            error =>  {
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
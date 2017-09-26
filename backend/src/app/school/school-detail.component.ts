import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import swal, { SweetAlertOptions } from 'sweetalert2';

import { SchoolDataService } from "../model/school-data.service";
import { School } from "../model/general";

import { StaffService } from "../model/staff.service";

@Component({
    templateUrl: './school-detail.component.html'
})
export class SchoolDetailComponent implements OnInit {
    private _id: string;
    private _school: School;
    private _errorMessage: string;

    constructor(private _schoolDataService: SchoolDataService,
                private _staffService: StaffService,
                private _route: ActivatedRoute,
                private _router: Router) {}

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
                    this._staffService.unauthorizedAccess(error);
                } else {
                    this._errorMessage = error.data.message;
                }
            }
        );
    }

}
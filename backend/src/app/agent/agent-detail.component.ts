import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import swal, { SweetAlertOptions } from 'sweetalert2';

import { UserDataService } from "../model/user-data.service";
import { Instructor } from "../model/general";

import { StaffService } from "../model/staff.service";

@Component({
    templateUrl: './instructor-detail.component.html',
    styleUrls: ['../../assets/main.css']
})
export class InstructorDetailComponent implements OnInit {
    private _id: string;
    private _instructor: Instructor;
    private _errorMessage: string;

    constructor(private _userDataService: UserDataService,
                private _staffService: StaffService,
                private _route: ActivatedRoute,
                private _router: Router) {}

    ngOnInit() {
        this._id = this._route.snapshot.params['instructorId'];
        this.getInstructor();
    }

    public getInstructor() {
        this._instructor = null;
        this._userDataService.getInstructorById(this._id)
        .subscribe(
            instructor => {
                this._instructor = instructor;
                console.log(instructor);
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
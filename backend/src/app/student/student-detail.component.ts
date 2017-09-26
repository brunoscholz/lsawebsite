import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import swal, { SweetAlertOptions } from 'sweetalert2';

import { UserDataService } from "../model/user-data.service";
import { Student } from "../model/general";

import { StaffService } from "../model/staff.service";

@Component({
    templateUrl: './student-detail.component.html',
    styleUrls: ['../../assets/main.css']
})
export class StudentDetailComponent implements OnInit {
    private _id: string;
    private _student: Student;
    private _errorMessage: string;

    constructor(private _userDataService: UserDataService,
                private _staffService: StaffService,
                private _route: ActivatedRoute,
                private _router: Router) {}

    ngOnInit() {
        this._id = this._route.snapshot.params['studentId'];
        this.getStudent();
    }

    public getStudent() {
        this._student = null;
        this._userDataService.getStudentById(this._id)
        .subscribe(
            student => {
                this._student = student
                console.log(student);
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

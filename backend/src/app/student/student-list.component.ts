import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import swal, { SweetAlertOptions } from 'sweetalert2';

import { StaffService } from "../model/staff.service";
import { UserDataService } from "../model/user-data.service";
import { Student } from "../model/general";


@Component({
  selector: 'app-student',
  templateUrl: './student-list.component.html',
})
export class StudentListComponent implements OnInit {
    private _errorMessage:string;
    private _students:Student[];

    constructor(private _userDataService: UserDataService,
                private _staffService: StaffService,
                private _router: Router) {}

    ngOnInit() {
        this.getStudents();
    }

    public getStudents() {
        this._students = null;
        this._userDataService.getAllStudents()
            .subscribe(
                students => {
                    this._students = students;
                    console.log(this._students);
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

    public viewStudent(student:Student):void {
        this._router.navigate(['/student', student.studentId]);
    }

    public editStudent(student:Student):void {
        this._router.navigate(['/student/edit', student.studentId]);
    }

    public viewSchool(schoolId:string):void {
        this._router.navigate(['/school', schoolId]);
    }
}

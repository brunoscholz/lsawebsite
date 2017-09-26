import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import swal, { SweetAlertOptions } from 'sweetalert2';

import { StaffService } from "../model/staff.service";
import { UserDataService } from "../model/user-data.service";
import { Instructor } from "../model/general";


@Component({
  selector: 'app-instructor',
  templateUrl: './instructor-list.component.html',
})
export class InstructorListComponent implements OnInit {
    private _errorMessage:string;
    private _instructors:Instructor[];

    constructor(private _userDataService: UserDataService,
                private _staffService: StaffService,
                private _router: Router) {}

    ngOnInit() {
        this.getInstructors();
    }

    public getInstructors() {
        this._instructors = null;
        this._userDataService.getAllInstructors()
            .subscribe(
                instructors => {
                    this._instructors = instructors;
                    console.log(this._instructors);
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

    public viewInstructor(instructor:Instructor):void {
        this._router.navigate(['/instructor', instructor.instructorId]);
    }

    public editInstructor(instructor:Instructor):void {
        this._router.navigate(['/instructor/edit', instructor.instructorId]);
    }

    public viewSchool(schoolId:string):void {
        this._router.navigate(['/school', schoolId]);
    }
}

import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import swal, { SweetAlertOptions } from 'sweetalert2';

import { StaffService } from "../model/staff.service";
import { CourseDataService } from "../model/course-data.service";
import { Course } from "../model/general";


@Component({
  selector: 'app-course',
  templateUrl: './course-list.component.html',
})
export class CourseListComponent implements OnInit {
    private _errorMessage:string;
    private _courses:Course[];

    constructor(private _courseDataService: CourseDataService,
                private _staffService: StaffService,
                private _router: Router) {}

    ngOnInit() {
        this.getCourses();
    }

    public getCourses() {
        this._courses = null;
        this._courseDataService.getAllCourses()
            .subscribe(
                courses => {
                    this._courses = courses;
                    console.log(this._courses);
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

    public viewCourse(course:Course):void {
        this._router.navigate(['/course', course.courseId]);
    }

    public editCourse(course:Course):void {
        this._router.navigate(['/course/edit', course.courseId]);
    }

    public viewSchool(schoolId:string):void {
        this._router.navigate(['/school', schoolId]);
    }
}

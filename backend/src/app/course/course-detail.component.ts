import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import swal, { SweetAlertOptions } from 'sweetalert2';

import { CourseDataService } from "../model/course-data.service";
import { Course } from "../model/general";

import { StaffService } from "../model/staff.service";

@Component({
    templateUrl: './course-detail.component.html',
    styleUrls: ['../../assets/main.css']
})
export class CourseDetailComponent implements OnInit {
    private _id: string;
    private _course: Course;
    private _errorMessage: string;

    constructor(private _courseDataService: CourseDataService,
                private _staffService: StaffService,
                private _route: ActivatedRoute,
                private _router: Router) {}

    ngOnInit() {
        this._id = this._route.snapshot.params['courseId'];
        this.getCourse();
    }

    public getCourse() {
        this._course = null;
        this._courseDataService.getCourseById(this._id)
        .subscribe(
            course => {
                this._course = course['data']
                console.log(course);
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
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
//import swal, { SweetAlertOptions } from 'sweetalert2';

import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

import { CourseDataService } from "../model/course-data.service";
import { Course } from "../model/general";

import { UserService } from "../model/user.service";

@Component({
    templateUrl: './course-detail.component.html',
    styleUrls: ['../layouts/frontend-layout.component.scss', './course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
    _id: string;
    _course: Course;
    _errorMessage: string;
    _bgImage: any;

    constructor(public _courseDataService: CourseDataService,
                public _userService: UserService,
                public _route: ActivatedRoute,
                public _router: Router,
                private _sanitizer: DomSanitizer) {}

    ngOnInit() {
        this._id = this._route.snapshot.params['courseId'];
        this.getCourse();
    }

    public getCourse() {
        this._course = null;
        this._courseDataService.getCourseById(this._id)
        .subscribe(
            course => {
                this._course = course;
                this._bgImage = this._sanitizer.bypassSecurityTrustStyle(`url(${this._course.media[0].image.large}) 0 0px no-repeat`);
                console.log(this._course);
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
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

import { GlobalService } from './global.service';
import { UserService } from './user.service';
import { Course } from './general';
import { AuthHttp } from 'angular2-jwt';


@Injectable()
export class CourseDataService {

    constructor(public _globalService:GlobalService,
                public _userService:UserService,
                public _authHttp: AuthHttp){
    }

    // POST /v1/course
    addCourse(course: Course):Observable<any> {
        let headers = this.getHeaders();

        return this._authHttp.post(
            this._globalService.apiHost+'/course',
            JSON.stringify({Course: course}),
            {
                headers: headers
            }
        )
            .map(response => response.json())
            .map((response) => {
                return response;
            })
            .catch(this.handleError);
    }

    // DELETE /v1/course/aaa
    deleteCourseById(id: string):Observable<boolean> {
        let headers = this.getHeaders();

        return this._authHttp.delete(
            this._globalService.apiHost+'/course/'+id,
            {
                headers: headers
            }
        )
            .map(response => response.json())
            .map((response) => {
                return response;
            })
            .catch(this.handleError);
    }

    // PUT /v1/course/1
    updateCourseById(course: Course):Observable<any> {
        let headers = this.getHeaders();

        return this._authHttp.put(
            this._globalService.apiHost+'/course/'+course.courseId,
            JSON.stringify({Course: course}),
            {
                headers: headers
            }
        )
            .map(response => response.json())
            .map((response) => {
                return response;
            })
            .catch(this.handleError);
    }

    public getHeaders():Headers {
        return new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+this._userService.getToken(),
        });
    }
    // GET /v1/course
    getAllCourses(): Observable<Course[]> {
        let headers = this.getHeaders();

        return this._authHttp.get(
            this._globalService.apiHost+'/course',
            {
                headers: headers
            }
        )
            .map(response => response.json())
            .map((response) => {
                return <Course[]>response.data;
            });
            //.catch(this.handleError);
    }

    // GET /v1/course/1
    getCourseById(id:string):Observable<Course> {
        let headers = this.getHeaders();

        return this._authHttp.get(
            this._globalService.apiHost+'/course/'+id,
            {
                headers: headers
            }
        )
            .map(response => response.json())
            .map((response) => {
                return <Course>response.data;
            })
            .catch(this.handleError);
    }


    public handleError (error: Response | any) {

        let errorMessage:any = {};
        // Connection error
        if(error.status == 0) {
            errorMessage = {
                success: false,
                status: 0,
                data: "Sorry, there was a connection error occurred. Please try again.",
            };
        }
        else {
            errorMessage = error.json();
        }
        return Observable.throw(errorMessage);
    }

    public static getStatusTypes():Array<any>{
        return [
            {
                label: 'Active',
                value: 10
            },
            {
                label: 'Waiting Confirmation',
                value: 1
            },
            {
                label: 'Disabled',
                value: 0
            }
        ];
    }

    public static getRoleTypes():Array<any>{
        return [
            {
                label: 'Administrator',
                value: 99
            },
            {
                label: 'Staff',
                value: 50
            }
        ];
    }


    public getPermissionTypes():Observable<Array<any>>{
        let headers = this.getHeaders();

        return this._authHttp.get(
           this._globalService.apiHost+'/course/get-permissions',
            {
                headers: headers
            }
        )
        .map(response => response.json())
        .map((response) => {
            return response.data;
        })
        .catch(this.handleError);
    }
}

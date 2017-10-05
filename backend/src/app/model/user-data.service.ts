import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Rx';

import {GlobalService} from './global.service';
import {StaffService} from './staff.service';

import {User, Instructor, Student} from './general';
import {AuthHttp} from 'angular2-jwt';


@Injectable()
export class UserDataService {

    constructor(private _globalService:GlobalService,
                private _staffService:StaffService,
                private _authHttp: AuthHttp){
    }

    // POST /v1/user
    addUser(user:User):Observable<any>{
        let headers = this.getHeaders();

        return this._authHttp.post(
            this._globalService.apiHost+'/user',
            JSON.stringify(user),
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

    // DELETE /v1/user/1
    deleteUserById(id:string):Observable<boolean>{
        let headers = this.getHeaders();

        return this._authHttp.delete(
            this._globalService.apiHost+'/user/'+id,
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

    // PUT /v1/user/1
    updateUserById(user:User):Observable<any>{
        let headers = this.getHeaders();

        return this._authHttp.put(
            this._globalService.apiHost+'/user/'+user.userId,
            JSON.stringify(user),
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

    /* INSTRUCTORS */
    // POST /v1/instructor
    addInstructor(instructor:Instructor):Observable<any>{
        let headers = this.getHeaders();

        let payload = {
            "Instructor": {"name": instructor.name, "expertise": instructor.expertise},
            "User": {"username": instructor.user.username,"email": instructor.user.email, "password": instructor.user.password}
        }

        return this._authHttp.post(
            this._globalService.apiHost+'/instructor',
            JSON.stringify(payload),
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

    // DELETE /v1/instructor/1
    deleteInstructorById(id:string):Observable<boolean>{
        let headers = this.getHeaders();

        return this._authHttp.delete(
            this._globalService.apiHost+'/instructor/'+id,
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

    // PUT /v1/user/1
    updateInstructorById(instructor:Instructor):Observable<any>{
        let headers = this.getHeaders();

        return this._authHttp.put(
            this._globalService.apiHost+'/instructor/'+instructor.instructorId,
            JSON.stringify(instructor),
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

    /* STUDENTS */
    // POST /v1/student
    /*{
        expertise : "verbs, to be or not, grammar",
        name : "Instructor Zero",
        user : { username: "zero", email: "zero@usernames.com", password: "123456" }
    }*/
    addStudent(student:Student):Observable<any>{
        let headers = this.getHeaders();

        let payload = {
            "Student": { "name": student.name, "birthday": student.birthday, "phone": student.phone, "emergencyPhone": student.emergencyPhone },
            "Location": { "address": student.location.address, "streetNumber": student.location.streetNumber, "neighborhood": student.location.neighborhood, "postCode": student.location.postCode },
            "User": { "username": student.user.username,"email": student.user.email, "password": student.user.password }
        }

        console.log(payload);

        return this._authHttp.post(
            this._globalService.apiHost+'/student',
            JSON.stringify(payload),
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

    // DELETE /v1/student/1
    deleteStudentById(id:string):Observable<boolean>{
        let headers = this.getHeaders();

        return this._authHttp.delete(
            this._globalService.apiHost+'/student/'+id,
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

    // PUT /v1/student/1
    updateStudentById(student:Student):Observable<any>{
        let headers = this.getHeaders();

        return this._authHttp.put(
            this._globalService.apiHost+'/student/'+student.studentId,
            JSON.stringify(student),
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

    private getHeaders():Headers {
        return new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+this._staffService.getToken(),
        });
    }
    // GET /v1/user
    getAllUsers(): Observable<User[]> {
        let headers = this.getHeaders();

        return this._authHttp.get(
            this._globalService.apiHost+'/user',
            {
                headers: headers
            }
        )
            .map(response => response.json())
            .map((response) => {
                return <User[]>response.data;
            })
            .catch(this.handleError);
    }

    // GET /v1/user
    getAllInstructors(): Observable<Instructor[]> {
        let headers = this.getHeaders();


        //this._globalService.apiHost+'/user?'+encodeURIComponent(JSON.stringify({ role: 60 })),
        //+this.obj_to_query({ role: 60 })
        return this._authHttp.get(
            this._globalService.apiHost+'/instructor',
            {
                headers: headers
            }
        )
            .map(response => response.json())
            .map((response) => {
                return <Instructor[]>response.data;
            })
            .catch(this.handleError);
    }

    obj_to_query(obj) {
        var parts = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
            }
        }
        return "?" + parts.join('&');
    }

    // GET /v1/user
    getAllStudents(): Observable<Student[]> {
        let headers = this.getHeaders();

        return this._authHttp.get(
            this._globalService.apiHost+'/student',
            {
                headers: headers
            }
        )
            .map(response => response.json())
            .map((response) => {
                return <Student[]>response.data;
            })
            .catch(this.handleError);
    }

    // GET /v1/user/1
    getUserById(id:string):Observable<User> {
        let headers = this.getHeaders();

        return this._authHttp.get(
            this._globalService.apiHost+'/user/'+id,
            {
                headers: headers
            }
        )
            .map(response => response.json())
            .map((response) => {
                return <User>response.data;
            })
            .catch(this.handleError);
    }

    // GET /v1/user/1
    getInstructorById(id:string):Observable<Instructor> {
        let headers = this.getHeaders();

        return this._authHttp.get(
            this._globalService.apiHost+'/instructor/'+id,
            {
                headers: headers
            }
        )
            .map(response => response.json())
            .map((response) => {
                return <Instructor>response.data;
            })
            .catch(this.handleError);
    }

    // GET /v1/user/1
    getStudentById(id:string):Observable<Student> {
        let headers = this.getHeaders();

        return this._authHttp.get(
            this._globalService.apiHost+'/student/'+id,
            {
                headers: headers
            }
        )
            .map(response => response.json())
            .map((response) => {
                return <Student>response.data;
            })
            .catch(this.handleError);
    }

    private handleError (error: Response | any) {

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
                label: 'Disabled',
                value: 0
            }
        ];
    }
}

import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

import { Observable, Observer } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { GlobalService } from './global.service';
import { UserService } from './user.service';
import { AuthHttp } from 'angular2-jwt';
import { User, Student } from './general';

import * as _ from "underscore";

@Injectable()
export class UserDataService {
  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(public _globalService:GlobalService,
              public _userService:UserService,
              public _authHttp: AuthHttp) {
  }

  private getHeaders():Headers {
    return new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+this._userService.getToken(),
    });
  }

  // GET /v1/user/me
  getMe():Observable<User> {
    let headers = this.getHeaders();

    return this._authHttp.get(
        this._globalService.apiHost+'/user/me',
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

  updateUser(userData):Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=UTF-8');

    return this._authHttp
      .post(
        this._globalService.apiHost + '/user/me',
        JSON.stringify({
          "UserEditForm": userData
        }),
        {headers: headers}
      )
      .map(response => response.json())
      .map((response) => {
        if (response.success) {
          // Update the currentUser observable or getMe()
          this.currentUserSubject.next(<User>response.data);
        } else {
        }
        return response;
      })
      .catch(this.handleError);
  }

  populate() {
    // If JWT detected, attempt to get & store user's info
    console.log("__CALLED POPULATE__");
    if (this._userService.checkToken()) {
      this.getMe()
        .subscribe(
          data => this.setAuth(data),
          err => this.purgeAuth()
        );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(user: User) {
    console.log("__CALLED SET AUTH__");
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    console.log("__CALLED PURGE AUTH__");
    // Remove JWT from localstorage
    this._userService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next(new User());
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  public logout(): void {
    console.log("__CALLED LOGOUT__");
    this.purgeAuth();
  }

  attemptAuth(username, password, type = 'login') {
    console.log("__CALLED ATTEMPT AUTH__");
    const route = (type === 'login') ? '/login' : '';
    return this._userService.login(username, password)
    .map((response) => {
      if (response.success) {
        console.log(response.data);
        // Save JWT sent from server in localstorage
        this._userService.saveToken(response.data.access_token);
        this.populate();
      } else {
        this.purgeAuth();
      }
      return response;
    });
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  getUser(): Observable<User> {
    return Observable.create((observer: Observer<User>) => {
      observer.next(this.currentUserSubject.value);
      observer.complete();
    });
  }

  checkEnrolled(courseId: string) {
    let usr = this.getCurrentUser();
    let keys =  _.filter(usr.courseEnrolls as any, function(obj) { return obj["courseId"] == courseId; });
    console.log(keys);
    //return _.contains(keys, courseId);
    return keys.length > 0;
  }

  // GET /v1/course/1
  getStudentById(id:string):Observable<Student> {
    let headers = this.getHeaders();

    return this._authHttp.get(
      this._globalService.apiHost+'/student/'+id,
      {
        headers: headers
      })
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
}

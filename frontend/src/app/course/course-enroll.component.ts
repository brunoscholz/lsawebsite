import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

//import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

import { CourseDataService } from "../model/course-data.service";
import { Course, User } from "../model/general";

import { UserDataService } from "../model/user-data.service";
import { UserService } from "../model/user.service";

@Component({
  templateUrl: './course-enroll.component.html',
  styleUrls: ['../account/account.component.css']
})
export class CourseEnrollComponent implements OnInit {
  _enrollForm:FormGroup;
  _formErrors:any;
  _submitted:boolean = false;
  _errorMessage:string = '';

  _id: string;
  _course: Course;
  //_bgImage: any;

  _currentUser: User;

  constructor(
    private _courseDataService: CourseDataService,
    private _userDataService: UserDataService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _fb: FormBuilder
  ) {
    this._enrollForm = _fb.group({
      username: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
    this._enrollForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  public _setFormErrors(errorFields:any):void{
    for (let key in errorFields) {
      // skip loop if the property is from prototype
      if (!errorFields.hasOwnProperty(key)) continue;

      let message = errorFields[key];
      this._formErrors[key].valid = false;
      this._formErrors[key].message = message;
    }
  }

  public _resetFormErrors():void{
    this._formErrors = {
      username: {valid: true, message: ''},
      password: {valid: true, message: ''},
    };
  }

  public _isValid(field):boolean {
    let isValid:boolean = false;

    // If the field is not touched and invalid, it is considered as initial loaded form. Thus set as true
    if(this._enrollForm.controls[field].touched == false) {
      isValid = true;
    }
    // If the field is touched and valid value, then it is considered as valid.
    else if(this._enrollForm.controls[field].touched == true && this._enrollForm.controls[field].valid == true) {
      isValid = true;
    }
    return isValid;
  }

  public onValueChanged(data?: any) {
    if (!this._enrollForm) { return; }
    const form = this._enrollForm;
    for (let field in this._formErrors) {
      // clear previous error message (if any)
      let control = form.get(field);
      if (control && control.dirty) {
        this._formErrors[field].valid = true;
        this._formErrors[field].message = '';
      }
    }
  }

  ngOnInit() {
    this._resetFormErrors();
    
    this._id = this._route.snapshot.params['courseId'];
    this._currentUser = this._userDataService.getCurrentUser();
    this.getCourse();
  }

  public onSubmit(elementValues: any) {
    this._submitted = true;
  }

  public getCourse() {
    this._course = null;
    this._courseDataService.getCourseById(this._id)
    .subscribe(
        course => {
            this._course = course;
            //this._bgImage = this._sanitizer.bypassSecurityTrustStyle(`url(${this._course.media[0].image.large}) 0 0px no-repeat`);
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

  /*onToggleFollowing(following: boolean) {
    this.profile.following = following;
  }*/
}
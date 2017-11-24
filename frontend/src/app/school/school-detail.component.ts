import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
//import swal, { SweetAlertOptions } from 'sweetalert2';

import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

import { CustomValidators } from 'ng2-validation';
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";

import { SchoolDataService } from "../model/school-data.service";
import { School } from "../model/general";

import { UserService } from "../model/user.service";

@Component({
  templateUrl: './school-detail.component.html',
  styleUrls: ['./school-detail.component.css']
})
export class SchoolDetailComponent implements OnInit {
  _id: string;
  _school: School;
  _errorMessage: string;

  _form:FormGroup;
  _formErrors:any;
  _submitted:boolean = false;

  _bgImage: any;
  _message: any = {};

  constructor(public _schoolDataService: SchoolDataService,
              public _userService: UserService,
              public _route: ActivatedRoute,
              public _router: Router,
              private _sanitizer: DomSanitizer,
              private _formBuilder:FormBuilder) {

    // Construct form group
    this._form = _formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        CustomValidators.rangeLength([3, 80]),
      ])],

      email: ['', Validators.compose([
        Validators.required,
        CustomValidators.email,
      ])],

      subject: ['', Validators.compose([
        Validators.required,
      ])],

      message: ['', Validators.compose([
        Validators.required,
      ])]
    });

    this._form.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  ngOnInit() {
    this._resetFormErrors();
    this._resetData();
    this._id = this._route.snapshot.params['schoolId'];
    this.getSchool();
  }

  public getSchool() {
    this._school = null;
    this._schoolDataService.getSchoolById(this._id)
    .subscribe(
      school => {
        this._school = school;
        this._bgImage = this._sanitizer.bypassSecurityTrustStyle(`url(${this._school.media[0].image.large}) 0 0px no-repeat`);
        console.log(school);
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

  onSubmit() {
    this._submitted = true;
    this._resetFormErrors();
    console.log(this._message);

    //if(this._mode == 'create') { test if user logged in and complete the email

      /*this._schoolService.addSchool(this._school)
      .subscribe (
        result => {
          if(result.success) {
            this._router.navigate(['/school']);
          } else {
            this._submitted = false;
          }
        },
        error => {
          this._submitted = false;
          // Validation errors
          if(error.status == 422) {
            let errorFields = JSON.parse(error.data.message);
            this._setFormErrors(errorFields);
          }
          // Unauthorized Access
          else if(error.status == 401 || error.status == 403) {
            this._staffService.unauthorizedAccess(error);
          }
          // All other errors
          else {
            this._errorMessage = error.data.message;
          }
        });*/
  }

  private _setFormErrors(errorFields:any): void {
    for (let key in errorFields) {
      let errorField = errorFields[key];
      // skip loop if the property is from prototype
      if (!this._formErrors.hasOwnProperty(key)) continue;

      // let message = errorFields[error.field];
      this._formErrors[key].valid = false;
      this._formErrors[key].message = errorField;
    }
  }

  private _isValid(field): boolean {
    let isValid:boolean = false;
    let group = field.split(".");
    let combinedField = this._form.controls[group[0]];
    
    if (group[1] !== undefined) 
      combinedField = this._form.controls[group[0]]['controls'][0].controls[group[1]];

    // If the field is not touched and invalid, it is considered as initial loaded form. Thus set as true
    if(combinedField.touched == false) {
      isValid = true;
    }
    // If the field is touched and valid value, then it is considered as valid.
    else if(combinedField.touched == true && combinedField.valid == true) {
      isValid = true;
    }

    return isValid;
  }

  public onValueChanged(data?: any) {
    if (!this._form) { return; }
    const form = this._form;
    for (let field in this._formErrors) {
      // clear previous error message (if any)
      let control = form.get(field);
      if (control && control.dirty) {
        this._formErrors[field].valid = true;
        this._formErrors[field].message = '';
      }
    }
  }

  private _resetFormErrors(): void {
    this._formErrors = {
      name: {valid: true, message: ''},
      email: {valid: true, message: ''},
      subject: {valid: true, message: ''},
      message : {valid: true, message: ''}
    };
  }

  private _resetData() {
    this._message = {};
  }

}
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { CustomValidators } from 'ng2-validation';
import { ContainsValidators } from "../shared/contains-validator.directive";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";

import { SchoolDataService } from "../model/school-data.service";
import { School, User, Location, Media, Image } from "../model/general";
import { StaffService } from "../model/staff.service";

import * as moment from "moment";
import * as _ from "underscore";

@Component({
  templateUrl: './school-form.component.html',
})
export class SchoolFormComponent implements OnInit, OnDestroy {
  private _mode:string = '';

  private _id: string;
  private _parameters: any;
  private _school: School;
  private _confirmPassword: string;

  private _errorMessage: string;

  private _form:FormGroup;
  private _formErrors:any;
  private _submitted:boolean = false;

  _image: Image;

  // Status Types
  private _statusTypes:any = {};
  private _states:any = {};

  constructor(private _schoolService: SchoolDataService,
        private _staffService:StaffService,
        private _router:Router,
        private _activatedRoute:ActivatedRoute,
        private _formBuilder:FormBuilder) {

    // Construct form group
    this._form = _formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        CustomValidators.rangeLength([3, 80]),
      ])],

      user: _formBuilder.array([
        this.initUser(),
      ]),

      about: ['', Validators.compose([
        Validators.required,
      ])],

      description: ['', Validators.compose([
        Validators.required,
      ])],

      abn: ['', Validators.compose([
        Validators.required,
        abnValidator
      ])],

      cricos: ['', Validators.compose([
        Validators.required,
      ])],

      location: _formBuilder.array([
        this.initLocation(),
      ])
    });

    //this._statusTypes = SellerDataService.getStatusTypes();
    this._states = [
      {value: 'ACT', label: 'Australian Capital Territory'},
      {value:'NSW', label:'New South Wales'},
      {value: 'NT', label: 'Northern Territory'},
      {value:'QLD', label:'Queensland'},
      {value: 'SA', label: 'South Australia'},
      {value: 'TAS', label: 'Tasmania'},
      {value: 'VIC', label: 'Victoria'},
      {value: 'WA', label: 'Western Australia'}];
    this._form.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  initLocation() {
    // longitude: number;
    return this._formBuilder.group({
        address2: ['', Validators.required],
    });
  }

  fillLocation(ev: Location) {
    this._school.location = ev;
  }

  initUser() {
    return this._formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        CustomValidators.rangeLength([3, 21]),
        Validators.pattern('^[A-Za-z0-9_-]{3,21}$'),
      ])],
      email: ['', Validators.compose([
        Validators.required,
        CustomValidators.email,
      ])],
      password: ['', Validators.compose([
        Validators.required,
        passwordValidator
      ])],
      confirmPassword: ['', Validators.required]
    }, { 
      validator: matchingPasswords('password', 'confirmPassword')
    });
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
      username: {valid: true, message: ''},
      email: {valid: true, message: ''},
      password: {valid: true, message: ''},
      confirmPassword : {valid: true, message: ''},
      name: {valid: true, message: ''},
      about: {valid: true, message: ''},
      description: {valid: true, message: ''},
      abn: {valid: true, message: ''},
      cricos: {valid: true, message: ''},
      location: {valid: true, message: ''},
    };
  }

  private _resetData() {
    this._school = new School();
    this._school.location = new Location();
    this._school.user = new User();
    this._school.media = [];
  }

  public ngOnInit() {
    this._resetFormErrors();
    this._resetData();

    this._parameters = this._activatedRoute.params.subscribe(params => {
      // plus(+) is to convert 'id' to number
      if(typeof params['schoolId'] !== "undefined") {
        this._id = params['schoolId'];
        this._errorMessage = "";
        this._schoolService.getSchoolById(this._id)
          .subscribe(
            school => {
              this._school = school;
              this._mode = 'update';
            },
            error => {
              // unauthorized access
              if(error.status == 401 || error.status == 403) {
                this._staffService.unauthorizedAccess(error);
              } else {
                this._errorMessage = error.data.message;
              }
            }
          );
      } else {
        this._mode = 'create';
        this._image = new Image();
      }
    });
  }

  public ngOnDestroy() {
    this._parameters.unsubscribe();
    this._school = new School();
  }

  public onSubmit() {
    this._submitted = true;
    this._resetFormErrors();

    let med = new Media();
    med.image = this._image;
    this._school.media.push(med);

    if(this._mode == 'create') {
      this._schoolService.addSchool(this._school)
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
        });
    } else if(this._mode == 'update') {
      this._schoolService.updateSchoolById(this._school)
      .subscribe(
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
            //this._setFormErrors(error.data);
          }
          // Unauthorized Access
          else if(error.status == 401 || error.status == 403) {
            this._staffService.unauthorizedAccess(error);
          }
          // All other errors
          else {
            this._errorMessage = error.data.message;
          }
        });
    }
  }

  fileChangeEvent(evt, mode) {
    let self = this;
    let files = evt.target.files;
    let file = files[0];

    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
      let binaryString = reader.result;

      if(mode == 'thumb')
        self._image.thumb = binaryString;
      else if (mode == 'cover')
        self._image.large = binaryString;

      //console.log(binaryString);
    };
    reader.onerror = function (error) {
      console.log('Invalid Image: ', error);
    };
  }

  public onChangeDateTime(type:string, dateTime:string) {}
}

function abnValidator(control) {
  // valid for testing
  // 11223491505
  let weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];

  let abn = control.value;

  if(abn == undefined)
    return null;

  abn = abn.replace(/-/g, "");
  abn = abn.replace(/_/g, "");
  abn = abn.replace("/[^\d]/g", "");

  let sum = 0;
  for (let i = 0; i < weights.length; i++) {
    let digit = abn[i] - (i ? 0 : 1);
    sum += weights[i] * digit;
  }

  let valid = (sum % 89);
  return (valid == 0) ? null : {
    invalidABN: {
      valid: false
    }
  }
}

function passwordValidator(control) {
  // {6,21}           - Assert password is between 6 and 21 characters
  // (?=.*[0-9])       - Assert a string has at least one number
  let EMAIL_REGEXP = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,21}$/;
  return EMAIL_REGEXP.test(control.value) ? null : {
    invalidPassword: {
      valid: false
    }
  }
}

function matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
  return (group: FormGroup) => {
    let passwordInput = group.controls[passwordKey];
    let passwordConfirmationInput = group.controls[passwordConfirmationKey];
    if (passwordInput.value !== passwordConfirmationInput.value) {
      return passwordConfirmationInput.setErrors( { 'notEquivalent': true} );
    }
  }
}
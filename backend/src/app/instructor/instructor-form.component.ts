import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { CustomValidators } from 'ng2-validation';
import { ContainsValidators } from "../shared/contains-validator.directive";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";

import { UserDataService } from "../model/user-data.service";
import { Instructor, User, Location } from "../model/general";
import { StaffService } from "../model/staff.service";

import * as moment from "moment";
import * as _ from "underscore";

@Component({
  templateUrl: './instructor-form.component.html',
})
export class InstructorFormComponent implements OnInit, OnDestroy {
  private _mode = '';

  private _id: string;
  private _parameters:any;
  private _instructor: Instructor;

  private _errorMessage:string;

  private _form:FormGroup;
  private _formErrors:any;
  private _submitted:boolean = false;

  // Status Types
  private _statusTypes:any = {};
  private _states:any = {};

  constructor(private _userService: UserDataService,
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
      
      User: _formBuilder.array([
        this.initUser(),
      ]),

      expertise: ['', Validators.compose([
        Validators.required,
      ])]

    });

    //this._statusTypes = SellerDataService.getStatusTypes();
    this._form.valueChanges.subscribe(data => this.onValueChanged(data));
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
        Validators.minLength(6)
      ])]
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
      name: {valid: true, message: ''},
      username: {valid: true, message: ''},
      email: {valid: true, message: ''},
      password: {valid: true, message: ''},
      expertise: {valid: true, message: ''},
    };
  }

  private _resetData() {
    this._instructor = new Instructor();
    this._instructor.user = new User();
  }

  public ngOnInit() {
    this._resetFormErrors();
    this._resetData();

    this._parameters = this._activatedRoute.params.subscribe(params => {
      // plus(+) is to convert 'id' to number
      if(typeof params['instructorId'] !== "undefined") {
        this._id = params['instructorId'];
        this._errorMessage = "";
        this._userService.getInstructorById(this._id)
          .subscribe(
            instructor => {
              this._instructor = instructor;
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
      }
    });
  }

  public ngOnDestroy() {
    this._parameters.unsubscribe();
    this._instructor = new Instructor();
  }

  public onSubmit() {
    this._submitted = true;
        this._resetFormErrors();
        if(this._mode == 'create') {
            this._userService.addInstructor(this._instructor)
                .subscribe(
                    result => {
                        if(result.success) {
                            this._router.navigate(['/instructor']);
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
                    }
                );
        } else if(this._mode == 'update') {
            this._userService.updateInstructorById(this._instructor)
                .subscribe(
                    result => {
                        if(result.success) {
                            this._router.navigate(['/instructor']);
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
                    }
                );
        }
  }

  public onChangeDateTime(type:string, dateTime:string) {}
}
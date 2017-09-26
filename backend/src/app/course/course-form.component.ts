import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { CustomValidators } from 'ng2-validation';
import { ContainsValidators } from "../shared/contains-validator.directive";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";

import { CourseDataService } from "../model/course-data.service";
import { Course, School, CourseType, SchoolCampi } from "../model/general";
import { StaffService } from "../model/staff.service";

import * as moment from "moment";
import * as _ from "underscore";

@Component({
  templateUrl: './course-form.component.html',
  host: {
    '(document:click)': 'handleClick($event)',
  },
})
export class CourseFormComponent implements OnInit, OnDestroy {
  private _mode = '';

  private _id: string;
  private _parameters:any;
  private _course: any;

  private _errorMessage:string;

  private _form:FormGroup;
  private _formErrors:any;
  private _submitted:boolean = false;

  // Status Types
  private _statusTypes:any = {};
  private _states:any = {};

  public query = '';
  public countries = [ "Albania","Andorra","Armenia","Austria","Azerbaijan","Belarus",
                      "Belgium","Bosnia & Herzegovina","Bulgaria","Croatia","Cyprus",
                      "Czech Republic","Denmark","Estonia","Finland","France","Georgia",
                      "Germany","Greece","Hungary","Iceland","Ireland","Italy","Kosovo",
                      "Latvia","Liechtenstein","Lithuania","Luxembourg","Macedonia","Malta",
                      "Moldova","Monaco","Montenegro","Netherlands","Norway","Poland",
                      "Portugal","Romania","Russia","San Marino","Serbia","Slovakia","Slovenia",
                      "Spain","Sweden","Switzerland","Turkey","Ukraine","United Kingdom","Vatican City"];
  public filteredList = [];
  public elementRef;

  constructor(private _courseService: CourseDataService,
        private _staffService:StaffService,
        private _router:Router,
        private _activatedRoute:ActivatedRoute,
        private _formBuilder:FormBuilder,
        myElement: ElementRef) {

    this.elementRef = myElement;

    // Construct form group
    this._form = _formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        CustomValidators.rangeLength([3, 80]),
      ])],
      about: ['', Validators.compose([
        Validators.required,
      ])],
      cost: ['', Validators.compose([
        Validators.required,
      ])],
      discount: ['', Validators.compose([
        Validators.required,
      ])],

      startDate: ['', Validators.compose([
        Validators.required,
      ])],
      endDate: ['', Validators.compose([
        Validators.required,
      ])],

      periodOfDay: ['', Validators.compose([
        Validators.required,
      ])],

      school: _formBuilder.array([
        this.initSchool(),
      ]),
      schoolcampi: _formBuilder.array([
        this.initSchoolCampi(),
      ]),
      coursetype: _formBuilder.array([
        this.initcourseType(),
      ]),

      query: ['', Validators.compose([
        Validators.required,
      ])],
    });

    //this._statusTypes = SellerDataService.getStatusTypes();
    this._form.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  initSchool() {
    return this._formBuilder.group({
        name: ['', Validators.required],
        about: [''],
        description: [''],
        abn: [''],
        cricos: [''],
        yearEstablished: [''],
        location: [''],
        user: [''],
    });
  }

  initSchoolCampi() {
    return this._formBuilder.group({
        name: ['', Validators.required],
        locationId: [''],
        schoolId: [''],
    });
  }

  initcourseType() {
    return this._formBuilder.group({
        name: ['', Validators.required],
        certified: [''],
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
      about: {valid: true, message: ''},
      cost: {valid: true, message: ''},
      discount: {valid: true, message: ''},
      startDate: {valid: true, message: ''},
      endDate: {valid: true, message: ''},
      periodOfDay: {valid: true, message: ''},
      school: {valid: true, message: ''},
      coursetype: {valid: true, message: ''},
      schoolcampi: {valid: true, message: ''},
    };
  }

  private _resetData() {
    this._course = new School();
    this._course.school = new School();
    this._course.coursetype = new CourseType();
    this._course.schoolcampi = new SchoolCampi();
  }

  public ngOnInit() {
    this._resetFormErrors();
    this._resetData();

    this._parameters = this._activatedRoute.params.subscribe(params => {
      // plus(+) is to convert 'id' to number

      if(typeof params['courseId'] !== "undefined") {
        this._id = params['courseId'];
        this._errorMessage = "";

        this._courseService.getCourseById(this._id)
          .subscribe(
            course => {
              this._course = course;
              this._mode = 'update';
              if (!this._course.schoolcampi)
                this._course.schoolcampi = new SchoolCampi();
              //console.log(this._course);
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
    this._course = new School();
  }

  public onSubmit() {
    //console.log({Course: this._course});
    this._submitted = true;
        this._resetFormErrors();
        if(this._mode == 'create') {
            this._courseService.addCourse(this._course)
                .subscribe(
                    result => {
                        if(result.success) {
                            this._router.navigate(['/course']);
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
            this._courseService.updateCourseById(this._course)
                .subscribe(
                    result => {
                        if(result.success) {
                            this._router.navigate(['/course']);
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

  filter() {
    if (this.query !== ""){
      this.filteredList = this.countries.filter(function(el){
        return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
      }.bind(this));
    }else{
      this.filteredList = [];
    }
  }
 
  select(item) {
    this.query = item;
    this.filteredList = [];
  }

  handleClick(event){
   var clickedComponent = event.target;
   var inside = false;
   do {
       if (clickedComponent === this.elementRef.nativeElement) {
           inside = true;
       }
      clickedComponent = clickedComponent.parentNode;
   } while (clickedComponent);
    if(!inside){
        this.filteredList = [];
    }
  }
}
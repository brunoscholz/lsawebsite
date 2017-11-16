import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";

import { UserService } from "../model/user.service";
import { SearchService } from "../model/search.service";
import { IPayload, ISearchData, Instructor, Course, School, Agent, Checkbox } from "../model/general";

import * as moment from "moment";
import * as _ from "underscore";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['../index/index.component.css', './search.component.css']
})
export class SearchComponent implements OnInit {
  _parameters:any = {};
  _term: IPayload = new IPayload();
  _data: any;

  _mode: string = '';
  _errorMessage: string;

  _form:FormGroup;
  _submitted:boolean = false;

  _courseTypes = {};
  _accomodationTypes = {};

  constructor(public _searchService:SearchService,
              public _userService:UserService,
              public _router:Router,
              public _activatedRoute:ActivatedRoute,
              public _formBuilder:FormBuilder) {

    // Construct form group
    this._form = _formBuilder.group({
      term: [''],
      startDate: ['', Validators.compose([])],
      endDate: ['', Validators.compose([])],
      courseType: [''],
      accomodation: [''],
      pickup: ['']
    }, {
      validator: validateDateTime(['startDate', 'endDate'])
    });

    this._courseTypes = SearchService.getCourseTypes();
    this._accomodationTypes = SearchService.getAccomodationTypes();
    this._form.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {}

  private _resetData() {
    this._term = new IPayload();
    this._term.pickup = new Checkbox();
  }

  public ngOnInit(): void {
    this._resetData();
    this._parameters = this._activatedRoute.params.subscribe(params => {
      // plus(+) is to convert 'id' to number
      if(typeof params['term'] !== "undefined") {
        this._term.q = params['term'];
        this._errorMessage = "";
        this.search();
      } else {
        this._mode = 'search';
      }
    });
  }

  public ngOnDestroy() {
    this._parameters.unsubscribe();
    this._term = new IPayload();
  }

  public onSubmit() {
    this._submitted = true;
    this.search();
  }

  search() {
    this._data = {};
    this._submitted = false;

    this._searchService.search(this._term)
      .subscribe(
        searchData => {

          let ret = _.groupBy(searchData, function(obj) { return obj["type"]; });
          this._data = ret;

          this._mode = 'list';
          this._submitted = false;
        },
        error => {
          // unauthorized access
          this._submitted = false;
          this._mode = 'search';
          if(error.status == 401 || error.status == 403) {
            this._userService.unauthorizedAccess(error);
          } else {
            this._errorMessage = error.data.message;
          }
        }
      );
  }

  public viewCity(cityId: string): void {
    this._router.navigate(['/city', cityId]);
  }

  public viewAgent(agentId: string): void {
    this._router.navigate(['/agent', agentId]);
  }

  public viewInstructor(instructorId: string): void {
    this._router.navigate(['/instructor', instructorId]);
  }

  public viewSchool(schoolId: string): void {
    this._router.navigate(['/school', schoolId]);
  }

  public viewCourse(courseId: string): void {
    this._router.navigate(['/course', courseId]);
  }
  
  public onChangeDateTime(type:string, dateTime:string) {
    let formattedDateTime:string = null;
    if(moment(dateTime).isValid()) {
      formattedDateTime = moment(dateTime).format("YYYY-MM-DD");
    }
    if(type == 'startDate') {
      this._term.startDate = formattedDateTime;
    } else if(type == 'endDate') {
      this._term.endDate = formattedDateTime;
    }
  }
}

function validateDateTime(fieldKeys:any){
  return (group: FormGroup) => {
    for(let i = 0; i < fieldKeys.length; i++) {
      let field = group.controls[fieldKeys[i]];
      if(typeof field !== "undefined" && (field.value != "" && field.value != null)) {
        if(moment(field.value, "YYYY-MM-DD", true).isValid() == false) {
          return field.setErrors({validateDateTime: true});
        }
      }
    }
  }
}
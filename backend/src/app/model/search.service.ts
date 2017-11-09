import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
//import { Subject } from 'rxjs/Subject';

import { GlobalService } from './global.service';
import { StaffService } from './staff.service';
import { ISearchData } from './general';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class SearchService {

  constructor(private _globalService:GlobalService,
              private _staffService:StaffService,
              private _authHttp: AuthHttp) {
  }

  // POST /v1/search
  search(data: any): Observable<any> {
    let headers = this.getHeaders();

    //let payload = {data: data};

    return this._authHttp.post(
      this._globalService.apiHost+'/search',
      JSON.stringify(data),
      {
        headers: headers
      }
    )
    .map(response => response.json())
    .map((response) => {
        return <ISearchData[]>response.data;
    })
    .catch(this.handleError);
  }

  private getHeaders():Headers {
    return new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+this._staffService.getToken(),
    });
  }

  private handleError(error: Response | any) {

    let errorMessage: any = {};
    // Connection error
    if (error.status == 0) {
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

  public static getCourseTypes(): Array<any> {
    return [
      {
        label: 'General English',
        value: 99
      },
      {
        label: 'Advanced English',
        value: 50
      },
      {
        label: 'Business English',
        value: 10
      }
    ];
  }

  public static getAccomodationTypes(): Array<any> {
    return [
      {
        label: 'General English',
        value: 99
      },
      {
        label: 'Advanced English',
        value: 50
      },
      {
        label: 'Business English',
        value: 10
      }
    ];
  }
}
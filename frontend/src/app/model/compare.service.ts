import { Injectable, OnDestroy } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable, Observer } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { GlobalService } from './global.service';
import { AuthHttp } from 'angular2-jwt';

import { Course, School } from "./general";

@Injectable()
export class CompareService implements OnDestroy {
  private currentTableSubject = new BehaviorSubject<Course[]>(new Array<Course>());
  public currentTable = this.currentTableSubject.asObservable().distinctUntilChanged();

  private hasProductsSubject = new ReplaySubject<number>(1);
  public hasProducts = this.hasProductsSubject.asObservable();

  _courses: Array<Course> = new Array<Course>();

  constructor(public _globalService:GlobalService,
              public _authHttp: AuthHttp,
              public _http: Http) {
  }

  setHasProducts(course: Course): Observable<boolean> {
    this._courses.push(course);
    this.saveTable();

    return Observable.create((observer: Observer<boolean>) => {
      this.currentTableSubject.next(this._courses);
      //if(this._courses.length > 2)
        this.hasProductsSubject.next(this._courses.length);

      observer.next(true);
      observer.complete();
      //observer.error("error");
    });
  }

  removeProduct(course: string): Observable<boolean> {
    this._courses = this._courses.filter(function(item) {
      return item.courseId !== course
    })

    return Observable.create((observer: Observer<boolean>) => {
      observer.next(true);
      observer.complete();
    });
  }

  refreshTable():void {
    this._courses = this.getTable();
    if(this._courses.length > 0) {
      this.currentTableSubject.next(this._courses);
      this.hasProductsSubject.next(this._courses.length);
    }
  }

  getTable() {
    return <Course[]>JSON.parse(localStorage.getItem('compare-table'));
  }

  saveTable() {
    localStorage.setItem('compare-table', JSON.stringify(this._courses));
  }

  // remove all
  purgeProducts() {
    // Set current user to an empty object
    this.currentTableSubject.next(new Array<Course>());
    // Set auth status to false
    this.hasProductsSubject.next(0);
    localStorage.removeItem('compare-table');
  }

  ngOnDestroy() {
    //localStorage.removeItem('compare-table');
    this.purgeProducts();
  }

  private getHeaders() : Headers {
    return new Headers({
      'Content-Type': 'application/json'
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
}

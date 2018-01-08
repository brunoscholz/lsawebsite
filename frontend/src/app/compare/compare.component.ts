import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CompareService } from "../model/compare.service";
import { User, Course, School } from "../model/general";

import * as _ from 'underscore';

@Component({
    selector: 'app-compare',
    templateUrl: './compare.component.html',
    styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {
     _errorMessage:string;
     _mode:string = '';
     _user:User;
     _profileId: string;

     _courses: Course[];

     _columns;
     _data;

    constructor(
        public _compare: CompareService,
        public _route: ActivatedRoute,
        public _router: Router
    ) {
    }

    public ngOnInit() {
        this._errorMessage = "";
        
        this._profileId = this._route.snapshot.params['userId'];

        this._courses = this._compare.getTable();
        //console.log(this._courses);

       /* this._userService.currentUser
        .subscribe((userData: User) => {
            this._user = userData;
            //this._isUser = (this._currentUser.username === this._profileId);
        });*/

        /*this._userDataService.getMe()
            .subscribe(
                user => {
                    this._user = user;
                    this._mode = 'view';
                },
                error => {
                    // unauthorized access
                    if(error.status == 401 || error.status == 403) {
                        this._userService.unauthorizedAccess(error);
                    } else {
                        this._errorMessage = error.data.message;
                    }
                }
            );*/

        this._columns = this.getColumns();
        this._data = this.getData();
    }

    getColumns() {
        let mp = _.map(this._courses, function(c) { return c['name']; });
        return mp;
    }

    getData() {
        let self = this;
        let mp = _.map(this.getItems(), function(c) {
            let m = _.map(self._courses, function(d) {
                return d[c['field']];
            });
            return {'rowName': c['label'], 'columns': m};
        })

        return mp;
    }

    getCourseData() {

    }

    public getItems():Array<any>{
        return [
            {
                label: 'Price',
                field: 'cost'
            },
            {
                label: 'Ratings',
                field: 'rating'
            },
            {
                label: 'Reviews',
                field: 'cost'
            },
            {
                label: 'Certified?',
                field: 'rating'
            },
            {
                label: 'TOEFL valid?',
                field: 'rating'
            }
        ];
    }
}

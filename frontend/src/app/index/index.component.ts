import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { SearchService } from "../model/search.service";
import { UserService } from "../model/user.service";

import { ISearchData } from "../model/general";

import * as _ from "underscore";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
//styleUrls: ['../layouts/frontend-layout.component.scss']
export class IndexComponent implements OnInit {
	_errorMessage: string = '';
	_featured: any;

	constructor(public _searchService: SearchService,
				public _userService: UserService,
				public _router: Router) {
	}

	ngOnInit() {
		//this._resetFormErrors();
		this.getFeatured();
	}

	getFeatured() {
		this._featured = null;
		this._searchService.featured()
		.subscribe(
			res => {
				let ret = _.groupBy(res, function(obj) { return obj.type; });
				this._featured = ret;
				
				console.log(this._featured);
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

	public search() {
		
	}

	public viewCity(city):void {
		//console.log(city);
		this._router.navigate(['/search', city.cityName.toLowerCase()]);
	}

	public viewCourse(courseId:string):void {
		console.log(courseId);
		this._router.navigate(['/course', courseId]);
	}

	public viewSchool(schoolId:string):void {
		console.log(schoolId);
		this._router.navigate(['/school', schoolId]);
	}
}

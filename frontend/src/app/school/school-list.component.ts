import { Component, OnInit } from '@angular/core';
import { CustomValidators } from 'ng2-validation';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SearchService } from "../model/search.service";
import { UserService } from "../model/user.service";

@Component({
  selector: 'app-search',
  templateUrl: './school-list.component.html',
  styleUrls: ['../layouts/frontend-layout.component.scss']
})
export class SchoolListComponent implements OnInit {
    private _errorMessage:string = '';

    constructor(private _searchService: SearchService,
    			private _userService: UserService,
                private _route: ActivatedRoute,
                private _router: Router) {
    }

    ngOnInit() {

    }

    
}

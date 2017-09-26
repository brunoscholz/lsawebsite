import { Component, OnInit } from '@angular/core';
import { CustomValidators } from 'ng2-validation';
import { Router } from "@angular/router";

import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import { SearchService } from "../model/search.service";
import { UserService } from "../model/user.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['../layouts/frontend-layout.component.scss']
})
export class IndexComponent implements OnInit {
	private _searchForm:FormGroup;
    private _formErrors:any;
    private _submitted:boolean = false;
    private _errorMessage:string = '';
    private _returnURL:string = '/';

	_result : any = {};

    constructor(private _searchService: SearchService,
    			private _userService: UserService,
    			private _formBuilder:FormBuilder,
                public _router: Router) {

    	this._searchForm = _formBuilder.group({
            term: ['', Validators.minLength(3)]
        });
        
        this._searchForm.valueChanges.subscribe(data => this.onValueChanged(data));
    }

     public onValueChanged(data?: any) {
        if (!this._searchForm) { return; }
        const form = this._searchForm;
        for (let field in this._formErrors) {
            // clear previous error message (if any)
            let control = form.get(field);
            if (control && control.dirty) {
                this._formErrors[field].valid = true;
                this._formErrors[field].message = '';
            }
        }
    }

    ngOnInit() {
        //this._resetFormErrors();
    }

    public search() {
        
    }

    public onSubmit(elementValues: any) {
        this._submitted = true;
    	this._result = null;
        this._router.navigate(['/search', elementValues.term]);
        /*this._searchService.search(elementValues.term)
            .subscribe(
                res => {
                    this._result = res
                },
                error =>  {
                    // unauthorized access
                    if(error.status == 401 || error.status == 403) {
                        this._userService.unauthorizedAccess(error);
                    } else {
                        this._errorMessage = error.data.message;
                    }
                }
            );*/
    }
}

import { Component, OnInit } from '@angular/core';
import { CustomValidators } from 'ng2-validation';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SearchService } from "../model/search.service";
import { UserService } from "../model/user.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['../layouts/frontend-layout.component.scss']
})
export class SearchComponent implements OnInit {
	private _searchForm:FormGroup;
    private _formErrors:any;
    private _submitted:boolean = false;
    private _errorMessage:string = '';
    private _returnURL:string = '/';

    _term:string;

	_result : any = {};

    constructor(private _searchService: SearchService,
    			private _userService: UserService,
    			private _formBuilder:FormBuilder,
                private _route: ActivatedRoute,
                private _router: Router) {


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
        this._term = this._route.snapshot.params['term'];
        this._searchForm.controls['term'].setValue(this._term);

        if (this._term != undefined) {
            this.search(this._term);
        }
    }

    public search(term) {
        this._result = null;
        this._searchService.search(term)
            .subscribe(
                res => {
                    this._result = res
                    console.log(res);
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

    public onSubmit(elementValues: any) {
        this._submitted = true;
    	this._result = null;
        this.search(elementValues.term);
    }

    gotoSchool(schoolId) {
        this._router.navigate(['/school', schoolId]);
    }
}

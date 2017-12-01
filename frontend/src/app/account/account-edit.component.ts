import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import * as _ from "underscore";

import {CustomValidators} from "ng2-validation";

import {UserDataService} from "../model/user-data.service";
import {User} from "../model/general";
import {UserService} from "../model/user.service";

@Component({
    selector: 'app-account-edit',
    templateUrl: './account-edit.component.html',
})
export class AccountEditComponent implements OnInit {

    _errorMessage:string;

    _mode:string = '';
    _user:User;
    _originalEmail:string = '';
    _form:FormGroup;
    _formErrors:any;


    _submitted:boolean = false;


    public userData:any = {};


    constructor(public _userService:UserService,
                public _userDataService:UserDataService,
                public _router:Router,
                public _formBuilder:FormBuilder) {

        // Construct form group
        this._form = _formBuilder.group({
            email: ['', Validators.compose([
                Validators.required,
                CustomValidators.email,
            ])],
            password: ['', Validators.compose([
                Validators.minLength(6)
            ])]
        });

        this._form.valueChanges
            .subscribe(data => this.onValueChanged(data));
    }

    public _setFormErrors(errorFields:any):void{
        for (let key in errorFields) {
            let errorField = errorFields[key];
            // skip loop if the property is from prototype
            if (!this._formErrors.hasOwnProperty(key)) continue;

            // let message = errorFields[error.field];
            this._formErrors[key].valid = false;
            this._formErrors[key].message = errorField;
        }
    }

    public _resetFormErrors():void{
        this._formErrors = {
            email: {valid: true, message: ''},
            password: {valid: true, message: ''},
        };
    }

    public _isValid(field):boolean {
        let isValid:boolean = false;

        // If the field is not touched and invalid, it is considered as initial loaded form. Thus set as true
        if(this._form.controls[field].touched == false) {
            isValid = true;
        }
        // If the field is touched and valid value, then it is considered as valid.
        else if(this._form.controls[field].touched == true && this._form.controls[field].valid == true) {
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

    public _resetUser(){
        this._user = new User();
        this._user.email = '';
        this._user.password = '';
    }

    public ngOnInit() {
        this._resetFormErrors();
        this._resetUser();

        this._errorMessage = "";
        this._userDataService.getMe()
            .subscribe(
                user => {
                    this._user = user;
                    this._originalEmail = user.email;
                    this._mode = 'update';
                },
                error => {
                    // unauthorized access
                    if(error.status == 401 || error.status == 403) {
                        this._userService.unauthorizedAccess(error);
                    } else {
                        this._errorMessage = error.data.message;
                    }
                }
            );
    }


    public ngOnDestroy() {

    }

    public onSubmit(elementValues: any) {
        this._resetFormErrors();
        this._submitted = true;
        this._errorMessage = '';

        let tempUser = _.pick(this._user, 'email', 'password');

        if(this._originalEmail != this._user.email) {

            let parent = this;

            this._userDataService.updateUser(tempUser)
                .subscribe(
                    result => {
                        if(result.success) {
                            parent._router.navigate(['/account']);
                        } else {
                            parent._submitted = false;
                        }
                        //resolve();
                    },
                    error =>  {

                        if(error.status == 422) {
                            let errorFields = JSON.parse(error.data.message);
                            parent._setFormErrors(errorFields);
                        }
                        // unauthorized access
                        else if(error.status == 401 || error.status == 403) {
                            parent._userService.unauthorizedAccess(error);
                        } else {
                            parent._errorMessage = error.data.message;
                        }
                        //resolve();

                    }
                );

        } else if(typeof this._user.password !== "undefined" && this._user.password != '') {
            this._userDataService.updateUser(tempUser)
                .subscribe(
                    result => {
                        if(result.success) {
                            this._router.navigate(['/account']);
                        } else {
                            this._submitted = false;
                        }
                    },
                    error =>  {

                        if(error.status == 422) {
                            let errorFields = JSON.parse(error.data.message);
                            this._setFormErrors(errorFields);
                        }
                        // unauthorized access
                        else if(error.status == 401 || error.status == 403) {
                            this._userService.unauthorizedAccess(error);
                        } else {
                            this._errorMessage = error.data.message;
                        }

                    }
                );
        } else {
            this._router.navigate(['/account']);
        }
    }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserDataService } from '../model/user-data.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./sign.components.css']
})
export class LoginPage implements OnInit {

  _loginForm:FormGroup;
  _formErrors:any;
  _submitted:boolean = false;
  _errorMessage:string = '';
  _returnURL:string = '/';

  constructor(public _userService:UserDataService,
              public _router:Router,
              public _activatedRoute:ActivatedRoute,
              public _formBuilder:FormBuilder) {

    this._loginForm = _formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
    this._loginForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

  }

  public _setFormErrors(errorFields:any):void{
    for (let key in errorFields) {
      // skip loop if the property is from prototype
      if (!errorFields.hasOwnProperty(key)) continue;

      let message = errorFields[key];
      this._formErrors[key].valid = false;
      this._formErrors[key].message = message;
    }
  }

  public _resetFormErrors():void{
    this._formErrors = {
      username: {valid: true, message: ''},
      password: {valid: true, message: ''},
    };
  }

  public _isValid(field):boolean {
    let isValid:boolean = false;

    // If the field is not touched and invalid, it is considered as initial loaded form. Thus set as true
    if(this._loginForm.controls[field].touched == false) {
      isValid = true;
    }
    // If the field is touched and valid value, then it is considered as valid.
    else if(this._loginForm.controls[field].touched == true && this._loginForm.controls[field].valid == true) {
      isValid = true;
    }
    return isValid;
  }

  public onValueChanged(data?: any) {
    if (!this._loginForm) { return; }
    const form = this._loginForm;
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
    this._resetFormErrors();
    //this._userService.logout();

    // get return url from route parameters or default to '/'
    this._returnURL = this._activatedRoute.snapshot.queryParams['r'] || '/';
  }

  public onSubmit(elementValues: any) {
    this._submitted = true;
    this._userService.attemptAuth(elementValues.username, elementValues.password)
      .subscribe(
        result => {
          if(result.success) {
            this._router.navigate([this._returnURL]);
            console.log(result);
          } else {
            this._errorMessage = 'Username or password is incorrect.';
            this._submitted = false;
          }
        },
        error => {
          this._submitted = false;
          // Validation error
          if(error.status == 422) {
            this._resetFormErrors();
            // this._errorMessage = "There was an error on submission. Please check again.";
            let errorFields = JSON.parse(error.data.message);
            this._setFormErrors(errorFields);
          } else {
            this._errorMessage = error.data;
          }
        }
      );
  }
}

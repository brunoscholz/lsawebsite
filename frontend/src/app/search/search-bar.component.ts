import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { CustomValidators } from 'ng2-validation';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SearchService } from "../model/search.service";
import { UserService } from "../model/user.service";

import { ISearchData } from "../model/general";

import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { SearchModalCmp } from './search.modal';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  @ViewChild(ModalDirective) public myModal: ModalDirective;
  @ViewChild('searchModal') public searchModal: SearchModalCmp;

  _searchForm:FormGroup;
  _formErrors:any;
  _submitted:boolean = false;
  _errorMessage:string = '';
  _returnURL:string = '/';

  constructor(public _searchService: SearchService,
              public _userService: UserService,
              public _formBuilder:FormBuilder,
              public _router: Router) {

    this._searchForm = _formBuilder.group({
      term: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])]
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

  public onSubmit(elementValues: any) {
    if(!this._searchForm.valid)
      return;

    this._submitted = true;
    //this._result = null;
    this._router.navigate(['/search', elementValues.term]);
  }

  searchModalClicked() {
    this.searchModal.show();
  }
}
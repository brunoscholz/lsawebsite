import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from "../model/user.service";
import { UserDataService } from "../model/user-data.service";

import { User } from '../model/general';

import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { SignModalCmp } from '../login/sign.modal';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild(ModalDirective) public myModal: ModalDirective;
  @ViewChild('signupModal') public signupModal: SignModalCmp;
  @ViewChild('signinModal') public signinModal: SignModalCmp;

  currentUser: User;
  basicData: any = {};

  constructor(
    private _userService: UserService,
    private _userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    let jwtValue: any = this._userService.getJWTValue();
    if (jwtValue != null) {
        this.basicData = jwtValue.data;
    }
    this._userDataService.currentUser
    .subscribe((userData) => {
      this.currentUser = userData;
    });

    this._userDataService.populate();
  }

  signUpClicked() {
    this.signupModal.show();
  }

  signInClicked() {
    this.signinModal.show();
  }

  closeSignIn() {
    this.signinModal.hide();
  }
}
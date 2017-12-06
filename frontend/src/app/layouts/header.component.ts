import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from "../model/user.service";
import { UserDataService } from "../model/user-data.service";

import { User } from '../model/general';

import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { SignModalCmp } from '../login/sign.modal';

import { CompareService } from '../model/compare.service';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild(ModalDirective) public myModal: ModalDirective;
  @ViewChild('signupModal') public signupModal: SignModalCmp;
  @ViewChild('signinModal') public signinModal: SignModalCmp;

  _hasProducts: number = 0;
  currentUser: User;
  basicData: any = {};

  constructor(
    private _userService: UserService,
    private _userDataService: UserDataService,
    private _compareService: CompareService
  ) { }

  ngOnInit(): void {
    let jwtValue: any = this._userService.getJWTValue();
    if (jwtValue != null) {
        this.basicData = jwtValue.data;
    }

    this._userDataService.currentUser
    .subscribe((userData) => {
      this.currentUser = userData;
    });

    this._compareService.hasProducts
    .subscribe((hasp) => {
      this._hasProducts = hasp;
    });

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
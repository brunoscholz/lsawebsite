import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from "../model/user.service";

import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { SignModalCmp } from '../login/sign.modal';

@Component({
    selector: 'app-frontend',
    templateUrl: './frontend-layout.component.html',
    styleUrls: ['./frontend-layout.component.css']
})
export class FrontendLayoutComponent implements OnInit {
    @ViewChild(ModalDirective) public myModal: ModalDirective;
    @ViewChild('signupModal') public signupModal: SignModalCmp;
    @ViewChild('signinModal') public signinModal: SignModalCmp;
    @ViewChild('childModal1') public childModal1:ModalDirective;
    @ViewChild('childModal2') public childModal2:ModalDirective;


    public disabled: boolean = false;
    public status: { isopen: boolean } = {isopen: false};

    public menuItems: any = {};

    public userData: any = {};

    constructor(public _userService: UserService) {
    }

    ngOnInit(): void {
        let jwtValue: any = this._userService.getJWTValue();
        if (jwtValue != null) {
            this.userData = jwtValue.data;
        }

        this.buildMenu();

        /*setTimeout(function() {
            this.signinModal.open();
        }, 1000);*/
    }

    buildMenu() {
        let items = [
            {
                label: '<img class="icon" src="assets/img/icons/user.svg" alt="dropdown image">',
                value: [{
                    label: '<li><a data-toggle="modal" data-target="#signup-modal" style="cursor: pointer;">Sign Up</a></li>',
                    value: false
                },
                {
                    label: '<li><a data-toggle="modal" data-target="#signin-modal" style="cursor: pointer;">Sign In</a></li>',
                    value: false
                }]
            }
            
        ];

        this.menuItems = items;
    }

    public toggled(open: boolean): void {
        console.log('Dropdown is now: ', open);
    }

    public toggleDropdown($event: MouseEvent): void {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    }

    signUpClicked() {
        //this.signupModal.show();
        this.childModal2.show();
    }

    signInClicked() {
        this.childModal1.show();
        //this.signinModal.show();
    }

    closeSignIn() {
        this.signinModal.hide();
    }

    public showExample():void {
        this.childModal1.show();
        this.childModal2.show();
    }

    public hideChildModal(n):void {
        this['childModal'+n].hide();
    }
}

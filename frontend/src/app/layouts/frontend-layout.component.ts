import {Component, OnInit} from '@angular/core';
import {UserService} from "../model/user.service";

@Component({
    selector: 'app-frontend',
    templateUrl: './frontend-layout.component.html',
    styleUrls: ['./frontend-layout.component.css']
})
export class FrontendLayoutComponent implements OnInit {

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
}

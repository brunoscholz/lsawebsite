import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import swal, { SweetAlertOptions } from 'sweetalert2';

import { StaffService } from "../model/staff.service";
import { SchoolDataService } from "../model/school-data.service";
import { School } from "../model/general";


@Component({
  selector: 'app-school',
  templateUrl: './school-list.component.html',
})
export class SchoolListComponent implements OnInit {
    private _errorMessage:string;
    private _schools:School[];

    public userData:any = {};

    constructor(private _schoolDataService:SchoolDataService,
                private _staffService:StaffService,
                private _router:Router) {}

    ngOnInit() {
        let jwtValue:any = this._staffService.getJWTValue();
        this.userData = jwtValue.data;
        this.getSchools();
    }

    public getSchools() {
        this._schools = null;
        this._schoolDataService.getAllSchools()
            .subscribe(
                schools => {
                    this._schools = schools;
                    console.log(this._schools);
                },
                error =>  {
                    // unauthorized access
                    if(error.status == 401 || error.status == 403) {
                        this._staffService.unauthorizedAccess(error);
                    } else {
                        this._errorMessage = error.data.message;
                    }
                }
            );
    }

    public viewSchool(school:School):void {
        this._router.navigate(['/school', school.schoolId]);
    }

    public editSchool(school:School):void {
        this._router.navigate(['/school/edit', school.schoolId]);
    }
}

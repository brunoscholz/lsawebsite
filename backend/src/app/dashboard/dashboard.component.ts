import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StaffService } from '../model/staff.service';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
	public userData:any = {};

    constructor(private _staffService:StaffService) { }

    ngOnInit(): void {
        let jwtValue:any = this._staffService.getJWTValue();
        this.userData = jwtValue.data;
    }

    
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { CompareService } from '../model/compare.service';
//import { CourseDataService } from '../model/course-data.service';
import { Course } from '../model/general';

@Component({
  selector: 'compare-button',
  templateUrl: './compare-button.component.html',
  styleUrls: ['./compare-button.component.css']
})
export class CompareButtonComponent {
  @Input('course') course: Course;
  @Input('inCard') inCard:boolean = false; 
  @Output() onToggle = new EventEmitter<boolean>();

  _submitted:boolean = false;
  _comparing:boolean = false;

  constructor(private _compareService: CompareService,
              private _router: Router) {}

  toggleComparing() {
    this._submitted = true;

    /*this._compareService.isAuthenticated
      .subscribe((authenticated) => {
        // Not authenticated? Push to login screen
        if (!authenticated) {
          this._router.navigateByUrl('/login');
          return;
        }*/

        // Follow this profile if we aren't already
        if (!this._comparing) {
          this._compareService.setHasProducts(this.course)
          .subscribe(
            data => {
              this._submitted = false;
              this._comparing = true;
              this.onToggle.emit(true);
            },
            err => this._submitted = false
          );
          // Otherwise, unfollow this profile
        } else {
          this._compareService.removeProduct(this.course['id'])
          .subscribe(
            data => {
              this._submitted = false;
              this._comparing = false;
              this.onToggle.emit(false);
            },
            err => this._submitted = false
          );
        }

      //});
  }
}
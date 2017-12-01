import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Router } from '@angular/router';

import { UserDataService } from '../model/user-data.service';
import { CourseDataService } from '../model/course-data.service';

import { Course } from '../model/general';

@Component({
  selector: 'enroll-button',
  templateUrl: './enroll-button.component.html'
})
export class EnrollButtonComponent {
  @Input() course: Course;
  @Output() onToggle = new EventEmitter<boolean>();
  _submitted:boolean = false;

  constructor(private _userService: UserDataService,
              private _courseService: CourseDataService,
              private _router: Router) {}

  toggleFollowing() {
    this._submitted = true;

    this._userService.isAuthenticated
      .subscribe((authenticated) => {
        // Not authenticated? Push to login screen
        if (!authenticated) {
          this._router.navigateByUrl('/login');
          return;
        }

        // Follow this profile if we aren't already
        /*if (!this.profile['following']) {*/
          this._courseService.enroll(this.course['id'])
          .subscribe(
            data => {
              this._submitted = false;
              this.onToggle.emit(true);
            },
            err => this._submitted = false
          );

        // Otherwise, unfollow this profile
        /*} else {
          this.profilesService.unfollow(this.profile['username'])
          .subscribe(
            data => {
              this._submitted = false;
              this.onToggle.emit(false);
            },
            err => this._submitted = false
          );
        }*/

      });
  }
}
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { UserDataService } from '../model/user-data.service';
import { CourseDataService } from '../model/course-data.service';

import { Course } from '../model/general';

@Component({
  selector: 'enroll-button',
  templateUrl: './enroll-button.component.html'
})
export class EnrollButtonComponent implements OnInit {
  @Input() course: Course;
  @Output() onToggle = new EventEmitter<boolean>();
  _submitted:boolean = false;

  enrolled: boolean = false;

  constructor(private _userService: UserDataService,
              private _courseService: CourseDataService,
              private _router: Router) {}

  ngOnInit() {
    this.enrolled = this._userService.checkEnrolled(this.course.courseId);
  }

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
        if (!this.enrolled) {
          this._courseService.enroll(this.course.courseId)
          .subscribe(
            (data) => {
              this._submitted = false;
              this.onToggle.emit(true);
              this._router.navigate(['/course/enroll', this.course.courseId]);
            },
            (err) => this._submitted = false
          );
        } else {
          // Otherwise, just see the enroll process
          this._router.navigate(['/course/enroll', this.course.courseId]);
        }

      });
  }
}
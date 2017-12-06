import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { School, Course } from "../model/general";

@Component({
  selector: 'small-card',
  templateUrl: './small-card.component.html',
  styleUrls: ['./small-card.component.css']
})
export class SmallCardComponent implements OnInit {
  @Input('course') course: Course;
  @Input('school') school: School;

  _mode: string = 'none';

  constructor(private _router: Router) {}

  ngOnInit() {
    if (this.course)
      this._mode = 'course';
    else if (this.school)
      this._mode = 'school';

    //console.log(this._mode);
  }

  public viewCourse(courseId:string):void {
    this._router.navigate(['/course', courseId]);
  }

  public viewSchool(schoolId:string):void {
    this._router.navigate(['/school', schoolId]);
  }
}
import { Component, Input, OnInit } from '@angular/core';
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

  constructor() {}

  ngOnInit() {
    if (this.course)
      this._mode = 'course';
    else if (this.school)
      this._mode = 'school';

    //console.log(this._mode);
  }
}
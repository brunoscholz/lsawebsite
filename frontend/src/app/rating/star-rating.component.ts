import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
//import { Router } from '@angular/router';

//import { Rating } from '../model/general';

@Component({
  selector: 'star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit {
  @Input('rate') rate: number;
  _max: number = 5;
  _readOnly: boolean = true;
  _nullable: boolean = false;

  @Input()
  get max() {
    return this._max;
  }
  set max(val: any) {
    this._max = this.getNumberPropertyValue(val);
  }

  innerValue: any;
  starIndexes: Array<number>;

  @Output('notify') notify: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit() {
    this.starIndexes = Array(this.max).fill(1).map((x, i) => i);
    this.value = this.rate;
  }

  getStarIconName(starIndex: number) {
    if (this.value === undefined) {
      return true;
    }

    if (this.value > starIndex) {
        return false;
    } else {
      return true;
    }
  }

  get value(): any {
    return this.innerValue;
  }

  set value(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
      this.notify.emit(value);
    }
  }

  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  rateThis(value: number) {
    if (value < 0 || value > this.max) {
      return;
    }

    /*if (value === this.value && this.nullable) {
      value = null;
    }*/

    this.value = value;
  }

  private getNumberPropertyValue(val: any): number {
    if (typeof val === 'string') {
      return parseInt(val.trim());
    }
    return val;
  }
}
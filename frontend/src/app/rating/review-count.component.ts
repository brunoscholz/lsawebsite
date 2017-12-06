import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

//import { Rating } from '../model/general';

@Component({
  selector: 'review-count',
  templateUrl: './review-count.component.html',
  styleUrls: ['./review-count.component.css']
})
export class ReviewCountComponent {
  @Input('count') count: number;

  
}
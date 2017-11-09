import { Component, Input, OnInit } from '@angular/core';
//import { Router, ActivatedRoute, Params } from "@angular/router";
import { Geography } from "../model/general";

@Component({
  selector: 'big-card',
  templateUrl: './big-card.component.html',
  styleUrls: ['./big-card.component.css']
})
export class BigCardComponent implements OnInit {
  @Input('city') city: Geography;

  constructor() {}

  ngOnInit() {
    //console.log(this.city.cityName);
  }
}
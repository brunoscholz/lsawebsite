import { Component, OnInit } from '@angular/core';

//import { CompareService } from "../model/compare.service";
//import { User, Course, School } from "../model/general";

@Component({
  selector: 'table-container',
  templateUrl: './table-container.html',
  styleUrls: ['./table-container.css']
})
export class TableContainer implements OnInit {
  _columns;
  _data;

  constructor() {
  
  }

  ngOnInit() {
    
  }
}
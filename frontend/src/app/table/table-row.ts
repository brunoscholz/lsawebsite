import { Component, Input } from '@angular/core';

//import { CompareService } from "../model/compare.service";
//import { User, Course, School } from "../model/general";

@Component({
  selector: 'table-row',
  templateUrl: './table-row.html',
  styleUrls: ['./table-row.css']
})
export class TableRow {
  @Input('data') data;

  constructor() {
  
  }

}
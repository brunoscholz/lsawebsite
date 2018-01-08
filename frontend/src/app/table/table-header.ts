import { Component, Input } from '@angular/core';

//import { CompareService } from "../model/compare.service";
//import { User, Course, School } from "../model/general";

@Component({
  selector: 'table-header',
  templateUrl: './table-header.html',
  styleUrls: ['./table-header.css']
})
export class TableHeader {
  @Input('columns') columns;

  constructor() {
  
  }

}
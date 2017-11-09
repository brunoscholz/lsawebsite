import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { SearchComponent } from './search.component';
import { SearchRoutingModule } from './search-routing.module';

@NgModule({
  imports: [
  	CommonModule,
    SharedModule,
    SearchRoutingModule
  ],
  declarations: [ SearchComponent ]
})
export class SearchModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TabsModule } from 'ngx-bootstrap/tabs';

import { SearchComponent } from './search.component';

import { SearchRoutingModule } from './search-routing.module';
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        TabsModule,
        FormsModule,
        ReactiveFormsModule,
        SearchRoutingModule
    ],
    declarations: [
        SearchComponent,
    ]
})
export class SearchModule {
}

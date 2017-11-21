import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SchoolListComponent } from './school-list.component';
import { SchoolDetailComponent } from './school-detail.component';
import { SchoolRoutingModule } from './school-routing.module';

import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        SchoolRoutingModule
    ],
    declarations: [
        SchoolListComponent,
        SchoolDetailComponent,
    ]
})
export class SchoolModule {
}

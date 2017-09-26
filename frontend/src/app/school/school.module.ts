import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SchoolListComponent } from './school-list.component';
import { SchoolFormComponent } from './school-form.component';
import { SchoolDetailComponent } from './school-detail.component';
import { SchoolRoutingModule } from './school-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SchoolRoutingModule
    ],
    declarations: [
        SchoolListComponent,
        SchoolFormComponent,
        SchoolDetailComponent,
    ]
})
export class SchoolModule {
}

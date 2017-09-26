import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { StudentListComponent } from './student-list.component';
import { StudentFormComponent } from './student-form.component';
import { StudentDetailComponent } from './student-detail.component';
import { StudentRoutingModule } from './student-routing.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        StudentRoutingModule,
    ],
    declarations: [
		StudentListComponent,
		StudentFormComponent,
		StudentDetailComponent,
    ]
})
export class StudentModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { InstructorListComponent } from './instructor-list.component';
import { InstructorFormComponent } from './instructor-form.component';
import { InstructorDetailComponent } from './instructor-detail.component';
import { InstructorRoutingModule } from './instructor-routing.module';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        InstructorRoutingModule,
    ],
    declarations: [
        InstructorListComponent,
		InstructorFormComponent,
		InstructorDetailComponent,
    ]
})
export class InstructorModule { }

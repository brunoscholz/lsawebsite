import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CourseListComponent } from './course-list.component';
import { CourseDetailComponent } from './course-detail.component';
import { CourseRoutingModule } from './course-routing.module';

import { EnrollButtonComponent } from '../buttons/enroll-button.component';

// CourseEnroll?

        //SharedModule,
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CourseRoutingModule
    ],
    declarations: [
        CourseListComponent,
        CourseDetailComponent,
        EnrollButtonComponent,
    ]
})
export class CourseModule {
}

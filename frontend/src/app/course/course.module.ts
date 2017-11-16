import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CourseListComponent } from './course-list.component';
import { CourseDetailComponent } from './course-detail.component';
import { CourseRoutingModule } from './course-routing.module';

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
    ]
})
export class CourseModule {
}

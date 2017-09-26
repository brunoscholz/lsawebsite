import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { CourseListComponent } from './course-list.component';
import { CourseFormComponent } from './course-form.component';
import { CourseDetailComponent } from './course-detail.component';
import { CourseRoutingModule } from './course-routing.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        CourseRoutingModule
    ],
    declarations: [
        CourseListComponent,
        CourseFormComponent,
        CourseDetailComponent,
    ]
})
export class CourseModule {
}

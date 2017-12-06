import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { CompareModule } from '../compare/compare.module';
import { ChatModule } from '../chat/chat.module';

import { CourseListComponent } from './course-list.component';
import { CourseDetailComponent } from './course-detail.component';
import { CourseEnrollComponent } from './course-enroll.component';
import { CourseRoutingModule } from './course-routing.module';

// CourseEnroll?

        //SharedModule,
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CourseRoutingModule,
        SharedModule,
        CompareModule,
        ChatModule,
    ],
    declarations: [
        CourseListComponent,
        CourseDetailComponent,
        CourseEnrollComponent,
    ]
})
export class CourseModule {
}

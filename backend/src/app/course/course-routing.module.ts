import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseListComponent } from './course-list.component';
import { CourseFormComponent } from './course-form.component';
import { CourseDetailComponent } from './course-detail.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Courses'
        },
        children: [
            {
                path: 'list',
                component: CourseListComponent,
                data: {
                    title: 'List',
                }
            },
            {
                path: 'create',
                component: CourseFormComponent,
                data: {
                    title: 'Create'
                }
            },
            {
                path: 'edit/:courseId',
                component: CourseFormComponent,
                data: {
                    title: 'Update'
                }
            },
            {
                path: ':courseId',
                component: CourseDetailComponent,
                data: {
                    title: 'View'
                }
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'list'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CourseRoutingModule {}

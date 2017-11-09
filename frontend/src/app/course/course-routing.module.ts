import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseListComponent } from './course-list.component';
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

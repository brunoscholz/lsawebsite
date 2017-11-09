import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstructorListComponent } from './instructor-list.component';
import { InstructorFormComponent } from './instructor-form.component';
import { InstructorDetailComponent } from './instructor-detail.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Instructors'
        },
        children: [
            {
                path: 'list',
                component: InstructorListComponent,
                data: {
                    title: 'List',
                }
            },
            {
                path: 'create',
                component: InstructorFormComponent,
                data: {
                    title: 'Create'
                }
            },
            {
                path: 'edit/:instructorId',
                component: InstructorFormComponent,
                data: {
                    title: 'Update'
                }
            },
            {
                path: ':instructorId',
                component: InstructorDetailComponent,
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
export class InstructorRoutingModule {}

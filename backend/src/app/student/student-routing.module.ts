import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentListComponent } from './student-list.component';
import { StudentFormComponent } from './student-form.component';
import { StudentDetailComponent } from './student-detail.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Students'
        },
        children: [
            {
                path: 'list',
                component: StudentListComponent,
                data: {
                    title: 'List',
                }
            },
            {
                path: 'create',
                component: StudentFormComponent,
                data: {
                    title: 'Create'
                }
            },
            {
                path: 'edit/:studentId',
                component: StudentFormComponent,
                data: {
                    title: 'Update'
                }
            },
            {
                path: ':studentId',
                component: StudentDetailComponent,
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
export class StudentRoutingModule {}

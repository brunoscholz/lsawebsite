import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchoolListComponent } from './school-list.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Schools'
        },
        children: [
            {
                path: 'list',
                component: SchoolListComponent,
                data: {
                    title: 'List',
                }
            },
            {
                path: 'create',
                component: SchoolFormComponent,
                data: {
                    title: 'Create'
                }
            },
            {
                path: 'edit/:schoolId',
                component: SchoolFormComponent,
                data: {
                    title: 'Update'
                }
            },
            {
                path: ':schoolId',
                component: SchoolDetailComponent,
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
export class SchoolRoutingModule {}

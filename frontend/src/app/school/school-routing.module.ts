import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchoolListComponent } from './school-list.component';
import { SchoolDetailComponent } from './school-detail.component';

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

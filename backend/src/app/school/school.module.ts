import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { SchoolListComponent } from './school-list.component';
import { SchoolFormComponent } from './school-form.component';
import { SchoolDetailComponent } from './school-detail.component';
import { SchoolRoutingModule } from './school-routing.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        SchoolRoutingModule
    ],
    declarations: [
        SchoolListComponent,
        SchoolFormComponent,
        SchoolDetailComponent,
    ]
})
export class SchoolModule {
}

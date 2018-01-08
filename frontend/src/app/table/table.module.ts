import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { SharedModule } from '../shared/shared.module';
//import { MomentModule } from 'angular2-moment';

import { TableContainer } from './table-container';
import { TableMain } from './table-main';
import { TableHeader } from './table-header';
import { TableRow } from './table-row';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        TableContainer,
        TableMain,
        TableHeader,
        TableRow,
    ],
    exports: [
        TableContainer,
        TableMain,
        TableHeader,
        TableRow,
    ]
})
export class TableModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { CompareComponent } from './compare.component';
import { CompareRoutingModule } from './compare-routing.module';

import { MomentModule } from 'angular2-moment';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        CompareRoutingModule,
        MomentModule,
    ],
    declarations: [
        CompareComponent,
    ],
    exports: [
    ]
})
export class CompareModule {
}

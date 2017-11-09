import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { AgmCoreModule }      from '@agm/core';


import { FormsModule, ReactiveFormsModule }        from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import { LimitToPipe } from './limit-to.pipe';
import { Nl2BrPipe } from './nl2br.pipe';
import { KeysPipe } from './keys.pipe';
import { ContainsValidator } from './contains-validator.directive';
import { AuthModule } from './auth.module';
import { TimepickerComponent } from './timepicker/timepicker.component';

import { MapComponent } from '../maps/map.component';

@NgModule({
    imports: [
        CommonModule,
        AgmCoreModule,
        FormsModule,
        ReactiveFormsModule,
        AuthModule,
        MomentModule,
    ],
    declarations: [
        LimitToPipe,
        Nl2BrPipe,
        KeysPipe,
        ContainsValidator,
        TimepickerComponent,
        MapComponent,
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        MomentModule,
        LimitToPipe,
        Nl2BrPipe,
        KeysPipe,
        ContainsValidator,
        TimepickerComponent,
        MapComponent,
    ],
    providers: []
})
export class SharedModule {
}
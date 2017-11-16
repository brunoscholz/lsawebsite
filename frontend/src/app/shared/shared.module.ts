import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { AgmCoreModule }      from '@agm/core';

import { FormsModule, ReactiveFormsModule }        from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import { LimitToPipe } from './limit-to.pipe';
import { Nl2BrPipe } from './nl2br.pipe';
import { KeysPipe } from './keys.pipe';

//import { ContainsModule } from './contains-validator.directive';
//import { ContainsValidator } from './contains-validator.directive';

import { AuthModule } from './auth.module';

import { BigCardComponent } from '../cards/big-card.component';
import { SmallCardComponent } from '../cards/small-card.component';
import { SearchBarComponent } from '../search/search-bar.component';

import { MapComponent } from "../maps/map.component";

        //ContainsModule.provideContains(contains),
@NgModule({
    imports: [
        CommonModule,
        AgmCoreModule,
        FormsModule,
        ReactiveFormsModule,
        AuthModule,
    ],
    declarations: [
        LimitToPipe,
        Nl2BrPipe,
        KeysPipe,

        BigCardComponent,
        SmallCardComponent,
        SearchBarComponent,
        MapComponent,
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        MomentModule,
        LimitToPipe,
        Nl2BrPipe,
        KeysPipe,

        BigCardComponent,
        SmallCardComponent,
        SearchBarComponent,
        MapComponent,
    ],
    providers: []
})
export class SharedModule {
}
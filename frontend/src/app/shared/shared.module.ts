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

import { ShowAuthedDirective } from './show-authed.directive';

import { BigCardComponent } from '../cards/big-card.component';
import { SmallCardComponent } from '../cards/small-card.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { SearchModalCmp } from '../search/search.modal';
import { SearchBarComponent } from '../search/search-bar.component';

import { MapComponent } from "../maps/map.component";

        //ContainsModule.provideContains(contains),
@NgModule({
    imports: [
        CommonModule,
        AgmCoreModule,
        FormsModule,
        ReactiveFormsModule,
        ModalModule,
        AuthModule,
    ],
    declarations: [
        LimitToPipe,
        Nl2BrPipe,
        KeysPipe,

        BigCardComponent,
        SmallCardComponent,
        SearchModalCmp,
        SearchBarComponent,
        MapComponent,
        ShowAuthedDirective,
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
        SearchModalCmp,
        SearchBarComponent,
        MapComponent,
        ShowAuthedDirective,
    ],
    providers: []
})
export class SharedModule {
}
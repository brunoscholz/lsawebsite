import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';


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

        //ContainsModule.provideContains(contains),
@NgModule({
    imports: [
        CommonModule,
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
    ],
    providers: []
})
export class SharedModule {
}
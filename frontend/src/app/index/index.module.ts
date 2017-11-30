import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IndexComponent} from './index.component';
import {IndexRoutingModule} from './index-routing.module';

import { SharedModule } from "../shared/shared.module";

//import { SearchComponent } from '../search/search.component';

/*import { BigCardComponent } from '../cards/big-card.component';
import { SmallCardComponent } from '../cards/small-card.component';
import { SearchBarComponent } from '../search/search-bar.component';*/

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        IndexRoutingModule
    ],
    declarations: [
        IndexComponent,
    ]
})
export class IndexModule {
}

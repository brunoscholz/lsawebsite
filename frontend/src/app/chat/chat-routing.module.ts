import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule
} from '@angular/router';

import { ChatWindowComponent } from './chat-window.component';
//import { ChatPageComponent } from './chat-page.component';

const routes: Routes = [
  {
    path: '',
    component: ChatWindowComponent,
    data: {
      title: 'Chat'
    }
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChatRoutingModule {
}

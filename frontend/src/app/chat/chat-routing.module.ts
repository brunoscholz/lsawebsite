import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThreadsComponent } from './threads.component';
//import { ChatWindowComponent } from './chat-window.component';
//import { ChatPageComponent } from './chat-page.component';

const routes: Routes = [
  {
    path: '',
    component: ThreadsComponent,
    data: {
      title: 'Messages'
    }
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChatRoutingModule {
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from './search.component';
//import { SearchFormComponent } from '.search-form.component';

const routes: Routes = [
  {
        path: '',
        children: [
            {
                path: '',
        		component: SearchComponent,
                data: {
                    title: 'Search',
                }
            },
            {
                path: ':term',
                component: SearchComponent,
                data: {
                    title: 'Search'
                }
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule {}

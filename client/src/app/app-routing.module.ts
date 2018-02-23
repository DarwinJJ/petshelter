import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowComponent } from './show/show.component';
import { NewComponent } from './new/new.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';


const routes: Routes = [
  {path : '', component :ShowComponent},
  {path : 'new', component :NewComponent},
  {path : 'detail/:id', component :DetailComponent},
  {path : 'edit/:id', component :EditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// Declares possible routes and there components.
const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

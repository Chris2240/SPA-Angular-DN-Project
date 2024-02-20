import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CounterPageComponent } from './counter-page/counter-page.component';
import { JobsPageComponent } from './jobs-page/jobs-page.component';

// Declares possible routes and there components.
const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'counter', component: CounterPageComponent},
  {path: 'job-table', component: JobsPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

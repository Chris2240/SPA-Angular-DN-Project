import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobsTableComponent } from './jobs-table/jobs-table.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CounterPageComponent } from './counter-page/counter-page.component';
import { CounterComponent } from './counter/counter.component';
import { JobsPageComponent } from './jobs-page/jobs-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CounterPageComponent,
    JobsPageComponent,
    JobsTableComponent,
    CounterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

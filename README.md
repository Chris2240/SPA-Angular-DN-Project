# DN Angular Template

Created for the DN Bootcamp, this template allows you to practice developing applications in Angular.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.2.

What is Angular? - [Angular Docs](https://angular.io/docs)

## Contents
- [Setting up your environment](#setting-up-your-environment)
- [How to run the App](#how-to-run-the-app)
- [Contents of the Example](#contents-of-the-example)
    - [Single page navigation](#single-page-navigation)
    - [Counter](#counter)
    - [Jobs table](#jobs-table)
- [Common Commands](#common-commands)
    - [Run Development server](#run-development-server)
    - [Create new Component](#create-new-component)
    - [Build](#build)
    - [Running unit tests](#running-unit-tests)
    - [Running end-to-end tests](#running-end-to-end-tests)
    - [Further help](#further-help)

## Setting up your environment
### Node.js
Node.js must be installed to run this framework.

How to install Node.js - [Node.js Docs](https://nodejs.dev/en/learn/how-to-install-nodejs/)

To check you have Node.js installed, run the following command in the terminal.

`node --version`

### Angular CLI
The Angular CLI is a command-line interface tool used to initialize, develop, and maintain Angular applications from the command line.

Run the following command to install the Angular CLI.

`npm install -g @angular/cli`

To check you have the Angular CLI installed, run the following command in the terminal.

`ng version`

## How to run the App

We advise that you use `Git` to clone this github repository. Alternatively you can download this repo as a `.zip` file through github.

What is Git? - [Getting Started - What is Git?](https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F)

How to install Git? - [Getting Started - Installing Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

After cloning the repository, the projects dependencies will need to be installed. In the root directory of your project, run the following command to install the necessary packages.

`npm install`

The project dependencies may need to be updated at the time of install - [npm-update](https://docs.npmjs.com/cli/v10/commands/npm-update)

More information on NPM - [Intro to NPM package Manager](https://nodejs.dev/en/learn/an-introduction-to-the-npm-package-manager/)

Once you have followed the steps in [Setting Up Your Environment](#setting-up-your-environment), run the following command in the terminal.

`ng server --open`

This will start the application running on `localhost`. The `--open` parameter will open the app in a browser.

## Contents of the Example
### Single page navigation

This example shows how Single Page Navigation can be implemented in Angular through routing.

The `app-routing.module.ts` contains `routes` which stores all the paths and their corresponding component (page-components).

```TypeScript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CounterPageComponent } from './components/counter-page/counter-page.component';
import { JobsPageComponent } from './components/jobs-page/jobs-page.component';

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
```

When the path is selected the components content is inserted into the `<router-outlet>` tag in the `app.component.html`.

```html
<img id="logo" class="logo" src="assets/DN-Logo.png" alt="Digital Native Logo">
<h1 class="page-title">{{title}}</h1>
<div class="page-content-container">
    <!-- Inserts component based on routing. -->
    <router-outlet></router-outlet>
</div>
```

For Example when the URL is `localhost:4200/counter` the `counter-page` component is loaded (`counter-page.component.html`). When adding `<a>` elements instead of using `href` the `routerLink` attribute is used.

```HTML
<a class="nav-link pink-btn" routerLink="/">Back to Home</a>
<div>
    <app-counter></app-counter>
</div>
```


### Counter

This example shows how component property values can be updated based on user input.

The `counter.component.ts` contains the main component class. The component contains a property `incrementAmount` and `count` and 2 methods:
- `resetCounter()` - this method resets the counter back to zero.
- `incrementCounter()` - this method increments the counter based on the increment amount.

```TypeScript
import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})

export class CounterComponent {

  incrementAmount: number = 1;
  count: number = 0;

  resetCounter(){
    this.count = 0;
  }

  incrementCounter(){
    this.count += this.incrementAmount;
  }
}
```

Within the `counter.component.html` onclick events are added through the `(click)` attribute, to call the component methods `resetCounter()` and `incrementCounter()`. The count is also displayed/updated by referencing the `count` property of the component `<p class="counter-value">{{count}}</p>`.

```HTML
<div class="counter-container">
    <h2>Counter</h2>
    <p>This counter example shows how component class properties values can be updated.</p>
    <div>
        <p><strong>Current Value:</strong></p>
        <p class="counter-value">{{count}}</p>
        <button class="btn green-btn" type="button" (click)="incrementCounter()">Increment</button>
        <button class="btn green-btn" type="button" (click)="resetCounter()">Reset</button>
    </div>
</div>
```

### Jobs table

This example shows how an array of data can be displayed in a table.

The `jobs-table.compponent.ts` contains the main component class. The component class contains a property `jobs`, of type `Job[]`. The `constructor()` is called when the component is instantiated, which creates an instance of `JobsTableService`. The `JobsTableService.getJobs()` method is then called, and the return value is assigned to the `jobs` property.

```TypeScript
import { Component } from '@angular/core';
import { JobsTableService } from './jobs-table.service';
import { Job } from './job';

@Component({
  selector: 'app-jobs-table',
  templateUrl: './jobs-table.component.html',
  styleUrl: './jobs-table.component.css'
})

export class JobsTableComponent {
    jobs: Job[];

    constructor(){
        // Create instance of Job Table Service and Get Jobs Data.
        const service = new JobsTableService();
        this.jobs = service.getJobs();
    }
}
```

The `jobs-table.service.ts` contains a method `getJobs()` that returns an array of `Jobs`. This returns a static array but could be used to return data from a database or another destination.

```TypeScript
import { Job } from "./job";

export class JobsTableService{
    //Returns example Jobs Data Array.
    getJobs(): Job[]{
        return [
            {
                id: 1,
                title: "Job 1",
                description: "Description of Job 1"
            },
            ...
        ];
    }
}
```

The `job.ts` contains the Job interface.

```TypeScript
export interface Job{
    id: number;
    title: string;
    description: string;
}
```

Within the `jobs-table.component.html` the Jobs table html is set, iterating through the component property `jobs` using the `*ngFor` attribute to create each row in the `<tbody>` element.

```HTML
<table>
    <thead>
        <th>#</th>
        <th>Title</th>
        <th>Description</th>
    </thead>
    <tbody *ngFor="let job of jobs">
        <!-- Rows inserted for each Job in Jobs array.-->
        <tr>
            <td>{{job.id}}</td>
            <td>{{job.title}}</td>
            <td>{{job.description}}</td>
        </tr>
    </tbody>
</table>
```

## Common Commands

### Run Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Create new Component

Run `ng generate component component-name` to generate a new component.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

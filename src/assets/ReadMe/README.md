# Level 3 Development Angular

In this project I have been given the following task to achieve a whole Single Page Application (SPA) work as expected in Angular campilation:

## Contents
- [Setting up your environment](#setting-up-your-environment)
- [Creating additional branches to preventing unnecessary losses](#creating-additional-branches-to-preventing-unnecessary-losses)
- [Preparation for own project using DN Template](#preparation-for-own-project-using-dn-template)
- [Transfer previous TypeScript project into DN template](#transfer-previous-typescript-project-into-dn-template)
- [Pages prescriptions](#pages-prescriptions)
    - [File Load Page](#file-load-page)
    - [Main View Page](#main-view-page)
    - [Applicant Job Display View Page](#applicant-job-display-view-page)
    - [Applicant Profile Page](#applicant-profile-page)
    - [Employer Profile Page](#employer-profile-page)
    - [Main View Employer Page](#main-view-employer-page)
    - [Add Edit Job Employer Page](#add-edit-job-employer-page)
    - [Applicant(s) Applies View Page](#aplicants-applies-view-page)
    - [Not Found Page](#not-found-page)
- [To summarize](#to-summarize)
- [Special Thanks](#special-thanks)

## Setting up your environment
To run this app I needed to set the environment first which is already set but for someone if not, need to follow the steps:

Open the vscode and in the terminal provide some installations:
* install the Node.js,
* install the Angular cli - npm install -g @angular/cli,
* check if the Angular is correct installed - ng -- version or ng v (if so it will version provided).

Now I am ready to clone and run the DN template in Angular. To do so I needed to do as follows:
* clone the project from the github repository(the link was provided into this path),
* after cloning the repository, the project's dependencies will need to be installed. In the root directory of your project, run the following command to install the necessary packages:

`npm install`

* The project dependencies may need to be updated at the time of install. To do so we need to type the following command:

`npm update`

After those steps the project should look as follows:

![alt text](<Screenshots_Readme/Screenshot 2.jpg>)

![alt text](<Screenshots_Readme/Screenshot 1.jpg>)

Finally I can open the app using npm start or ng serve or ng serve --open (the last one it will build the angular app and open itself in default browser for you).

## Creating additional branches to preventing unnecessary losses
Because I needed to redevelop the DN Angular Template, so in this case it is a good practice to commit in .git. The first commit which I have used is updating npm which shows as in .git  that the “package-lock.json” is modifying and I should commit this but NOT push:

![alt text](<Screenshots_Readme/Screenshot 3.jpg>)

### Cleanup-start branch:
I have created a restore branch just for in casse if I will need to to go back into original template and the way to do that is as follows:

![alt text](<Screenshots_Readme/Screenshot 4.jpg>)

Now safely I am able to modify the whole project as I want without worries that I will mess it up. If I do, we can restore into the main branch again as:

![alt text](<Screenshots_Readme/Screenshot 5.jpg>)

But before that I need to make sure all uncommitted changes are committed. Otherwise **git carries those changes over as uncommitted in the new branch**.

## Preparation for own project using DN Template
To prepare my own project I needed to first delete unnecessary content such as pages, components, and comment some attributes in style.css from the original DN template. Once when I have done it commit those changes as an one in the terminal:

`git status`

`git add .`

`git commit -m “Delete previous pages and components, plus commented some attributes on style.css”`

Then in git history you will be able to see this commit

## Transfer previous TypeScript project into DN template
First I created another restore point branch which provides cleanup and ready template for adding own implementations, components, pages, styles and services. The branch is called: `cleanap-finish`. However the default branch it will still the `main` one:

![alt text](<Screenshots_Readme/Screenshot 6.jpg>)

## Pages prescriptions
Instead of showing step by step how the project is implemented I will introduce every individual page content. However the source code from start to end is already commented on so other developers should not have any problems understanding its logic and HTML templates.

This SPA is basically a Job Advertising application managed by an employer to recruit applicants or users which are interested in following vacancies visiting this application.

### File Load Page

<img src="./Screenshots_Readme/Screenshot 7.jpg" width="50%" />

This Page is for loading the "CSV" file where previously this file is nothing else as saving file whatever exist from Excel table. After pressing the "Submit" button this loading file is displaying all its content at another page called "Main View". To display all content this "csv" file into "Main View" page I had to use third part "papaparse" library, which converting this "csv" file into static json structure data (format). Thanks to that I could able to store all this content at service **csvDB** Indexed DataBase (default web browser database) called "CSVDataIDB".

### Main View Page

<img src="./Screenshots_Readme/Screenshot 8.jpg" width="50%" />

This page is displaying all "CSV" file content on the table. That CSV file is nothing else than the Jobs Advertising list which includes:

- **Role Category**
- **Role**
- **Location**
- **Indusrty**
- **Function**
- **Job Title**
- **Experience**
- **Salary**

As you can see every row contains the "Details" button. After pressing this button it transfers you into another page called "Applicant Job Display View" with the "role" key to pass this reference in this particular page and populate all raw data of this particular job. To achieve this goal I had to use it the following snipped code inside the **detailsBtn** method in the "MainViewComponent":

```TypeScript
this.router.navigate(['/applicant-job-display-view-page'], {
      queryParams: {role}
    });
```

Also there are two buttons (anchor elements) "Applicant Profile" and "Employer Profile" which after pressing it, takes you to another page regardless of your particular profile. However If one of the profiles is completed the particular button is not visible anymore. This is for preventing overstoring or mixing up with already existing data in localStorage (other default web browser storage) of unnecessary data.

### Applicant Job Display View Page

<img src="./Screenshots_Readme/Screenshot 9.jpg" width="50%" />

This page presents the previously mentioned populated data from a particular raw job after the "Details" pressed button (anchor element) at the "Man View" page. As you can see there are inputs and select elements fields with already values provided which can't be modified or deleted by the user. This is also for preventing mixing up with already existing data in service **csvDB.service** (Indexed DataBase) of unnecessary data as well.

To populate and fetch all values into particular fields I managed to use an access of the key "role" and I retrieved all fields using **transaction** APIs from the **csvData_os** object store of "CSVDataIDB" Indexed DataBase and iterate these data through the all inputs fields.

To apply for the job you need to press the Applicant Profile button (anchor element) and provide the following details. Otherwise if you want to back again into the "Main View" page you need to press the "Back" button.

After pressing "Apply" button the all data is saved in other service called **applicant-data-db.service**. This second service I have created combines all "Applicant Job Display View" and "Applicant Profile" data in one and retrieves it at the "Applicant(s) Applies" page.

To save all "input fields" and "select elements" at **localStorage** I have use the custom directives called **save-input-on-blur.directive** which the code it will reuse in other pages like "Applicant Profile" and "Employer-Profile". That is for manipulating buttons and UI of particular pages purposes.

### Applicant Profile Page

<img src="./Screenshots_Readme/Screenshot 10.jpg" width="45%" /> <img src="./Screenshots_Readme/Screenshot 11.jpg" width="45%" /> 

In this page the user (applicant) needs to fill the first three input fields to apply for the job afterwards - the button "Apply" will appear instead of "Applicant Profile" at "Applicant Job Display View". The "Profile Picture" or "CV" sections are optimal. I chose that because not everyone could provide a picture or cv at that time. If an employer would be interested in a particular applicant without a cv, he can always request for cv by writing an applicant email.

The name it will always display, where picture or CV not always because as I mentioned before are optional.

The phone number and email address input elements are provided validations to prevent users from typing incorrect data.

Regarding the "Profile Picture" section code wise I am dealing using another custom directive called **save-and-display-picture.directive**, and again directive because this section will be reused in other pages as well called: "Employer Profile" for retrieving and displaying pictures and comapny logo.

The "CV" section doesn't have custom directive because the "CV" is saving at indexed DataBase (same as picture) and retrieving by pressing "Download CV" button only at this current page by logic, however at "Applicat(s) Applies" page the CV is managed by HTML template (structure) only.

```HTML
<!-- handle the CV if exist -->
                        <ng-container *ngIf="item['Applicant CV']; else noCV">
                            <a [href]="item['Applicant CV']" [download]="item['Applicant Name'] + '_CV'" id="applicant-applies-CV-link" class="nav-link green-btn">Downolad CV</a>
                        </ng-container>
                        <ng-template #noCV>
                            <span>No CV Available</span>
                        </ng-template>
```

The "Applicant(s) Applies" has a cell for retrieving and displaying pictures but in this case is handled via HTML template only. Pretty similar as solution above:

```HTML
<!-- handle the picture if exist -->
                        <ng-container *ngIf="item['Applicant Profile Picture']; else noPhoto">
                            <img [src]="item['Applicant Profile Picture']" id="applicant-applies-photo-src" alt="Applicant Photo" style="width: 100px; height: 70px; display: block"/>
                        </ng-container>
                        <ng-template #noPhoto>
                            <span>No Picture Provided</span>
                        </ng-template>
```

### Employer Profile Page

<img src="./Screenshots_Readme/Screenshot 12.jpg" width="45%" /> <img src="./Screenshots_Readme/Screenshot 13.jpg" width="45%" />

This page represents the employer profile which can see the name itselfe and picture above fileds. The input fileds and select options inputs are for storage data to could display them on "Main View Employer" page on above the table.

The phone number and email address input elements are provided validations similarly as in "Applicant Profile" to prevent users from typing incorrect data.

I saved data in localStorage using the custom directives called **save-input-on-blur.directive** and **save-and-display-picture.directive** as in previous pages. For retrieving them I needed to get access to localStorage and access them using string type annotations properties to assign them with it and binding those properties with elements on HTML template.

### Main View Employer Page

<img src="./Screenshots_Readme/Screenshot 14.jpg" width="45%" /> <img src="./Screenshots_Readme/Screenshot 15.jpg" width="45%" />

This page provides the main employer page where this person can manage, delete, add a new job, back to their own profile, and view the applicants which have already applied for a particular job from the "Main View" page. The Table below provides exactly this same content which has a "Main View" page table.

Whenever the employer adds a new job or modifies an already existing one it will reflect "Main View Employer" and "Main View" pages. Basically the **csvDB.service** is overwritten and that is why the tables are changed on both pages.

**After Job Added**:
<img src="./Screenshots_Readme/Screenshot 16.jpg" width="40%" /> <img src="./Screenshots_Readme/Screenshot 17.jpg" width="40%" />

### Add Edit Job Employer Page

<img src="./Screenshots_Readme/Screenshot 18.jpg" width="45%" /> <img src="./Screenshots_Readme/Screenshot 19.jpg" width="45%" />

In this page the employer is able to add or modify an already existing job. Also is providing the employer name and picture right above the input fields and select option elements.

### Aplicant(s) Applies View Page

<img src="./Screenshots_Readme/Screenshot 20.jpg" width="80%" />

This page shows all applicants who applied for current jobs.

This page is added as an additional page by itself. The business scenario doesn't mention anything about it. After a while of developing this single page application (SPA) I find out that the list of applicants is missing. I decided to create one, where now the employer is able to view all applicants, contact with them or even delete if not need anymore.

### Not Found Page

<img src="./Screenshots_Readme/Screenshot 21.jpg" width="40%" />

This page displays the wrong URL if any applicant or user would accidently go to the wrong webpage and the button "Main Page" will navigate back to the "File Load" page, where everything is started. 

## To summarize
I really enjoyed working on that project. I have learned a lot how to migrating or implementing the whole pages in this SPA in various ways. Thanks to Angular I realise how components ".ts" files and HTML templates are connected to each other. 
- Routes - navigating pages,
- Models (interfaces) - accessing interfaces in components ".ts" to have an access later in HTML templates to iterating some data in tables using `<tr *ngFor="let item of csvData">` as an example,
- Directives - for reuse the code or logic in other components,
- Services - for storing data,
- constructors - for accessing the services, router, route, ElementRef (inside directives),
- `ngOnInit(): void { ... }` - runs once when the page (component) is initialised for the first time and/or for data-only logic (variables, services, etc.),
- `ngAfterViewInit(): void { ... }` - for anything that depends on "@ViewChild" properties decorators, ElementRef, or direct DOM elements.

<br>
I don't know if anybody who is reading this relies on it, but there is one thing which I have not mentioned and didn't do regarding this project:

<br>

I have not checked this SPA in "Unit Test". I have never done them but I know they are designed to check if a very small, isolated part of a larger software application, like a single function or module, is working correctly as expected. I understand their are very important but I need to finish other projects regarding C# and Blazor within a short period of time. However working in a commercial environment the "Unit Tests" are very crucial and important where I would definitely do so if I would work for one of them.

## Special Thanks
Definitely I want to thanks all "Digital Native" Bootcamp team to give me an opportunity felt how the building software apps looks like, implementing them, migrating from other programing languages as JavaScript and TypeScript. Installing and using different npm libraries, third part libraries depends on which programming language is currently using for a particular single page application (SPA). There are such things which I can't even describe how amazing and good I felt wherever I found out the solutions for a particular issue. **BIG THANK YOU** - without **YOU** I would never reach that level of programming which I have right now ;).
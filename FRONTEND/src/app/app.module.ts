import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { ContactComponent } from './contact/contact.component';
import { GaleryComponent } from './galery/galery.component';
import { NavComponent } from './home/nav.component';
import { MainComponent } from './main/main.component';
import { ProjectDescriptionComponent } from './project-description/project-description.component';
import { ProjectComponent } from './project/project.component';
import { TeamComponent } from './team/team.component';
import { DescprojComponent } from './descproj/descproj.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { SearchComponent } from './search/search.component';

import { ProjectService } from './services/project.service'; // Import ProjectService

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MainComponent,
    ContactComponent,
    GaleryComponent,
    TeamComponent,
    ContactPageComponent,
    ProjectComponent,
    ProjectDescriptionComponent,
    DescprojComponent,
    ProjectListComponent,
    ProjectDetailsComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [ProjectService], // Add ProjectService to providers
  bootstrap: [AppComponent]
})
export class AppModule { }

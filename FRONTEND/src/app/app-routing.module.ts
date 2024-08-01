import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutUsComponent } from './about-us/about-us.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { ContactComponent } from './contact/contact.component';
import { GaleryComponent } from './galery/galery.component';
import { NavComponent } from './home/nav.component';
import { MainComponent } from './main/main.component';
import { ProjectDescriptionComponent } from './project-description/project-description.component';
import { ProjectComponent } from './project/project.component';
import { TeamComponent } from './team/team.component';

const routes: Routes = [
  { path: '', redirectTo: '/nav', pathMatch: 'full' }, // Redirect to a default component
  { path: 'nav', component: NavComponent },
  { path: 'main', component: MainComponent },
  { path: 'galery', component: GaleryComponent },
  { path: 'team', component: TeamComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'projectdescription/:id', component: ProjectDescriptionComponent }, // Route with ID parameter
  { path: 'project', component: ProjectComponent }, // General project route
  { path: 'contact-page', component: ContactPageComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: '**', redirectTo: '/nav' } // Catch-all route for undefined paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

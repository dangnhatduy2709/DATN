import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { ProjectViewsComponent } from './project-views/project-views.component';
import { ProjectAddComponent } from './project-add/project-add.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectTeamComponent } from './project-team/project-team.component';
import { ProjectUserComponent } from './project-user/project-user.component';
import { UserDetailsComponent } from './project-user/user-details/user-details.component';
import { ProjectSettingComponent } from './project-setting/project-setting.component';



export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    component: ProjectsComponent,
    children: [
      { path: 'dashboard', component: ProjectDashboardComponent },

      { path: 'project-view', component: ProjectViewsComponent },

      { path: 'project-add', component: ProjectAddComponent },

      { path: 'project-list', component: ProjectListComponent },

      { path: 'project-team', component: ProjectTeamComponent },

      { path: 'project-user', component: ProjectUserComponent },

      { path: 'user-details/:id', component: UserDetailsComponent },

      { path: 'project-setting', component: ProjectSettingComponent },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ProjectRoutingModule { }

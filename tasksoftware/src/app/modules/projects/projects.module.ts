import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { ProjectRoutingModule } from './projectsRouting.module';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

// Components
import { ProjectsComponent } from './projects.component';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { ProjectViewsComponent } from './project-views/project-views.component';
import { ProjectAddComponent } from './project-add/project-add.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectTeamComponent } from './project-team/project-team.component';
import { ProjectUserComponent } from './project-user/project-user.component';
import { UserDetailsComponent } from './project-user/user-details/user-details.component';
import { ProjectSettingComponent } from './project-setting/project-setting.component';







@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectDashboardComponent,
    ProjectViewsComponent,
    ProjectAddComponent,
    ProjectListComponent,
    ProjectTeamComponent,
    ProjectUserComponent,
    UserDetailsComponent,
    ProjectSettingComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzDropDownModule,
    NzAvatarModule,
    NzBadgeModule,
    NzModalModule,
    NzTabsModule,
    NzProgressModule,
    NzTableModule,
    NzDividerModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NzPaginationModule,
    NzInputModule,
    NzCheckboxModule,
    NzDatePickerModule,
    NzCalendarModule,
    NzMessageModule,
    NzSelectModule,
    NzUploadModule,
    NzCommentModule,
    NzTagModule,
    NzEmptyModule

  ],
  exports: [
    ProjectsComponent,
    ProjectDashboardComponent,
    ProjectViewsComponent,
    ProjectAddComponent,
    ProjectListComponent,
    ProjectTeamComponent,
    ProjectUserComponent,
    UserDetailsComponent,
    ProjectSettingComponent
  ]
})
export class ProjectsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { TasksRoutingModule } from './tasksRouting.module';
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

// Components
import { AvatarComponent } from './board/board.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FormComponent } from './form/form.component';
import { IssuesComponent } from './issues/issues.component';
import { SettingsComponent } from './settings/settings.component';
import { ShortcutsComponent } from './shortcuts/shortcuts.component';
import { SummaryComponent } from './summary/summary.component';
import { TimlineComponent } from './timline/timline.component';
import { TasksComponent } from './tasks.component';
import { ListComponent } from './list/list.component';








@NgModule({
  declarations: [
    AvatarComponent,
    CalendarComponent,
    FormComponent,
    IssuesComponent,
    SettingsComponent,
    ShortcutsComponent,
    SummaryComponent,
    TimlineComponent,
    TasksComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
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
    NzTagModule

  ],
  exports: [
    AvatarComponent,
    CalendarComponent,
    FormComponent,
    IssuesComponent,
    SettingsComponent,
    ShortcutsComponent,
    SummaryComponent,
    TimlineComponent,
    TasksComponent,
    ListComponent
  ]
})
export class TasksModule { }

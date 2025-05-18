import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { FormComponent } from './form/form.component';
import { SettingsComponent } from './settings/settings.component';
import { ShortcutsComponent } from './shortcuts/shortcuts.component';
import { SummaryComponent } from './summary/summary.component';
import { TimlineComponent } from './timline/timline.component';
import { TasksComponent } from './tasks.component';
import { IssuesComponent } from './issues/issues.component';
import { AvatarComponent } from './board/board.component';


export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    component: TasksComponent,
    children: [

      { path: 'work-timline', component: TimlineComponent },

      { path: 'work-summary/:id', component: SummaryComponent },

      { path: 'work-shortcuts/:id', component: ShortcutsComponent },

      { path: 'work-setting/:id', component: SettingsComponent },

      { path: 'work-issues/:id', component: IssuesComponent },

      { path: 'work-form/:id', component: FormComponent },

      { path: 'work-calendar/:id', component: CalendarComponent },

      { path: 'work-avatar/:id', component: AvatarComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class TasksRoutingModule { }

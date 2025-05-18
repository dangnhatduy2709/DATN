import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },

  { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },

  { path: 'task', loadChildren: () => import('./modules/tasks/tasks.module').then(m => m.TasksModule) },

  { path: 'project', loadChildren: () => import('./modules/projects/projects.module').then(m => m.ProjectsModule) },

  { path: '**', loadChildren: () => import('./modules/error/error.module').then(m => m.ErrorModule) }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

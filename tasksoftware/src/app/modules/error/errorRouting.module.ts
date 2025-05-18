import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { ErrorComponent } from './error.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';



export const routes: Routes = [
  {
    path: '**',
    component: ErrorComponent,
    children: [
      {
        path: '403',
        component: AccessDeniedComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class SampleRoutingModule { }

import { AuthGard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { TrainingComponent } from './training/training.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'training', component: TrainingComponent, canActivate: [AuthGard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGard],
})
export class AppRoutingModule {}

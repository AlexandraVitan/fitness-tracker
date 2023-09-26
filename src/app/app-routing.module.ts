import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import { SingupComponent } from './auth/singup/singup.component';
import { LoginComponent } from './auth/login/login.component';
import { TrainingComponent } from './training/training.component';
import { CurrentTrainingComponent } from './training/current-training/current-training.component';
import { NewTrainingComponent } from './training/new-training/new-training.component';
import { PastTrainingsComponent } from './training/past-trainings/past-trainings.component';


const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  {path: 'signup', component: SingupComponent},
  {path:'login', component: LoginComponent},
  {path:'training', component: TrainingComponent},
  {path:'current-training', component: CurrentTrainingComponent},
  {path: 'new-training', component: NewTrainingComponent},
  {path: 'past-trainings', component: PastTrainingsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TrainingService } from './../training.service';
//import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[] | null = null;
  exerciseSubscription: Subscription | null = null;

  ongoingTraining = false;
  selectedExercise: string | null = null;
  Subscription: Subscription | null = null;

  constructor(
    private router: Router,
    private trainingService: TrainingService
  ) {}

  ngOnDestroy(): void {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      exercises => (this.exercises = exercises)
    );
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    if (this.selectedExercise) {
      this.trainingService.startExercise(this.selectedExercise);
    }
  }
}

import {
  AngularFirestore,
  AngularFirestoreModule,
} from '@angular/fire/compat/firestore';

import { TrainingService } from './../training.service';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  //@Output() trainingStart = new EventEmitter<void>();
  exercises: Observable<any> | undefined;

  ongoingTraining = false;
  selectedExercise?: string;

  constructor(
    private router: Router,
    private trainingService: TrainingService,
    private db: AngularFirestore
  ) {}

  ngOnInit(): void {
    //this.exercises = 
    this.db.collection('availableExercises')
    .snapshotChanges()
    .subscribe(result => console.log(result));

    //this.exercises = this.trainingService.getAvailableExercises();
  }

  // onStartTraining() {
  //   this.trainingStart.emit();
  //   this.router.navigate(['/current-training']);
  // }
  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
    //this.router.navigate(['/current-training']);
  }
}

import { TrainingService } from './../training.service';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  //@Output() trainingStart = new EventEmitter<void>();
  exercises: Exercise[] = [];

  ongoingTraining = false;
  //constructor(private trainingService: TrainingService) {}
  selectedExercise?: string;

  constructor(
    private router: Router,
    private trainingService: TrainingService
  ) {}
  ngOnInit(): void {
    this.exercises = this.trainingService.getAvailableExercises();
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

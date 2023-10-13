import { TrainingService } from './../training.service';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  @Output() trainingStart = new EventEmitter<void>();
  exercises: Exercise[] = [];

  ongoingTraining = false;
  constructor(private trainingService: TrainingService) {}
  selectedExercise: string | undefined;

  //constructor(private router: Router, private trainingService TrainingService) {}
  ngOnInit(): void {
    this.exercises = this.trainingService.getAvailableExercises();
  }

  onStartTraining() {
    this.trainingStart.emit();
  }

  //   startTraining() {
  // You can use the selectedExercise value if needed to pass data to the Current Training component
  // For now, let's assume you just want to navigate to the Current Training component
  //     this.router.navigate(['/current-training']);
  // }
}

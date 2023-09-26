import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
 // @Output() trainingStart = new EventEmitter<void>();
 // ongoingTraining = false;
  //constructor() {}
  selectedExercise: string | undefined;

  constructor(private router: Router) {}
  ngOnInit(): void {}

  // onStartTraining() {
  //   this.trainingStart.emit();
  // }
  

  startTraining() {
    // You can use the selectedExercise value if needed to pass data to the Current Training component
    // For now, let's assume you just want to navigate to the Current Training component
    this.router.navigate(['/current-training']);
}
}
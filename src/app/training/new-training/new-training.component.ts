import { Component, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  @Output() trainingStart = new EventEmitter<void>();
  ongoingTraining = false;
  constructor() {}
  ngOnInit(): void {}

  onStartTraining() {
    this.trainingStart.emit();
  }
}

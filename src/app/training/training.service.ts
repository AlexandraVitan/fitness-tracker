import {
  AngularFirestore,
  AngularFirestoreModule,
} from '@angular/fire/compat/firestore';
import { Subject, map } from 'rxjs';
import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise | null>();
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise | null = null;
  private exercises: Exercise[] = [];
  exercisesChanged = new Subject<Exercise[]>();


  constructor(private db: AngularFirestore) {}

  fetchAvailableExercises() {
    this.db
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map((docArray: any[]) => {
          return docArray.map((doc) => {
            return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data().name,
              duration: doc.payload.doc.data().duration,
              calories: doc.payload.doc.data().calories,
            };
          });
        })
      )

      .subscribe((exercises: Exercise[]) => {
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
      });
  }

  // getAvailableExercises() {
  //   return this.availableExercises.slice();
  // }

  startExercise(selectedId: string) {
    const selectedExercise = this.availableExercises.find(
      (ex) => ex.id === selectedId
    );
    if (selectedExercise) {
      this.runningExercise = selectedExercise;
      this.exerciseChanged.next({ ...this.runningExercise });
    } else {
      // Handle the case where the selected exercise is not found.
      // You can throw an error, log a message, or take any appropriate action.
    }
  }

  completeExercise() {
    if (this.runningExercise) {
      this.exercises.push({
        ...this.runningExercise,
        date: new Date(),

        state: 'completed',
      });
      this.runningExercise = null;
      this.exerciseChanged.next(null);
    }
  }

  cancelExercise(progress: number) {
    if (this.runningExercise) {
      this.exercises.push({
        ...this.runningExercise,
        duration: this.runningExercise.duration * (progress / 100),
        calories: this.runningExercise.calories * (progress / 100),
        date: new Date(),
        state: 'cancelled',
      });
      this.runningExercise = null;
      this.exerciseChanged.next(null);
    }
  }

  getRunningExercise() {
    return this.runningExercise ? { ...this.runningExercise } : null;
  }

  getCompletedOrCancelledExercises() {
    return this.exercises.slice();
  }
}

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subject, map } from 'rxjs';
import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { UIService } from '../shared/ui.service';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise | null>();
  exercisesChanged = new Subject<Exercise[] | null>();
  //private exercises: Exercise[] = [];
  finishedExercisesChanged = new Subject<Exercise[]>();
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise | null = null;
  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore, private uiService: UIService) {}

  fetchAvailableExercises() {
    this.uiService.loadingStateChanged.next(true);
    this.fbSubs.push(
      this.db
        .collection('availableExercises')
        .snapshotChanges()
        .pipe(
          map((docArray: any[]) => {
            return docArray.map((doc) => {
              const data = doc.payload.doc.data() as Exercise;
              return {
                ...data,
                id: doc.payload.doc.id,
              };
            });
            //throw(new Error());
          })
        )
        .subscribe(
          (exercises: Exercise[]) => {
            this.uiService.loadingStateChanged.next(false);
            this.availableExercises = exercises;
            this.exercisesChanged.next([...this.availableExercises]);
          },
          (error) => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbar(
              'Fetching exercises failed, please check again later',
              null,
              3000
            );
            this.exercisesChanged.next(null);
          }
        )
    );
  }

  startExercise(selectedId: string) {
    //this.db.doc('availableExercises/' + selectedId).update({lastSelected: new Date()});
    const selectedExercise = this.availableExercises.find(
      (ex) => ex.id === selectedId
    );
    if (selectedExercise) {
      this.runningExercise = selectedExercise;
      this.exerciseChanged.next({ ...this.runningExercise });
    }
  }

  completeExercise() {
    if (this.runningExercise) {
      this.addDataToDatabase({
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
      this.addDataToDatabase({
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

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(
      this.db
        .collection('finishedExercises')
        .valueChanges()
        .pipe(map((exercises: unknown[]) => exercises as Exercise[])) // Cast to Exercise[]
        .subscribe((exercises: Exercise[]) => {
          this.finishedExercisesChanged.next(exercises);
        })
    );
  }

  cancelSubscriptions() {
    this.fbSubs.forEach((sub) => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}

import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';

export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  private availableExercises: Exercise[] = [
    {
      id: 'crunches',
      name: 'Crunches',
      duration: 30,
      calories: 8,
    },
    {
      id: 'touch-toes',
      name: 'Touch toes',
      duration: 180,
      calories: 15,
    },
    {
      id: 'side-lunges',
      name: 'Side Lunges',
      duration: 120,
      calories: 18,
    },
    {
      id: 'burpes',
      name: 'Burpees',
      duration: 60,
      calories: 8,
    },
  ];
  private runningExercise: Exercise | undefined;

  getAvailableExercises() {
    return this.availableExercises.slice();
  }

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
}

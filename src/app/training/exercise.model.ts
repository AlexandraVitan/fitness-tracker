export interface Exercise {
  id: string;
  name: string;
  duration: number;
  calories: number;
  date?: Date | null | undefined;
  state?: 'completed' | 'cancelled';
}

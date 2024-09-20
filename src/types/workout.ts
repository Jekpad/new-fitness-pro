import { Exercise } from "./exercise";

export type Workout = {
  _id: string;
  done: boolean;
  exercises: Exercise[];
  name: string;
  video: string;
};

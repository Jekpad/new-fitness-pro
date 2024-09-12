export type Course = {
  _id: string;
  color: string;
  description: string;
  difficulty: number;
  directions: string[];
  duration: number;
  fitting: string[];
  image: string;
  nameEN: string;
  nameRU: string;
  order: number;
  time: string;
  progress?: number;
  workouts: string[];
};

export type UserCourse = {
  _id: string;
  progress: number;
  workouts?: Record<
    string,
    {
      _id: string;
      done: boolean;
      exercises?: Record<string, number>;
    }
  >;
};

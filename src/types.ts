export type UserType = {
	id: string;
	email: string | null;
	token: string;
};

export type UserContextType = {
	user: UserType | null;
	login: ((arg: UserType) => void) | null;
	logout: VoidFunction | null;
};

export type CoursesContextType = {
	courses: CourseType[];
	setCourses: (arg: CourseType[]) => void;
};

export type UserCoursesContextType = {
	userCourses: UserCourseType[];
	setUserCourses: (arg: UserCourseType[]) => void;
};

export type CourseType = {
	_id: string;
	description: string;
	directions: string[];
	fitting: string[];
	nameEN: string;
	nameRU: string;
	order: number;
	workouts: string[];
	totalProgress: number;
};

export interface WorkoutType {
	name: string;
	_id: string;
	exercises: ExerciseType[];
	video: string;
}
export interface ExerciseType {
	name: string;
	progress: number;
	quantity: number;
}

export interface UserWorkoutType {
	_id: string;
	exercises: ExerciseType[];
}

export type UserCourseType = {
	_id: string;
	nameEN: string;
	nameRU: string;
	order: number;
	workouts: UserWorkoutType[];
	totalProgress: number;
};

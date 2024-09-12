import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/Routes";
import { getUserCourseInfo, getWorkoutById } from "@/utils/api";

import { Course, UserCourse } from "@/types/course";
import { Workout } from "@/types/workout";

import { DisplayModalsType } from "../DisplayModalsType";
import CheckCircle from "@/assets/CheckCircle.svg?react";
import CheckCircleDone from "@/assets/CheckCircleDone.svg?react";

interface Props {
  course: Course;
  setDisplayModal: (category: DisplayModalsType) => void;
}

const ModalWorkoutSelect = ({ course, setDisplayModal }: Props) => {
  const [workouts, setWorkouts] = useState<Workout[] | undefined>();
  const [userWorkouts, setUserWorkouts] = useState<UserCourse["workouts"] | undefined>();

  useEffect(() => {
    const getWorkouts = async () => {
      try {
        const workoutPromises = Object.values(course.workouts).map(async (value) => {
          return await getWorkoutById(value);
        });
        const workoutsArray: Workout[] = await Promise.all(workoutPromises);
        const userWorkouts = (await getUserCourseInfo(course._id)).workouts;

        setWorkouts(workoutsArray);
        setUserWorkouts(userWorkouts);
      } catch (error) {
        console.error(error);
      }
    };

    getWorkouts();
  }, [course]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50"
      onClick={() => setDisplayModal(null)}>
      <div className="flex h-[500px] w-[400px] flex-col justify-around rounded-3xl bg-white p-6 shadow-lg">
        <p className="text-center text-lg font-medium">Выберите тренировку</p>
        <div className="custom-scroll flex h-[300px] flex-col gap-[10px] overflow-y-scroll pr-5">
          {workouts?.map((workout, index) => (
            <>
              <Link
                to={ROUTES.workout.generateUrl({ courseid: course._id, workoutid: workout._id })}
                key={index}
                className="flex items-center gap-[10px] bg-opacity-25 py-[2px] hover:bg-color-inactive">
                {userWorkouts?.[workout._id]?.done ? <CheckCircleDone /> : <CheckCircle />}

                <p className="font-medium">{workout.name}</p>
              </Link>
              <hr className="mb-2 h-[2px] w-full bg-[#C4C4C4]"></hr>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModalWorkoutSelect;

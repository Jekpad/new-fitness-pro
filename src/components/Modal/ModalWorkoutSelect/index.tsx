import { useEffect, useState } from "react";
import { DisplayModalsType } from "../DisplayModalsType";
import { Workout } from "@/types/workout";
import { getWorkoutById } from "@/utils/api";
import { Course } from "@/types/course";
import { Link } from "react-router-dom";
import { ROUTES } from "@/Routes";

interface Props {
  course: Course;
  setDisplayModal: (category: DisplayModalsType) => void;
}

const ModalWorkoutSelect = ({ course, setDisplayModal }: Props) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    const getWorkouts = async () => {
      try {
        const workoutPromises = Object.values(course.workouts).map(async (value) => {
          return await getWorkoutById(value);
        });
        const workoutsArray: Workout[] = await Promise.all(workoutPromises);

        setWorkouts(workoutsArray);
      } catch (error) {
        console.error(error);
      }
    };

    getWorkouts();
  }, [course]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50"
      onClick={() => setDisplayModal(null)}>
      <div className="flex h-[500px] w-[400px] flex-col justify-around rounded-3xl bg-white p-6 shadow-lg">
        <p className="text-center text-lg font-medium">Выберите тренировку</p>
        <div className="h-[300px] overflow-auto">
          {workouts.map((workout, index) => (
            <Link to={ROUTES.workout.generateUrl({ id: workout._id })} key={index}>
              <div className="mb-2 flex items-center">
                <div className="ml-3">
                  <p className="font-medium">{workout.name}</p>
                </div>
              </div>
              <div className="mb-2 h-[1px] w-full bg-[#C4C4C4]"></div>
            </Link>
          ))}
        </div>
        {/* <button
          type="button"
          className="hover:bg-[#bcec30]-100 mb-2 me-2 w-full rounded-full border border-none bg-[#bcec30] px-5 py-2.5 text-[15px] font-thin text-black focus:outline-none focus:ring-4 focus:ring-gray-100">
          Начать
        </button> */}
      </div>
    </div>
  );
};

export default ModalWorkoutSelect;

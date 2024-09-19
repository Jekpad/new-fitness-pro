import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Course, UserCourse } from "@/types/course";
import * as WorkoutType from "@/types/workout";
import { getCourseById, getUserSubscriptions, getWorkoutById, setProgress } from "@/utils/api";

import ContentWrapper from "@/components/ContentWrapper";
import Header from "@/components/Header/Header";
import ModalProgress from "@/components/Modal/ModalProgress";
import ProgressBar from "@/components/ProgressBar";
import ButtonRegular from "@/components/UI/Buttons/ButtonRegular";
import { useUserContext } from "@/contexts/userContext";
import LoadingPlaceholder from "@/components/LoadingPlaceholder";
import { DisplayModalsType } from "@/components/Modal/DisplayModalsType";
import ModalProgressSuccess from "@/components/Modal/ModalProgressSuccess";

function Workout() {
  const { user } = useUserContext();
  const { courseid, workoutid } = useParams();

  // const [isPopUpDisplay, setIsPopUpDisplay] = useState<boolean>(false);
  const [displayModal, setDisplayModal] = useState<DisplayModalsType>(null);

  const [course, setCourse] = useState<Course | undefined>();
  const [workout, setWorkout] = useState<WorkoutType.Workout | undefined>();
  const [userCourse, setUserCourse] = useState<UserCourse | undefined>();
  const getData = async () => {
    if (!courseid || !workoutid || !user) return;
    try {
      const userCourses = await getUserSubscriptions(user.uid);
      if (!userCourses) return;

      const course = await getCourseById(courseid);
      const workout = await getWorkoutById(workoutid);
      console.log(workout);
      const userCourse = userCourses[courseid];

      setWorkout(workout);
      setCourse(course);
      setUserCourse(userCourse);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (!courseid || !workoutid || !user) return;
    getData();
  }, []);

  if (!workoutid || !courseid || !course || !workout || !userCourse) return <LoadingPlaceholder />;

  return (
    <ContentWrapper>
      <Header />
      <h1 className="mt-10 text-2xl font-medium md:mt-[60px] md:text-[60px] md:leading-[60px]">
        {course?.nameRU}
      </h1>
      <p className="mt-[10px] flex cursor-pointer flex-row flex-wrap gap-2 text-lg md:mt-6 md:text-[32px]">
        <u>{workout?.name}</u>
      </p>
      <iframe
        className="mt-6 aspect-video w-full rounded-[30px] md:mt-10"
        src={workout?.video}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen></iframe>
      <section className="mt-6 rounded-[30px] bg-color-component-background p-[30px] shadow-sm md:mt-10 md:p-10">
        <h2 className="text-[32px] leading-[32px]">Упражнения тренировки</h2>
        <div className="mt-5 grid gap-6 md:grid-cols-3 md:gap-[60px]">
          {workout.exercises &&
            Object.entries(workout.exercises).map(([key, exercise]) => {
              const exceciseQuantity = exercise.quantity || 1;
              const userQuantity = userCourse.workouts?.[workoutid]?.exercises?.[key] || 0;
              return (
                <ProgressBar
                  key={key}
                  text={exercise.name}
                  progress={(userQuantity / exceciseQuantity) * 100}
                />
              );
            })}
        </div>
        {workout.exercises && (
          <ButtonRegular
            className="mt-10 w-full md:w-auto md:text-xl"
            onClick={() => setDisplayModal("workoutprogress")}>
            {userCourse?.workouts?.[workoutid]
              ? "Обновить свой прогресс"
              : "Заполнить свой прогресс"}
          </ButtonRegular>
        )}
        {!workout.exercises && (
          <ButtonRegular
            className="mt-10 w-full md:w-auto md:text-xl"
            onClick={async () => {
              await setProgress(courseid, workoutid, true, []);
              // window.location.reload();
            }}>
            Отметить пройденным
          </ButtonRegular>
        )}
      </section>

      {displayModal === "workoutprogress" && workout.exercises && (
        <ModalProgress
          courseid={userCourse._id}
          workoutid={workout._id}
          setIsPopUpDisplay={setDisplayModal}
          exercises={workout.exercises}
          userExercises={userCourse.workouts?.[workoutid]?.exercises}
          getData={getData}
        />
      )}
      {displayModal === "workoutsuccess" && <ModalProgressSuccess />}
    </ContentWrapper>
  );
}

export default Workout;

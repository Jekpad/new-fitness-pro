// import { getWorkoutById } from "@/utils/api";
// import { useEffect } from "react";
import { Course } from "@/types/course";
import { unsubscribeFromCourse } from "@/utils/api";

interface CourseItemProps {
  uid: string;
  course: Course;
}

const CourseItem = ({ uid, course }: CourseItemProps) => {
  // console.log(course)
  // const getWorkoutsData = async () => {
  //   const workoutsData =  await Promise.all(
  //     course.workouts.map(async (workout) => {
  //       const course = await getWorkoutById(workout);
  //       return course
  //     })
  //   );
  //   console.log(workoutsData)
  // }

  // useEffect(() => {
  //   getWorkoutsData()
  // }, []);

  // const status = (progress: number) => {
  //   if (progress > 0 && progress < 100) {
  //     return "Продолжить";
  //   } else if (progress === 100) {
  //     return "Начать заново";
  //   } else {
  //     return "Начать тренировки";
  //   }
  // };

  const handleUnsubscribe = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await unsubscribeFromCourse(uid, course._id);
    } catch (error) {
      console.error("Ошибка при отписке от курса:", error);
    }
  };

  return (
    <>
      <div className="mb-2 rounded-3xl bg-white p-4 shadow-xl">
        <img alt="Картинка" src={course.image} width="330px" height="330px" />
        <div className="text-[24px]">{course.nameRu}</div>
        <div className="flex">
          <p className="mr-[6px] flex h-[38px] w-[90px] items-center justify-around rounded-2xl bg-[#f7f7f7] p-1 text-center">
            <img src="/time.svg" alt="Time Icon" />
            {course.duration} дней
          </p>
          <p className="flex h-[38px] w-[163px] items-center justify-around rounded-2xl bg-[#f7f7f7] p-1 text-center">
            <img src="/work.svg" alt="Work Icon" />
            {course.time}
          </p>
        </div>
        <p className="mt-[6px] w-[130px] rounded-2xl bg-[#f7f7f7] p-1 text-center">
          {course?.order} сложность
        </p>
        <div className="mt-[20px] text-[18px]">
          Прогресс
          {/* {course?.progress} */}%
        </div>
        <div className="mb-[40px] h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-100">
          <div
            className="h-1.5 rounded-full bg-[#00C1FF]"
            // style={{ width: `${course?.progress}%` }}
          ></div>
        </div>
        <button
          type="button"
          className="hover:bg-[#bcec30]-100 me-2 w-[100%] rounded-full border border-none bg-[#bcec30] px-5 py-2.5 text-[15px] font-thin text-black focus:outline-none focus:ring-4 focus:ring-gray-100">
          {/* {status()} */}
        </button>
        <button
          type="button"
          onClick={handleUnsubscribe}
          className="me-2 mt-4 w-[100%] rounded-full border border-none bg-red-600 px-5 py-2.5 text-[15px] font-thin text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-200">
          Удалить курс
        </button>
      </div>
    </>
  );
};

export default CourseItem;

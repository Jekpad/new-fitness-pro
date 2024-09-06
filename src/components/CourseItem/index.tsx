// import { getWorkoutById } from "@/utils/api";
// import { useEffect } from "react";

interface Course {
  _id: string,
  nameRU: string;
  length: number;
  time: string;
  order?: number | null;
  progress: number;
  image: string;
}

interface CourseItemProps {
  course: Course;
  onCourseUnsubscribe: (courseId: string) => void;
  userId: string;
}

const CourseItem = ({ course, onCourseUnsubscribe}: CourseItemProps) => {
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
      await onCourseUnsubscribe(course._id);
    } catch (error) {
      console.error("Ошибка при отписке от курса:", error);
    }
  };

  return (
    <>
      <div className="mb-2 p-4 bg-white  rounded-3xl shadow-xl">
        <img alt="Картинка" src={course.image} width="330px" height="330px" />
        <div className="text-[24px]">{course.nameRU}</div>
        <div className="flex">
          <p className="bg-[#f7f7f7] p-1 rounded-2xl w-[90px] text-center mr-[6px] flex items-center h-[38px] justify-around">
            <img src="/time.svg" alt="Time Icon" />
            {course?.length} дней
          </p>
          <p className="bg-[#f7f7f7] p-1 rounded-2xl w-[163px] text-center flex items-center h-[38px] justify-around">
            <img src="/work.svg" alt="Work Icon" />
            {course?.time}
          </p>
        </div>
        <p className="bg-[#f7f7f7] p-1 rounded-2xl w-[130px] text-center mt-[6px]">
          {course?.order} сложность
        </p>
        <div className="text-[18px] mt-[20px]">Прогресс {course?.progress}%</div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-100 mb-[40px]">
          <div
            className="bg-[#00C1FF] h-1.5 rounded-full"
            style={{ width: `${course?.progress}%` }}
          ></div>
        </div>
        <button
          type="button"
          className="text-[15px] text-black border bg-[#bcec30] border-none focus:outline-none hover:bg-[#bcec30]-100 focus:ring-4 focus:ring-gray-100 font-thin rounded-full px-5 py-2.5 me-2 w-[100%]"
        >
          {/* {status()} */}
        </button>
        <button
          type="button"
          onClick={handleUnsubscribe}
          className="text-[15px] text-white border bg-red-600 mt-4 border-none focus:outline-none hover:bg-red-700 focus:ring-4 focus:ring-red-200 font-thin rounded-full px-5 py-2.5 me-2 w-[100%]"
        >
          Удалить курс
        </button>
      </div>
    </>
  );
};

export default CourseItem;

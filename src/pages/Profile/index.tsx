import { useEffect, useState } from "react";
import CourseItem from "@/components/CourseItem";
import Header from "@/components/Header/Header";
import ModalSelect from "@/components/Modal/ModalSelect";
import ContentWrapper from "@/components/ContentWrapper";
import { getCourseById, getUserSubscriptions, getWorkoutById } from "@/utils/api";

interface Course {
  _id: string;
  nameRU: string;
  length: number;
  time: string;
  difficulty: string;
  progress: number;
  workouts: string[];
  image: string;
}

interface Workout {
  name: string;
  }


function Profile() {
  /* const courses = [
    {
      name: "Йога",
      length: 25,
      time: "20-50 мин/день",
      progress: 40,
      difficulty: "3",
    },
    {
      name: "Стретчинг",
      length: 25,
      time: "20-50 мин/день",
      progress: 0,
      difficulty: "3",
    },
    {
      name: "Зумба",
      length: 25,
      time: "20-50 мин/день",
      progress: 100,
      difficulty: "3",
    },
  ]; */

  const [courses, setCourses] = useState<Course[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedWorkouts, setSelectedWorkouts] = useState<Workout[]>([]);

  const userId = "tKtot8YAzFPLVgVYAoq16qfXNWs1"; // Получаем ID пользователя (замените на актуальный ID)

  // Функция для получения курсов пользователя из БД
  const fetchUserCourses = async () => {
    try {
      // Получаем список ID курсов пользователя
      const userCoursesIds: string[] = await getUserSubscriptions(userId);

      // Загружаем данные каждого курса по ID
      const coursesData: Course[] = await Promise.all(
        userCoursesIds.map(async (courseId) => {
          const course = await getCourseById(courseId);
          return course as Course;
        })
      );

      setCourses(coursesData); // Устанавливаем полученные курсы
      // setIsLoading(false);
    } catch (error) {
      console.error("Ошибка при получении курсов:", error);
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserCourses(); // Загружаем курсы пользователя при загрузке компонента
  }, []);


  const status = (progress: number) => {
    if (progress > 0 && progress < 100) {
      return "Продолжить";
    } else if (progress == 100) {
      return "Начать заново";
    } else {
      return "Начать тренировки";
    }
  };

  // Функция для получения тренировок по их ID и открытия модального окна
  const handleOpenModal = async (workoutsIds: string[]) => {
    try {
      const workoutsData = await Promise.all(
        workoutsIds.map(async (workoutId) => {
          return await getWorkoutById(workoutId);
        })
      );

      setSelectedWorkouts(workoutsData.filter(Boolean));
      setIsModalOpen(true);
    } catch (error) {
      console.error("Ошибка при получении тренировок:", error);
    }
  };

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <ContentWrapper>
      <Header />
      <div className="flex h-[100%] w-full flex-col items-center bg-[#fafafa]">
        <div className="mt-[50px] w-5/6">
          <p className="text-start text-[40px]">Профиль</p>
        </div>
        <div className="mt-4 flex w-5/6 rounded-2xl bg-white p-10 shadow-lg">
          <img src="" alt="Картинка" width="197px" height="100px" />
          <div>
            <div className="text-[32px]">Даша</div>
            <p className="text-[18px]">Логин: Даша</p>
            <p className="text-[18px]">Пароль: лалала</p>
            <button
              type="button"
              className="hover:bg-[#bcec30]-100 mb-2 me-2 rounded-full border border-none bg-[#bcec30] px-5 py-2.5 text-[15px] font-thin text-black focus:outline-none focus:ring-4 focus:ring-gray-100"
            >
              Изменить пароль
            </button>
            <button
              type="button"
              className="mb-2 me-2 rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-thin text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700"
            >
              Выйти
            </button>
          </div>
        </div>
        <div className="mt-8 w-5/6">
          <h2 className="mb-4 text-[32px]">Мои курсы</h2>
          <div className="flex flex-wrap justify-between">
            {courses.map((course) => (
              <div
                key={course._id}
                // onClick={handleOpenModal}
                onClick={() => handleOpenModal(course.workouts)}
                className="w-full p-2 sm:w-1/2 md:w-1/3 lg:w-1/3"
              >
                <CourseItem course={course} status={status(course.progress)} image={course.image}/>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ModalSelect isOpen={isModalOpen} onClose={handleCloseModal} workouts={selectedWorkouts}/>
    </ContentWrapper>
  );
}

export default Profile;

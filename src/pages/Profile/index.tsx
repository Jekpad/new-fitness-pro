import { useState } from "react";
import CourseItem from "@/components/CourseItem";
import Header from "@/components/Header/Header";
import ModalSelect from "@/components/Modal/ModalSelect";
import ContentWrapper from "@/components/ContentWrapper";

function Profile() {
  const courses = [
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
  ];
  const status = (progress: number) => {
    if (progress > 0 && progress < 100) {
      return "Продолжить";
    } else if (progress == 100) {
      return "Начать заново";
    } else {
      return "Начать тренировки";
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
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
            {courses.map((course, index) => (
              <div
                key={index}
                onClick={handleOpenModal}
                className="w-full p-2 sm:w-1/2 md:w-1/3 lg:w-1/3"
              >
                <CourseItem course={course} status={status(course.progress)} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <ModalSelect isOpen={isModalOpen} onClose={handleCloseModal} />
    </ContentWrapper>
  );
}

export default Profile;

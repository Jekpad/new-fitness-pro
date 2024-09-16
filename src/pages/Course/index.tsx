import { ROUTES } from "@/Routes";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCourseById, subscribeToCourse } from "@/utils/api";

import SolidStar from "@/assets/SolidStar.svg?react";

import ContentWrapper from "@/components/ContentWrapper";
import Header from "@/components/Header/Header";
import LoadingPlaceholder from "@/components/LoadingPlaceholder";
import { useUserContext } from "@/contexts/userContext";
import ModalSignIn from "@/components/Modal/ModalSignIn";
import ModalSignUp from "@/components/Modal/ModalSignUp";
import ButtonRegular from "@/components/UI/Buttons/ButtonRegular";
import { DisplayModalsType } from "@/components/Modal/DisplayModalsType";

interface CourseInt {
  nameRU: string;
  fitting: string[];
  directions: string[];
  image: string;
  color: string;
}

const Course = () => {
  const navigate = useNavigate();

  const params = useParams();
  const courseId = params.id;

  const [courseData, setCourseData] = useState<CourseInt | null>(null);
  const { user, setUser } = useUserContext();
  const [displayModal, setDisplayModal] = useState<DisplayModalsType>(null);

  const courseSubscribed = user?.courses
    ? Object.values(user.courses).find((id) => id === courseId)
    : undefined;

  const auth = () => {
    setDisplayModal("signin");
  };

  const subscribeCourse = async () => {
    if (!user?.uid || !courseId) return;

    await subscribeToCourse(user?.uid, courseId);
    setUser((prevUser) => {
      if (!prevUser) return prevUser;

      return {
        ...prevUser,
        courses: Array.isArray(prevUser.courses) ? [...prevUser.courses, courseId] : [courseId],
      };
    });
  };

  useEffect(() => {
    const returnToMain = () => {
      navigate(ROUTES.main.generateUrl({}));
    };

    if (!courseId) return returnToMain();

    const fetchCourseData = async () => {
      const data = await getCourseById(courseId);

      setCourseData(data);
    };

    fetchCourseData();
  }, [courseId, navigate]);

  if (!courseData) return <LoadingPlaceholder />;

  return (
    <ContentWrapper className="overflow-x-hidden">
      <Header />
      <div
        className={`mt-[60px] flex h-[389px] w-full flex-row justify-center rounded-[20px] px-0 pt-16 lg:h-[310px] lg:justify-between lg:px-10 lg:pt-0`}
        style={{ backgroundColor: courseData.color }}>
        <div className="mt-10 hidden lg:block">
          <p className="leading-16 text-6xl font-medium text-white">{courseData?.nameRU}</p>
        </div>
        <img
          className="h-[310px] w-auto rounded-lg"
          src={courseData.image}
          alt="course_picture"
          width="343"
          height="310"
        />
      </div>

      <section className="mt-10 lg:mt-[60px]">
        <p className="text-2xl font-semibold lg:text-[40px]">Подойдет для вас, если:</p>
        <div className="mt-6 grid grid-cols-1 gap-4 xl:mt-10 xl:grid-cols-3">
          {courseData.fitting &&
            Object.values(courseData.fitting).map((fit, index) => (
              <div
                key={index}
                className="flex w-full min-w-[326px] flex-row items-center justify-start rounded-[20px] bg-color-active p-5 md:p-[17px]">
                <div className="flex items-center pr-[25px] text-7xl text-[#BCEC30]">
                  {index + 1}
                </div>
                <p className="text-lg text-white lg:text-2xl">{fit}</p>
              </div>
            ))}
        </div>
      </section>

      <section className="mt-10 lg:mt-[60px]">
        <p className="text-2xl font-semibold lg:text-[40px]">Направления</p>
        <div className="mt-6 grid w-full grid-cols-1 gap-y-6 rounded-[20px] bg-color-acсent p-[30px] lg:grid-cols-2 xl:mt-10 xl:grid-cols-3">
          {courseData.directions &&
            Object.values(courseData.directions).map((direction, index) => (
              <div key={index} className="flex flex-nowrap">
                <SolidStar className="min-h-6 min-w-6" />
                <p className="ml-2 text-nowrap text-lg lg:text-2xl">{direction}</p>
              </div>
            ))}
        </div>
      </section>

      <div className="flex-column relative mt-[102px] flex w-full flex-wrap-reverse rounded-[20px] bg-color-component-background shadow-xl lg:flex-nowrap lg:justify-between 2xl:h-[486px]">
        <div className="z-[1] w-full rounded-[20px] bg-color-component-background p-[28px] lg:w-auto">
          <h1 className="lg:lette text-[32px] font-semibold lg:text-[60px] lg:leading-none">
            Начните путь <br />к новому телу
          </h1>
          <ul className="mt-[28px] w-[437px] list-disc pl-[28px] text-[18px] opacity-50 lg:text-[24px]">
            <li>проработка всех групп мышц</li>
            <li>тренировка суставов</li>
            <li>улучшение циркуляции крови</li>
            <li>упражнения заряжают бодростью</li>
            <li>помогают противостоять стрессам</li>
          </ul>

          {!user?.uid && (
            <ButtonRegular className="mt-[28px] w-full text-[18px]" onClick={auth}>
              Войдите, чтобы добавить курс
            </ButtonRegular>
          )}
          {user?.uid && !courseSubscribed && (
            <ButtonRegular className="mt-[28px] w-full text-[18px]" onClick={subscribeCourse}>
              Добавить курс
            </ButtonRegular>
          )}
          {user?.uid && courseSubscribed && (
            <ButtonRegular className="mt-[28px] w-full text-[18px]">
              Вы успешно подписались на курс
            </ButtonRegular>
          )}
        </div>

        <div className="absolute -right-24 -top-72 z-0 sm:right-2 lg:relative lg:right-0 lg:top-0">
          <div className="relative h-full min-h-[400px] w-svw sm:w-[340px] sm:overflow-hidden lg:w-[450px] 2xl:w-[660px]">
            <img
              className="absolute -bottom-32 right-20 rotate-[355deg] sm:bottom-0 sm:right-[10px]"
              alt=""
              src="/green_line.png"
              width="670"
              height="390"
            />
          </div>

          <img
            className="absolute bottom-5 right-2 w-[300px] sm:w-auto"
            alt=""
            src="/running_man.png"
            width="519"
            height="539"
          />

          <img
            className="right-[300px] top-8 hidden sm:absolute lg:top-16 xl:right-96 2xl:right-[380px] 2xl:top-5"
            alt=""
            src="/black_line.png"
            width="50"
            height="42"
          />
        </div>
      </div>

      {displayModal === "signin" && <ModalSignIn setDisplayModal={setDisplayModal} />}
      {displayModal === "signup" && <ModalSignUp setDisplayModal={setDisplayModal} />}
    </ContentWrapper>
  );
};
export default Course;

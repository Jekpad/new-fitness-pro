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
  const { user } = useUserContext();
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
    <ContentWrapper className="w-full overflow-y-hidden">
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
        <p className="text-2xl font-bold lg:text-4xl">Подойдет для вас, если:</p>
        <div className="mt-6 grid grid-cols-1 gap-4 lg:mt-10 xl:grid-cols-3">
          {courseData.fitting &&
            Object.values(courseData.fitting).map((fit, index) => (
              <div
                key={index}
                className="flex w-full min-w-[326px] flex-row items-center justify-start rounded-[20px] bg-black p-[17px]">
                <div className="flex items-center pr-[25px] text-7xl text-[#BCEC30]">
                  {index + 1}
                </div>
                <p className="text-lg text-white lg:text-2xl">{fit}</p>
              </div>
            ))}
        </div>
      </section>

      <section className="mt-10 lg:mt-[60px]">
        <h1 className="text-2xl font-bold lg:text-4xl">Направления</h1>
        <div className="mt-6 grid w-full grid-cols-1 gap-y-6 rounded-[20px] bg-color-acсent p-[30px] lg:grid-cols-2 xl:grid-cols-3">
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
        <div className="z-[1] w-full rounded-[20px] bg-color-component-background p-[28px]">
          <h1 className="text-[32px] font-semibold lg:text-5xl">
            Начните путь <br />к новому телу
          </h1>
          <ul className="mt-[28px] w-[437px] list-disc pl-[28px] text-[18px] opacity-50 lg:text-[24px]">
            <li>проработка всех групп мышц</li>
            <li>тренировка суставов</li>
            <li>улучшение циркуляции крови</li>
            <li>упражнения заряжают бодростью</li>
            <li>помогают противостоять стрессам</li>
          </ul>
          <div className="mt-[28px] cursor-pointer">
            {!user?.uid && (
              <ButtonRegular className="w-full lg:max-w-80" onClick={auth}>
                Войдите, чтобы добавить курс
              </ButtonRegular>
            )}
            {user?.uid && !courseSubscribed && (
              <ButtonRegular className="w-full lg:max-w-80" onClick={subscribeCourse}>
                Добавить курс
              </ButtonRegular>
            )}
            {user?.uid && courseSubscribed && (
              <ButtonRegular className="w-full lg:max-w-80">
                Вы успешно подписались на курс
              </ButtonRegular>
            )}
          </div>
        </div>

        <div className="absolute -right-24 -top-52 z-0 lg:relative lg:right-0 lg:top-0">
          <div className="relative h-full min-h-[400px] w-[400px] overflow-hidden 2xl:w-[660px]">
            <img
              className="absolute bottom-0 right-[10px] rotate-[355deg]"
              alt=""
              src="/green_line.png"
              width="670"
              height="390"
            />
          </div>

          <img
            className="absolute bottom-5 right-2"
            alt=""
            src="/running_man.png"
            width="519"
            height="539"
          />
          <img
            className="2:right-96 absolute right-[300px] top-8 lg:top-16 2xl:right-[380px] 2xl:top-5"
            alt=""
            src="/black_line.png"
            width="50"
            height="42"
          />
        </div>
      </div>

      {/*
      <div className="relative mt-[0] flex h-[486px] w-full flex-col rounded-[20px] bg-color-component-background shadow-xl lg:mt-[102px] lg:flex-row lg:justify-between">
        <div className="relative left-9 order-1 h-full w-[475px] lg:left-0 lg:order-2 lg:w-[660px]">
          <div className="relative h-full w-full overflow-hidden">
            <img
              className="absolute right-[10px] rotate-[355deg] pt-[100px]"
              alt="green line"
              src="/green_line.png"
              width="670"
              height="390"
            />
          </div>
          <img
            className="absolute bottom-[80px] right-[20px] lg:bottom-5 lg:right-2"
            alt="running man"
            src="/running_man.png"
            md-width="519"
            width="334"
            height="539"
          />
          <img
            className="absolute right-[340px] top-[0] lg:right-96 lg:top-5"
            alt="black line"
            src="/black_line.png"
            width="50"
            height="42"
          />
        </div>
        <div className="absolute left-10 top-10 z-10 order-2 lg:static lg:left-0 lg:top-0 lg:z-auto lg:order-1">
          <div className="h-[406px] w-[437px] bg-white px-[28px] py-[28px]">
            <h1 className="h-[120px] w-[398px] text-[32px] font-semibold lg:text-5xl">
              Начните путь <br />к новому телу
            </h1>
            <div>
              <ul className="h-[178px] w-[437px] list-disc pb-[28px] pl-[28px] text-lg leading-loose lg:text-2xl">
                <li>проработка всех групп мышц</li>
                <li>тренировка суставов</li>
                <li>улучшение циркуляции крови</li>
                <li>упражнения заряжают бодростью</li>
                <li>помогают противостоять стрессам</li>
              </ul>
            </div>
          </div>
          <div className="cursor-pointer pl-[24px] lg:pl-[28px]">
            {!user?.uid && (
              <ButtonRegular className="w-[283px] lg:w-full" onClick={auth}>
                Войдите, чтобы добавить курс
              </ButtonRegular>
            )}
            {user?.uid && !courseSubscribed && (
              <ButtonRegular className="w-[283px] lg:w-full" onClick={subscribeCourse}>
                Добавить курс
              </ButtonRegular>
            )}
            {user?.uid && courseSubscribed && (
              <ButtonRegular className="w-[283px] lg:w-full">
                Вы успешно подписались на курс
              </ButtonRegular>
            )}
          </div>
        </div>
      </div>
      */}

      {displayModal === "signin" && <ModalSignIn setDisplayModal={setDisplayModal} />}
      {displayModal === "signup" && <ModalSignUp setDisplayModal={setDisplayModal} />}
    </ContentWrapper>
  );
};
export default Course;

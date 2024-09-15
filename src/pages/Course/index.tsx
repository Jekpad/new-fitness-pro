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
    <ContentWrapper>
      <Header />
      <div
        className={`mt-[60px] flex h-[389px] w-full flex-row justify-between rounded-[20px] px-0 pt-16 md:h-[310px] md:px-10 md:pt-0`}
        style={{ backgroundColor: courseData.color }}>
        <div className="mt-10 hidden md:block">
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

      <section className="mt-10 md:mt-[60px]">
        <p className="text-2xl font-bold md:text-4xl">Подойдет для вас, если:</p>
        <div className="justify-space-between mt-6 flex flex-wrap items-center gap-4 md:mt-10 md:flex-row md:flex-nowrap">
          {courseData.fitting &&
            Object.values(courseData.fitting).map((fit, index) => (
              <div
                key={index}
                className="flex h-[141px] w-auto max-w-[431px] flex-row items-center overflow-y-hidden rounded-[20px] bg-black p-[17px]">
                <div className="flex items-center pr-[25px] text-7xl text-[#BCEC30]">
                  {index + 1}
                </div>
                <p className="text-lg text-white md:text-2xl">{fit}</p>
              </div>
            ))}
        </div>
      </section>

      <section className="mt-10 md:mt-[60px]">
        <h1 className="text-2xl font-bold md:text-4xl">Направления</h1>
        {/* <div className="mt-6 md:mt-10 grid w-full grid-cols-3 gap-x-[126px] gap-y-8 rounded-[20px] bg-color-acсent p-[30px]"> */}
        {/* <div className="mt-6 md:mt-10 flex md:flex-row md:flex-wrap flex-wrap w-full gap-x-[126px] gap-y-8 rounded-[20px] bg-color-acсent p-[30px]"> */}
        <div className="mt-6 flex w-full flex-wrap gap-x-[126px] gap-y-8 rounded-[20px] bg-color-acсent p-[30px] md:mt-10 md:grid md:grid-cols-3">
          {courseData.directions &&
            Object.values(courseData.directions).map((direction, index) => (
              <div key={index} className="flex flex-row items-center gap-2">
                <SolidStar className="h-6 w-6" />
                <p className="text-nowrap text-lg md:text-2xl">{direction}</p>
              </div>
            ))}
        </div>
      </section>

      {/* <div className="relative mt-[102px] flex h-[486px] w-full flex-column flex-wrap md:flex-row md:justify-between rounded-[20px] bg-color-component-background shadow-xl">
        <div>
          <div className="order-2 md:order-1">
          <div className="h-[406px] w-[437px] px-[28px] py-[28px]">
            <h1 className="h-[120px] w-[398px] text-[32px] font-semibold md:text-5xl">
              Начните путь <br />к новому телу
            </h1>
            <div className="">
              <ul className="h-[178px] w-[437px] list-disc pb-[28px] pl-[28px] text-lg md:text-2xl/loose">
                <li>проработка всех групп мышц</li>
                <li>тренировка суставов</li>
                <li>улучшение циркуляции крови</li>
                <li>упражнения заряжают бодростью</li>
                <li>помогают противостоять стрессам</li>
              </ul>
            </div>
          </div>
          <div className="cursor-pointer pl-[24px] md:pl-[28px]">
            {!user?.uid && (
              <ButtonRegular className="w-[283px] md:w-full" onClick={auth}>
                Войдите, чтобы добавить курс
              </ButtonRegular>
            )}
            {user?.uid && !courseSubscribed && (
              <ButtonRegular className="w-[283px] md:w-full" onClick={subscribeCourse}>
                Добавить курс
              </ButtonRegular>
            )}
            {user?.uid && courseSubscribed && (
              <ButtonRegular className="w-[283px] md:w-full">
                Вы успешно подписались на курс
              </ButtonRegular>
            )}
          </div>
        </div>
        </div>
        <div className="relative h-full w-[475px] md:w-[660px]">
          <div className="relative h-full w-[660px] overflow-hidden">
            <img
              className="absolute right-[10px] rotate-[355deg] pt-[100px]"
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
            className="absolute right-96 top-5"
            alt=""
            src="/black_line.png"
            width="50"
            height="42"
          />
        </div>
      </div> */}
      <div className="relative mt-[0] md:mt-[102px] flex h-[486px] w-full flex-col md:flex-row md:justify-between rounded-[20px] bg-color-component-background shadow-xl">
  {/* Блок с картинками */}
  <div className="order-1 md:order-2 relative h-full w-[475px] md:w-[660px] left-9 md:left-0">
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
      className="absolute md:bottom-5 md:right-2 bottom-[80px] right-[20px]"
      alt="running man"
      src="/running_man.png"
      md-width="519"
      width="334"
      height="539"
    />
    <img
      className="absolute right-[340px] md:right-96 md:top-5 top-[0]"
      alt="black line"
      src="/black_line.png"
      width="50"
      height="42"
    />
  </div>

  {/* Блок со списком */}
  <div className="order-2 md:order-1 absolute z-10 left-10 top-10 md:static md:z-auto md:left-0 md:top-0">
    <div className="h-[406px] w-[437px] px-[28px] py-[28px] bg-white">
      <h1 className="h-[120px] w-[398px] text-[32px] font-semibold md:text-5xl">
        Начните путь <br />к новому телу
      </h1>
      <div>
        <ul className="h-[178px] w-[437px] list-disc pb-[28px] pl-[28px] text-lg md:text-2xl leading-loose">
          <li>проработка всех групп мышц</li>
          <li>тренировка суставов</li>
          <li>улучшение циркуляции крови</li>
          <li>упражнения заряжают бодростью</li>
          <li>помогают противостоять стрессам</li>
        </ul>
      </div>
    </div>
    <div className="cursor-pointer pl-[24px] md:pl-[28px]">
      {!user?.uid && (
        <ButtonRegular className="w-[283px] md:w-full" onClick={auth}>
          Войдите, чтобы добавить курс
        </ButtonRegular>
      )}
      {user?.uid && !courseSubscribed && (
        <ButtonRegular className="w-[283px] md:w-full" onClick={subscribeCourse}>
          Добавить курс
        </ButtonRegular>
      )}
      {user?.uid && courseSubscribed && (
        <ButtonRegular className="w-[283px] md:w-full">
          Вы успешно подписались на курс
        </ButtonRegular>
      )}
    </div>
  </div>
</div>

      {displayModal === "signin" && <ModalSignIn setDisplayModal={setDisplayModal} />}
      {displayModal === "signup" && <ModalSignUp setDisplayModal={setDisplayModal} />}
    </ContentWrapper>
  );
};
export default Course;

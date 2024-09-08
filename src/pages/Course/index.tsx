import { ROUTES } from "@/Routes";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCourseById, subscribeToCourse } from "@/utils/api";

import Button from "@/components/Button";
import ContentWrapper from "@/components/ContentWrapper";
import Header from "@/components/Header/Header";
import LoadingPlaceholder from "@/components/LoadingPlaceholder";
import SolidStar from "@/assets/SolidStar.svg?react";
import { useUserContext } from "@/contexts/userContext";
import { getUserMockup } from "@/mockup/user";

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
  const courseSubscribed = user?.courses?.find((id) => id === courseId);

  console.log(user, courseSubscribed);

  const auth = () => {
    // !!!
    // Тестовая авторизация, потом переписать
    // !!!
    setUser(getUserMockup());
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
        className={`flex h-[310px] w-full flex-row justify-between rounded-[20px] px-10 mt-[60px]`}
        style={{ backgroundColor: courseData.color }}
      >
        <div className="mt-10">
          <p className="leading-16 text-6xl font-medium text-white">{courseData?.nameRU}</p>
        </div>
        <img
          className="rounded-lg"
          src={courseData.image}
          alt="course_picture"
          width="auto"
          height="310"
        />
      </div>

      <section className="mt-[60px]">
        <p className="text-4xl font-bold">Подойдет для вас, если:</p>
        <div className="flex flex-row gap-4 mt-10 items-center flex-wrap justify-center">
          {courseData?.fitting?.map((fit, index) => (
            <div
              key={index}
              className="h-[141px] w-auto rounded-[20px] bg-black p-[17px] flex flex-row items-center overflow-y-hidden max-w-[431px]"
            >
              <div className="flex items-center pr-[25px] text-7xl text-[#BCEC30]">{index + 1}</div>
              <p className="text-[24px] text-white">{fit}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-[60px]">
        <h1 className=" text-4xl font-bold">Направления</h1>
        <div className="mt-10 w-full gap-x-[126px] gap-y-8 rounded-[20px] p-[30px] bg-color-acсent grid grid-cols-3">
          {courseData?.directions?.map((direction, index) => (
            <div key={index} className="flex flex-row gap-2 items-center">
              <SolidStar />
              <p className="text-2xl text-nowrap">{direction}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-[102px] flex h-[486px] w-full flex-row rounded-[20px] bg-color-component-background shadow-xl relative justify-between">
        <div>
          <div className="h-[406px] w-[437px] py-[28px] pl-[28px]">
            <h1 className="h-[120px] w-[398px] text-5xl font-semibold">
              Начните путь <br />к новому телу
            </h1>
            <div className="">
              <ul className="h-[178px] w-[437px] list-disc pb-[28px] pl-[28px] text-2xl/loose">
                <li>проработка всех групп мышц</li>
                <li>тренировка суставов</li>
                <li>улучшение циркуляции крови</li>
                <li>упражнения заряжают бодростью</li>
                <li>помогают противостоять стрессам</li>
              </ul>
            </div>
          </div>
          <div className="cursor-pointer pl-[28px]">
            {!user?.uid && (
              <Button text="Войдите, чтобы добавить курс" className="w-full" onClick={auth} />
            )}
            {user?.uid && !courseSubscribed && (
              <Button text="Добавить курс" className="w-full" onClick={subscribeCourse} />
            )}
            {user?.uid && courseSubscribed && (
              <Button text="Вы успешно подписались на курс" className="w-full" />
            )}
          </div>
        </div>

        <div className="w-[660px] h-full relative">
          <div className="w-[660px] h-full overflow-hidden relative">
            <img
              className="rotate-[355deg] pt-[100px] absolute right-[10px]"
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
            className="absolute top-5 right-96"
            alt=""
            src="/black_line.png"
            width="50"
            height="42"
          />
        </div>
      </div>
    </ContentWrapper>
  );
};
export default Course;

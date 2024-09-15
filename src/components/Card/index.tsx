import { Course } from "@/types/course";
import React, { useState } from "react";
import { subscribeToCourse, unsubscribeFromCourse } from "@/utils/api";

import Difficult5 from "@/assets/difficult5.svg?react";
import Difficult4 from "@/assets/difficult4.svg?react";
import Difficult3 from "@/assets/difficult3.svg?react";
import Difficult2 from "@/assets/difficult2.svg?react";
import Difficult1 from "@/assets/difficult1.svg?react";
import CourseAdd from "@/assets/CourseAdd.svg?react";
import CourseRemove from "@/assets/CourseRemove.svg?react";
import { ROUTES } from "@/Routes";
import { useNavigate } from "react-router-dom";
import ButtonRegular from "../UI/Buttons/ButtonRegular";
import ProgressBar from "../ProgressBar";

type CardProps = {
  uid?: string;
  initialSubscribed: boolean;
  course: Course;
  handleDisplayWorkouts: (course: Course) => void;
};

export default function Card({ uid, initialSubscribed, course, handleDisplayWorkouts }: CardProps) {
  const navigate = useNavigate();

  const [subscribed, setSubscribed] = useState(initialSubscribed);

  const handleSubscribe = async (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();

    if (!uid) return alert("Авторизуйтесь");

    try {
      await subscribeToCourse(uid, course._id);
      setSubscribed(true);
      alert(`Вы успешно подписались на курс ${course.nameRU}`);
    } catch (error) {
      console.error("Ошибка при подписке на курс:", error);
      return alert("Произошла ошибка при подписке на курс");
    }
  };

  const handleUnsubscribe = async (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();

    if (!uid) return alert("Авторизуйтесь");
    try {
      await unsubscribeFromCourse(uid, course._id);
      setSubscribed(false);
      alert(`Вы успешно отписались с курса ${course.nameRU}`);
      if (uid) return window.location.reload();
    } catch (error) {
      return console.error("Ошибка при отписке от курса:", error);
    }
  };

  return (
    <div
      onClick={() => {
        if (subscribed) return;
        navigate(ROUTES.course.generateUrl({ id: course._id }));
      }}
      className="flex flex-col items-start justify-center gap-[24px] rounded-[30px] shadow-lg w-full max-w-[343px] md:w-[360px]">
      <div className="relative flex flex-row w-full">
        <img
          alt={course.nameRU}
          className="h-[325px] w-full rounded-[30px]"
          src={course.image}
        />
        {!subscribed && (
          <div className="group absolute right-5 top-5 z-10 cursor-pointer">
            <CourseAdd onClick={handleSubscribe} />
            <span className="absolute right-6 top-6 hidden whitespace-nowrap rounded border-[1px] border-black bg-color-background px-2 py-1 text-sm group-hover:inline-block md:left-6 md:right-auto">
              Добавить курс
            </span>
          </div>
        )}
        {subscribed && (
          <div className="group absolute right-5 top-5 z-10 cursor-pointer">
            <CourseRemove onClick={handleUnsubscribe} />
            <span className="absolute right-6 top-6 hidden whitespace-nowrap rounded border-[1px] border-black bg-color-background px-2 py-1 text-sm group-hover:inline-block md:left-6 md:right-auto">
              Удалить курс
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-[20px] px-[30px] pb-[15px] pt-[24px]">
        <h2 className="text-[32px] font-medium leading-[35px]">{course.nameRU}</h2>
        <div className="flex flex-wrap gap-[6px]">
          <div className="flex items-center justify-center gap-[6px] rounded-[50px] bg-[#F7F7F7] p-[10px]">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.5 2.625C7.5 1.79657 6.82843 1.125 6 1.125C5.17157 1.125 4.5 1.79657 4.5 2.625C2.84315 2.625 1.5 3.96815 1.5 5.625H16.5C16.5 3.96815 15.1569 2.625 13.5 2.625C13.5 1.79657 12.8284 1.125 12 1.125C11.1716 1.125 10.5 1.79657 10.5 2.625H7.5Z"
                fill="#202020"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.5 7.125H16.5V11.325C16.5 13.0052 16.5 13.8452 16.173 14.487C15.8854 15.0515 15.4265 15.5104 14.862 15.798C14.2202 16.125 13.3802 16.125 11.7 16.125H6.3C4.61984 16.125 3.77976 16.125 3.13803 15.798C2.57354 15.5104 2.1146 15.0515 1.82698 14.487C1.5 13.8452 1.5 13.0052 1.5 11.325V7.125ZM10.5 11.325C10.5 10.905 10.5 10.6949 10.5817 10.5345C10.6537 10.3934 10.7684 10.2787 10.9095 10.2067C11.0699 10.125 11.28 10.125 11.7 10.125H12.3C12.72 10.125 12.9301 10.125 13.0905 10.2067C13.2316 10.2787 13.3463 10.3934 13.4183 10.5345C13.5 10.6949 13.5 10.905 13.5 11.325V11.925C13.5 12.345 13.5 12.5551 13.4183 12.7155C13.3463 12.8566 13.2316 12.9713 13.0905 13.0433C12.9301 13.125 12.72 13.125 12.3 13.125H11.7C11.28 13.125 11.0699 13.125 10.9095 13.0433C10.7684 12.9713 10.6537 12.8566 10.5817 12.7155C10.5 12.5551 10.5 12.345 10.5 11.925V11.325Z"
                fill="#202020"
              />
            </svg>
            <div className="text-base font-normal leading-[18px]">{course.duration} дней</div>
          </div>
          <div className="flex items-center justify-center gap-[6px] rounded-[50px] bg-[#F7F7F7] p-[10px]">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5ZM8.25 4.5V9C8.25 9.41421 8.58579 9.75 9 9.75H12.75V8.25H9.75V4.5H8.25Z"
                fill="#202020"
              />
            </svg>
            <div className="text-base font-normal leading-[18px]">{course.time} мин/день</div>
          </div>
          <div className="flex items-center justify-center gap-[6px] rounded-[50px] bg-[#F7F7F7] p-[10px]">
            {course.difficulty == 5 && <Difficult5 />}
            {course.difficulty == 4 && <Difficult4 />}
            {course.difficulty == 3 && <Difficult3 />}
            {course.difficulty == 2 && <Difficult2 />}
            {course.difficulty == 1 && <Difficult1 />}
            Сложность {course.difficulty}
          </div>
        </div>
        {subscribed && course.progress !== undefined && (
          <>
            <ProgressBar text="Прогресс" progress={course.progress} />
            <ButtonRegular onClick={() => handleDisplayWorkouts(course)}>
              {course.progress == 0 && "Начать тренировки"}
              {course.progress > 0 && course.progress < 100 && "Продолжить"}
              {course.progress == 100 && "Начать заново"}
            </ButtonRegular>
          </>
        )}
      </div>
    </div>
  );
}

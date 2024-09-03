import ContentWrapper from "@/components/ContentWrapper";
import Header from "@/components/Header/Header";
import ModalProgress from "@/components/Modal/ModalProgress";
import ProgressBar from "@/components/ProgressBar";
import { useState } from "react";

function Workout() {
  const [isPopUpDisplay, setIsPopUpDisplay] = useState<boolean>(false);

  const workoutName = "Йога";
  const breadcrumbs = ["Красота и здоровье", "Йога на каждый день", "2 день"];
  const exercisesText = "Упражнения тренировки 2";
  const exercises: string[][] = [
    ["Наклоны вперед ", "Наклоны назад", "Поднятие ног, согнутых в коленях"],
    ["Наклоны вперед ", "Наклоны назад ", "Поднятие ног, согнутых в коленях"],
    ["Наклоны вперед ", "Наклоны назад ", "Поднятие ног, согнутых в коленях"],
  ];

  const showPopUp = () => {
    setIsPopUpDisplay(true);
  };

  return (
    <ContentWrapper>
      <Header />
      <h1 className="mt-10 text-2xl font-medium md:mt-[60px] md:text-[60px] md:leading-[60px]">
        {workoutName}
      </h1>
      <ul className="mt-[10px] flex flex-row flex-wrap gap-2 md:mt-6">
        {breadcrumbs.map((breadcrumb, i) => (
          <li
            key={i}
            className="cursor-pointer text-lg underline after:cursor-default after:ps-2 after:no-underline after:content-['/'] last:after:content-[] md:text-[32px]"
          >
            {breadcrumb}
          </li>
        ))}
      </ul>
      <iframe
        className="mt-6 aspect-video w-full rounded-[30px] md:mt-10"
        src="https://rutube.ru/play/embed/b257aa9771b72bb2e14e1a3e15be4137/"
        frameBorder="0"
        allow="clipboard-write; autoplay"
      ></iframe>

      <section className="mt-6 rounded-[30px] bg-color-component-background p-[30px] shadow-sm md:mt-10 md:p-10">
        <h2 className="text-[32px] leading-[32px]">{exercisesText}</h2>
        <div className="mt-5 grid gap-6 md:grid-cols-3 md:gap-[60px]">
          {exercises.map((exercisesBlock, index) => (
            <div key={index} className="flex flex-col gap-5">
              {exercisesBlock.map((exercise, i) => (
                <ProgressBar key={i} text={exercise} progress={Math.round(Math.random() * 100)} />
              ))}
            </div>
          ))}
        </div>
        <button
          className="mt-10 w-full rounded-[46px] bg-color-acсent px-6 py-4 text-lg font-normal hover:bg-color-acent-hover md:w-auto md:text-xl"
          onClick={showPopUp}
        >
          Заполнить свой прогресс
        </button>
      </section>

      {isPopUpDisplay && (
        <ModalProgress setIsPopUpDisplay={setIsPopUpDisplay} exercises={exercises} />
      )}
    </ContentWrapper>
  );
}

export default Workout;

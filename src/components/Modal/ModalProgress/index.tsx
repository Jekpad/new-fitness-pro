import { Dispatch, SetStateAction } from "react";
import Input from "../../Input";

type Props = {
  setIsPopUpDisplay: Dispatch<SetStateAction<boolean>>;
  exercises?: string[][];
};

const ModalProgress = ({ setIsPopUpDisplay, exercises }: Props) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-20 md:inset-0">
      <div className="relative box-content max-h-[516px] max-w-[346px] rounded-[30px] bg-color-component-background p-10 shadow-lg">
        <h3 className="w-full text-[32px] leading-[32px]">Мой прогресс</h3>
        <div className="custom-scroll mt-12 flex max-h-[346px] flex-col gap-5 overflow-y-auto pr-7">
          {exercises?.map((exercise) => {
            return exercise.map((item, index) => {
              return (
                <div key={index}>
                  <p className="mb-[10px] text-[18px] leading-[110%]">
                    Сколько раз вы сделали {item}?
                  </p>
                  <Input />
                </div>
              );
            });
          })}
        </div>
        <button
          className="mt-[34px] w-full rounded-[46px] bg-color-acсent px-6 py-4 text-xl font-normal hover:bg-color-acent-hover"
          onClick={() => {
            setIsPopUpDisplay(false);
          }}
        >
          Сохранить
        </button>
      </div>
    </div>
  );
};

export default ModalProgress;

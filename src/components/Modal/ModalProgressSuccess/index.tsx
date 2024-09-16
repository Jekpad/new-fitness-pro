import { Dispatch, SetStateAction } from "react";
import { DisplayModalsType } from "../DisplayModalsType";
import CheckCircleDone from "@/assets/CheckCircleDone.svg?react";

type Props = {
  setIsPopUpDisplay?: Dispatch<SetStateAction<DisplayModalsType>>;
};

const ModalProgressSuccess = ({ setIsPopUpDisplay }: Props) => {
  return (
    <div
      onMouseDown={() => setIsPopUpDisplay && setIsPopUpDisplay(null)}
      className="fixed bottom-0 left-0 right-0 top-0 z-50 flex max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-20 md:inset-0">
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="relative box-content flex max-h-[516px] max-w-[346px] flex-col items-center gap-[34px] rounded-[30px] bg-color-component-background p-10 align-middle shadow-lg">
        <h3 className="w-full text-center text-[40px] leading-[40px]">Ваш прогресс засчитан!</h3>
        <CheckCircleDone className="h-16 w-16" />
      </div>
    </div>
  );
};

export default ModalProgressSuccess;

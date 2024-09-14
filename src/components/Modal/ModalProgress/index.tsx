import { Dispatch, SetStateAction } from "react";
import { Exercise } from "@/types/exercise";
import InputRegular from "@/components/UI/Inputs/InputRegular";
import { useForm } from "react-hook-form";
import { setProgress } from "@/utils/api";

type Props = {
  courseid: string;
  workoutid: string;
  setIsPopUpDisplay: Dispatch<SetStateAction<boolean>>;
  exercises: Exercise[];
  userExercises?: Record<string, number>;
};

type FormValues = Record<string, string>;

const ModalProgress = ({
  courseid,
  workoutid,
  exercises,
  userExercises,
  setIsPopUpDisplay,
}: Props) => {
  const { register, handleSubmit } = useForm<FormValues>();

  const handleSaveProgress = async (data: FormValues) => {
    try {
      let workoutDone = true;

      const saveData = Object.entries(exercises).map(([key, exercise]) => {
        const result = parseInt(data[key] || "0");
        workoutDone = exercise.quantity > result ? false : workoutDone;
        return result;
      });

      await setProgress(courseid, workoutid, workoutDone, saveData);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      onMouseDown={() => setIsPopUpDisplay(false)}
      className="fixed bottom-0 left-0 right-0 top-0 z-50 flex max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-20 md:inset-0">
      <form
        onMouseDown={(e) => e.stopPropagation()}
        onSubmit={handleSubmit(handleSaveProgress)}
        className="relative box-content max-h-[516px] max-w-[346px] rounded-[30px] bg-color-component-background p-10 shadow-lg">
        <h3 className="w-full text-[32px] leading-[32px]">Мой прогресс</h3>
        <div className="custom-scroll mt-12 flex max-h-[346px] flex-col gap-5 overflow-y-auto pr-7">
          {exercises?.map((exercise, index) => {
            return (
              <div key={index}>
                <p className="mb-[10px] text-[18px] leading-[110%]">
                  Сколько раз вы сделали {exercise.name}?
                </p>
                <InputRegular
                  type="number"
                  step={1}
                  className="w-full"
                  register={register}
                  name={`${index}`}
                  defaultValue={userExercises?.[index] || ""}
                />
              </div>
            );
          })}
        </div>
        <button className="mt-[34px] w-full rounded-[46px] bg-color-acсent px-6 py-4 text-xl font-normal hover:bg-color-acent-hover">
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default ModalProgress;

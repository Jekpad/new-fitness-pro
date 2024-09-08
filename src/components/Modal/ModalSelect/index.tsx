import Button from "@/components/Button";

interface Workout {
  name: string;
}

interface ModalSelectProps {
  isOpen: boolean;
  onClose: () => void;
  workouts: Workout[];
}

const ModalSelect: React.FC<ModalSelectProps> = ({ isOpen, onClose, workouts }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div className="bg-white p-6 rounded-3xl shadow-lg h-[500px] w-[400px] flex flex-col justify-around">
        <p className="text-lg font-medium text-center">Выберите тренировку</p>
        <div className="overflow-auto h-[300px]">
          {workouts.map((workout, index) => (
            <div key={index}>
              <div className="flex items-center mb-2">
                <div className="ml-3">
                  <p className="font-medium">{workout.name}</p>
                </div>
              </div>
              <div className="w-full bg-[#C4C4C4] h-[1px] mb-2"></div>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="text-[15px] text-black border bg-[#bcec30] border-none focus:outline-none hover:bg-[#bcec30]-100 focus:ring-4 focus:ring-gray-100 font-thin rounded-full px-5 py-2.5 me-2 mb-2 w-full"
        >
          Начать
        </button>
      </div>
    </div>
  );
};

export default ModalSelect;

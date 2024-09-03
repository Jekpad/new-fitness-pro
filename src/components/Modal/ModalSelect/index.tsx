import React from 'react';

interface Training {
  name: string;
  description: string;
  isChecked: boolean;
}

interface ModalSelectProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalSelect: React.FC<ModalSelectProps> = ({ isOpen, onClose }) => {
  const trainings: Training[] = [
    { name: 'Утреняя практика', description: 'Йога на каждый день / 1 день ', isChecked: true },
    { name: 'Красота и здоровье', description: 'Йога на каждый день / 2 день ', isChecked: true },
    { name: 'Асаны стоя', description: 'Йога на каждый день / 3 день ', isChecked: false },
    { name: 'Растягиваем мышцы бедра', description: 'Йога на каждый день / 4 день ', isChecked: false },
    { name: 'Гибкость спины', description: 'Йога на каждый день / 5 день ', isChecked: false },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-white p-6 rounded-3xl shadow-lg h-[500px] w-[400px] flex flex-col justify-around">
        <p className="text-lg font-medium text-center">Выберите тренировку</p>
        <div>
          {trainings.map((training, index) => (
            <div>
            <div key={index} className="flex items-center mb-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={training.isChecked}
                  readOnly
                  className="opacity-0 absolute"
                />
                <div
                  className={`w-5 h-5 rounded-full border-2 ${
                    training.isChecked ? 'bg-[#bcec30] border-[#bcec30] ' : 'border-black-900'
                  } flex items-center justify-center duration-300`}
                >
                  {training.isChecked && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </label>
              <div className="ml-3">
                <p className="font-medium">{training.name}</p>
                <p className="text-sm text-gray-500">{training.description}</p>
              </div>
            </div>
            <div className='w-[100%] bg-[#C4C4C4] h-[1px] mb-[5px]'></div>
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

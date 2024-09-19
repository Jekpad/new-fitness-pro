import ButtonRegular from "@/components/UI/Buttons/ButtonRegular";
import InputRegular from "@/components/UI/Inputs/InputRegular";
import { useState } from "react";
import { changePassword } from "@/utils/api";

interface ModalSelectProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalChangePassword: React.FC<ModalSelectProps> = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState<string>('');
  const [passwordRepeat, setPasswordRepeat] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("Пароль меньше 6 символов");
      return;
    }
    if (password !== passwordRepeat) {
      setError("Пароли не совпадают");
      return;
    }
    setError(null);  
    changePassword(password);
    onClose();
    setPassword('');
    setPasswordRepeat('');
  };

  return (
    <div
      className="fixed left-0 top-0 right-0 bottom-0 z-50 flex h-[100%] min-h-[100vh] w-[100%] flex-col items-center justify-center bg-black bg-opacity-20"
      onClick={onClose} data-testid="modal"
    >
      <div
        className="block w-[100%] max-w-[360px] rounded-blockRadiusMax border-solid border-zinc-300 bg-color-component-background p-10 rounded-[30px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-12 flex items-center justify-center">
          <img src="/logo.png" alt="logo" />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center justify-center gap-[10px]">
            <div className="w-full">
              <InputRegular
                id="password"
                name="password"
                type="password" 
                autoComplete="new-password"
                placeholder="Пароль"
                value={password}
                onInput={(e) => setPassword(e.currentTarget.value)}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <InputRegular
                id="passwordRepeat"
                name="passwordRepeat"
                type="password" 
                autoComplete="new-password"
                placeholder="Повторите пароль"
                value={passwordRepeat}
                onInput={(e) => setPasswordRepeat(e.currentTarget.value)}
                className="w-full"
              />
            </div>
          </div>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          <ButtonRegular className="mt-8 w-full" type="submit">
            Изменить пароль
          </ButtonRegular>
        </form>
      </div>
    </div>
  );
}

export default ModalChangePassword;
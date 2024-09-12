import ButtonRegular from "@/components/UI/Buttons/ButtonRegular";
import InputRegular from "@/components/UI/Inputs/InputRegular";
import { useState } from "react";
import { changePassword } from "@/utils/api";

interface ModalSelectProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalChangePassword: React.FC<ModalSelectProps> = ({isOpen, onClose}) => {
  const [password, setPassword] = useState<string>('')
  if (!isOpen) return null;
  return (
    <div
      className="fixed left-0 top-0 right-0 bottom-0 z-50 flex h-[100%] min-h-[100vh] w-[100%] flex-col items-center justify-center bg-black bg-opacity-20"
      onClick={onClose}
    >
      <div
        className="block w-[100%] max-w-[360px] rounded-blockRadiusMax border-solid border-zinc-300 bg-color-component-background p-10 rounded-[30px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-12 flex items-center justify-center">
          <img src="/logo.png" alt="logo" />
        </div>

        <form>
          <div className="flex flex-col items-center justify-center gap-[10px]">
            <div className="w-full">
              <InputRegular
                id="password"
                name="password"
                autoComplete="new-password"
                placeholder="Пароль"
              />
            </div>
            <div className="w-full">
              <InputRegular
                id="passwordRepeat"
                name="passwordRepeat"
                autoComplete="new-password"
                placeholder="Повторите пароль"
                onInput={(e) => setPassword(e.currentTarget.value)}
              />
            </div>
          </div>
          <ButtonRegular className="mt-8 w-full" type="submit" onClick={() => changePassword(password)}>
            Изменить пароль
          </ButtonRegular>
        </form>
      </div>
    </div>
  );
}

export default ModalChangePassword;
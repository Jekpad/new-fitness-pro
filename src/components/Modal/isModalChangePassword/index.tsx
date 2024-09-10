import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import ButtonRegular from "@/components/UI/Buttons/ButtonRegular";
import InputRegular from "@/components/UI/Inputs/InputRegular";
import { useState } from "react";
import { changePassword } from "@/utils/api";

type FormValues = {
  name: string;
  email: string;
  password: string;
  passwordRepeat: string;
};

const schema = yup.object({
  name: yup.string().required("Необходимо указать имя"),
  email: yup.string().email("Неверный формат email").required("Необходимо указать email"),
  password: yup.string().min(6, "Пароль короче 6 символов").required("Необходимо указать пароль"),
  passwordRepeat: yup
    .string()
    .min(6, "Повтор пароля короче 6 символов")
    .required("Необходимо повторить пароль"),
});

export const SignUpForm = () => {
  return useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordRepeat: "",
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
  });
};

interface ModalSelectProps {
  isOpen: boolean;
  // onClose: () => void;
}

const ModalChangePassword: React.FC<ModalSelectProps> = ({isOpen}) => {
  const [password, setPassword] = useState<string>('')
  if (!isOpen) return null;
  return (
    <div
      className="fixed left-0 top-0 right-0 bottom-0 z-50 flex h-[100%] min-h-[100vh] w-[100%] flex-col items-center justify-center bg-black bg-opacity-20"
    >
      <div
        className="block w-[100%] max-w-[360px] rounded-blockRadiusMax border-solid border-zinc-300 bg-color-component-background p-10 rounded-[30px]"
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
                onInput={(e) => setPassword(e.target.value)}
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

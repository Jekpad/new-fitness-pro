import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUser } from "@/utils/api";
import { FirebaseError } from "firebase/app";

import ButtonRegular from "@/components/UI/Buttons/ButtonRegular";
import ButtonTransparent from "@/components/UI/Buttons/ButtonTransparent";
import InputRegular from "@/components/UI/Inputs/InputRegular";
import { DisplayModalsType } from "../DisplayModalsType";

type Props = {
  setDisplayModal: (category: DisplayModalsType) => void;
};

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

export default function ModalSignUp({ setDisplayModal }: Props) {
  const { register, handleSubmit, formState } = SignUpForm();
  const { errors } = formState;
  const [customError, setCustomError] = useState("");

  const signUp = async (data: FormValues) => {
    if (data.password !== data.passwordRepeat) return setCustomError("Пароли не совпадают");

    try {
      await createUser(data.name, data.email, data.password);
      setDisplayModal("signin");
    } catch (error) {
      if (error instanceof FirebaseError && error.code == "auth/email-already-in-use")
        return setCustomError("Данный email уже используется");
      setCustomError("Непредвиденная ошибка");
    }
  };

  return (
    <div
      className="fixed left-0 top-0 right-0 bottom-0 z-50 flex h-[100%] min-h-[100vh] w-[100%] flex-col items-center justify-center bg-black bg-opacity-20"
      onClick={() => setDisplayModal(null)}
    >
      <div
        className="block w-[100%] max-w-[360px] rounded-blockRadiusMax border-solid border-zinc-300 bg-color-component-background p-10 rounded-[30px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-12 flex items-center justify-center">
          <img src="/logo.png" alt="logo" />
        </div>

        <form onSubmit={handleSubmit(signUp)}>
          <div className="flex flex-col items-center justify-center gap-[10px]">
            <div className="w-full">
              <InputRegular
                id="name"
                name="name"
                register={register}
                placeholder="Как к вам обращаться"
                className={
                  errors.name?.message
                    ? "w-full outline-none border-color-error"
                    : "w-full outline-none"
                }
              />
              <p className="text-center text-color-error">{errors.name?.message}</p>
            </div>
            <div className="w-full">
              <InputRegular
                register={register}
                id="email"
                name="email"
                autoComplete="email"
                placeholder="Email"
                className={
                  errors.email?.message
                    ? "w-full outline-none border-color-error"
                    : "w-full outline-none"
                }
              />
              <p className="text-center text-color-error">{errors.email?.message}</p>
            </div>
            <div className="w-full">
              <InputRegular
                register={register}
                id="password"
                name="password"
                autoComplete="new-password"
                placeholder="Пароль"
                className={
                  errors.password?.message
                    ? "w-full outline-none border-color-error"
                    : "w-full outline-none"
                }
              />
              <p className="text-center text-color-error">{errors.password?.message}</p>
            </div>
            <div className="w-full">
              <InputRegular
                register={register}
                id="passwordRepeat"
                name="passwordRepeat"
                autoComplete="new-password"
                className={
                  errors.passwordRepeat?.message
                    ? "w-full outline-none border-color-error"
                    : "w-full outline-none"
                }
                placeholder="Повторите пароль"
              />
              <p className="text-center text-color-error">{errors.passwordRepeat?.message}</p>
            </div>
          </div>
          <p className="text-center text-color-error">{customError}</p>
          <ButtonRegular className="mt-8 w-full" type="submit">
            Зарегистрироваться
          </ButtonRegular>
          <ButtonTransparent className="mt-2 w-full" onClick={() => setDisplayModal("signin")}>
            Войти
          </ButtonTransparent>
        </form>
      </div>
    </div>
  );
}

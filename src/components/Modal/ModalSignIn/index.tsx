import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getUser } from "@/utils/api";
import { useUserContext } from "@/contexts/userContext";
import { FirebaseError } from "firebase/app";

import ButtonRegular from "@/components/UI/Buttons/ButtonRegular";
import ButtonTransparent from "@/components/UI/Buttons/ButtonTransparent";
import InputRegular from "@/components/UI/Inputs/InputRegular";
import { DisplayModalsType } from "../DisplayModalsType";
import ModalRestore from "../ModalRestore";

type Props = {
  setDisplayModal: (category: DisplayModalsType) => void;
};

type FormValues = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup.string().email("Неверный формат email").required("Необходимо указать email"),
  password: yup.string().required("Необходимо указать пароль"),
});

export const SignUpForm = () => {
  return useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
  });
};

export default function ModalSignIn({ setDisplayModal }: Props) {
  const { register, handleSubmit, formState, getValues } = SignUpForm();
  const { errors } = formState;
  const { setUser } = useUserContext();

  const [restorePassword, setRestorePassword] = useState({ message: false, displayModal: false });

  function handleRecoverPassword() {
    setRestorePassword((previous) => ({ ...previous, displayModal: true }));
    setTimeout(() => setRestorePassword({ message: false, displayModal: false }), 5000);
  }

  const signIn = async (data: FormValues) => {
    try {
      const result = await getUser(data.email, data.password);
      setUser(result);
      window.location.reload();
    } catch (error) {
      if (error instanceof FirebaseError && error.code == "auth/invalid-credential")
        return setRestorePassword((previous) => ({ ...previous, message: true }));
    }
  };

  if (restorePassword.displayModal) return <ModalRestore email={getValues().email} />;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 top-0 z-50 flex h-[100%] min-h-[100vh] w-[100%] min-w-[375px] flex-col items-center justify-center bg-black bg-opacity-20"
      onMouseDown={() => setDisplayModal(null)}>
      <div
        className="rounded-blockRadiusMax block w-[100%] max-w-[360px] rounded-[30px] border-solid border-zinc-300 bg-color-component-background p-10"
        onMouseDown={(e) => e.stopPropagation()}>
        <div className="mb-12 flex items-center justify-center">
          <img src="/logo.png" alt="logo" />
        </div>
        <form onSubmit={handleSubmit(signIn)}>
          <div className="flex flex-col items-center justify-center gap-[10px]">
            <div className="w-full">
              <InputRegular
                register={register}
                name="email"
                type="email"
                autoComplete="username"
                placeholder="Email"
                className={
                  errors.email?.message
                    ? "w-full border-color-error outline-none"
                    : "w-full outline-none"
                }
              />
              <p className="text-center text-color-error">{errors.email?.message}</p>
            </div>
            <div className="w-full">
              <InputRegular
                register={register}
                name="password"
                type="password"
                placeholder="Пароль"
                autoComplete="current-password"
                className={
                  errors.password?.message
                    ? "w-full border-color-error outline-none"
                    : "w-full outline-none"
                }
              />
              <p className="text-center text-color-error">{errors.password?.message}</p>
            </div>
            {restorePassword.message && (
              <p className="text-error w-full text-center text-sm text-color-error">
                Пароль введен неверно, попробуйте еще раз.&nbsp;
                <button type="button" className="underline" onClick={handleRecoverPassword}>
                  Восстановить пароль?
                </button>
              </p>
            )}
          </div>
          <ButtonRegular type="submit" className="mt-8 w-full">
            Войти
          </ButtonRegular>
          <ButtonTransparent className="mt-2 w-full" onClick={() => setDisplayModal("signup")}>
            Зарегистрироваться
          </ButtonTransparent>
        </form>
      </div>
    </div>
  );
}

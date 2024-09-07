import { ChangeEvent, useState } from "react";

import { createUser } from "@/utils/api";

import ButtonRegular from "@/components/UI/Buttons/ButtonRegular";
import ButtonTransparent from "@/components/UI/Buttons/ButtonTransparent";
import InputRegular from "@/components/UI/Inputs/InputRegular";

type Props = {
  setDisplayModal: (category: "signin" | "signup" | null) => void;
};

type SignupType = {
  name: string;
  email: string;
  passwordFirst: string;
  passwordSecond: string;
};

export default function ModalSignUp({ setDisplayModal }: Props) {
  const [isNotCorrectEmail, setIsNotCorrectEmail] = useState<boolean>(false);

  const [isNotCorrectPassword, setIsNotCorrectPassword] = useState<boolean>(false);

  const [registrationData, setRegistrationData] = useState<SignupType>({
    name: "",
    email: "",
    passwordFirst: "",
    passwordSecond: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegistrationData({ ...registrationData, [name]: value });
  };

  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsNotCorrectEmail(false);
    setIsNotCorrectPassword(false);

    if (registrationData.passwordFirst !== registrationData.passwordSecond) {
      setIsNotCorrectPassword(true);
      return;
    }

    try {
      await createUser(
        registrationData.name,
        registrationData.email,
        registrationData.passwordFirst
      );
      setDisplayModal("signin");
    } catch (error) {
      console.error(error);
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
        <form method="">
          <div className="flex flex-col items-center justify-center gap-[10px]">
            <InputRegular
              type="text"
              name="name"
              className="w-full"
              placeholder="Как к вам возращаться"
              value={registrationData.name}
              onChange={handleInputChange}
            />
            <InputRegular
              type="email"
              name="email"
              autoComplete="email"
              className={
                isNotCorrectEmail
                  ? "w-full rounded-inputRadius border border-errorColor px-[18px] py-[12px] text-lg"
                  : "w-full rounded-inputRadius border px-[18px] py-[12px] text-lg"
              }
              placeholder="Email"
              value={registrationData.email}
              onChange={handleInputChange}
            />
            <InputRegular
              type="password"
              name="passwordFirst"
              autoComplete="new-password"
              className="w-full"
              placeholder="Пароль"
              value={registrationData.passwordFirst}
              onChange={handleInputChange}
            />
            <InputRegular
              type="password"
              name="passwordSecond"
              autoComplete="new-password"
              className="w-full"
              placeholder="Повторите пароль"
              value={registrationData.passwordSecond}
              onChange={handleInputChange}
            />
          </div>
          {isNotCorrectPassword && (
            <div className="text-error w-[220px] text-center text-sm text-errorColor">
              Пароли не совпадают...
            </div>
          )}
          {isNotCorrectEmail && (
            <div className="text-error w-[220px] text-center text-sm text-errorColor">
              Данная почта уже используется. Попробуйте войти.
            </div>
          )}
          <ButtonRegular className="mt-8 w-full" onClick={(e) => handleSignUp(e)}>
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

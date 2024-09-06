import { ChangeEvent, useState } from "react";

import { useUserData } from "../../../hooks/useUserData";
import { userSignup } from "../../../utils/userAuth_api";
import Button from "@/components/Button";

type Props = {
  setDisplayModal: (category: "signin" | "signup" | null) => void;
};

type SignupType = {
  email: string;
  passwordFirst: string;
  passwordSecond: string;
};

export default function ModalSignUp({ setDisplayModal }: Props) {
  const { login } = useUserData();

  const [isNotCorrectEmail, setIsNotCorrectEmail] = useState<boolean>(false);

  const [isNotCorrectPassword, setIsNotCorrectPassword] = useState<boolean>(false);

  const [registrationData, setRegistrationData] = useState<SignupType>({
    email: "",
    passwordFirst: "",
    passwordSecond: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegistrationData({ ...registrationData, [name]: value });
  };

  const handleSignUp = async () => {
    setIsNotCorrectPassword(false);
    if (registrationData.passwordFirst !== registrationData.passwordSecond) {
      setIsNotCorrectPassword(true);
      return;
    }
    setIsNotCorrectEmail(false);
    await userSignup(registrationData.email, registrationData.passwordFirst)
      .then((userData) => {
        login?.({
          id: userData.uid,
          email: userData.email,
          token: userData.refreshToken,
        });
        // setIsOpenedSignupForm(false);
      })
      .catch(() => {
        setIsNotCorrectEmail(true);
      });
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
        <form>
          <div className="flex flex-col items-center justify-center">
            <div className=" ">
              <input
                className={
                  isNotCorrectEmail
                    ? "rounded-small border-gray-extra bg-white-base text-black-base placeholder-gray-extra mb-2.5 h-[52px] w-[280px] appearance-none rounded-inputRadius border border-errorColor px-[18px] py-[12px] text-lg"
                    : "rounded-small border-gray-extra bg-white-base text-black-base placeholder-gray-extra mb-2.5 h-[52px] w-[280px] appearance-none rounded-inputRadius border px-[18px] py-[12px] text-lg"
                }
                name="email"
                type="email"
                placeholder="Email"
                value={registrationData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="">
              <input
                className="border-error rounded-small border-gray-extra bg-white-base text-black-base placeholder-gray-extra mb-2.5 h-[52px] w-[280px] appearance-none rounded-inputRadius border px-[18px] py-[12px] text-lg"
                name="passwordFirst"
                type="password"
                placeholder="Пароль"
                value={registrationData.passwordFirst}
                onChange={handleInputChange}
              />
            </div>
            <div className="">
              <input
                className="border-error rounded-small border-gray-extra bg-white-base text-black-base placeholder-gray-extra h-[52px] w-[280px] appearance-none rounded-inputRadius border px-[18px] py-[12px] text-lg"
                name="passwordSecond"
                type="password"
                placeholder="Повторите пароль"
                value={registrationData.passwordSecond}
                onChange={handleInputChange}
              />
            </div>
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
          <Button text="Зарегистрироваться" className="mt-8 w-full" />
          <button
            className="disabled:bg-gray-light disabled:text-gray-dark disabled:border-gray-dark mt-3 h-[52px] w-[280px] rounded-buttonRadius border border-zinc-900 text-[18px] font-normal leading-[19.8px] transition-colors duration-300 hover:bg-bgColor active:bg-blackout"
            onClick={() => setDisplayModal("signin")}
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}

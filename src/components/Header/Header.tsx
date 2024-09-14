import { useState } from "react";

import ModalSignIn from "../Modal/ModalSignIn";
import ModalSignUp from "../Modal/ModalSignUp";
import { useUserContext } from "@/contexts/userContext";
import ButtonRegular from "../UI/Buttons/ButtonRegular";
import { DisplayModalsType } from "../Modal/DisplayModalsType";
import ArrowDown from "@/assets/ArrowDown.svg?react";
import ModalUserInfo from "../Modal/ModalUserInfo";
import { Link } from "react-router-dom";
import { ROUTES } from "@/Routes";

export default function Header() {
  const { user } = useUserContext();
  const [displayModal, setDisplayModal] = useState<DisplayModalsType>(null);

  return (
    <header className="flex flex-row items-center">
      <div>
        <Link to={ROUTES.main.generateUrl({})}>
          <img className="" src="/logo.png" alt="course_picture" width="220" height="35" />
        </Link>
        <p className="hidden md:block mt-[15px] text-wrap text-lg text-[#7d7d7d]">
          Онлайн-тренировки для занятий дома
        </p>
      </div>

      {!user?.uid && (
       <ButtonRegular
       className="ml-auto w-[83px] h-[36px] rounded-[46px] px-[16px] py-[8px] 
                  md:w-auto md:h-auto md:rounded-full md:px-[26px] md:py-4 flex items-center justify-center"
       onClick={() => setDisplayModal("signin")}
     >
       Войти
     </ButtonRegular>
     
     
      )}
      {user?.uid && (
        <button
          className="ml-auto flex gap-2 items-center relative"
          onClick={() =>
            displayModal !== "userinfo" ? setDisplayModal("userinfo") : setDisplayModal(null)
          }
        >
          <img src="/Profile.png" alt="Фото профиля" />
          <p className="hidden md:block">{user.name}</p>
          <ArrowDown width={8} height={8} />
          {displayModal === "userinfo" && (
            <ModalUserInfo setDisplayModal={setDisplayModal} className="absolute top-14 right-0" />
          )}
        </button>
      )}

      {displayModal === "signin" && <ModalSignIn setDisplayModal={setDisplayModal} />}
      {displayModal === "signup" && <ModalSignUp setDisplayModal={setDisplayModal} />}
    </header>
  );
}

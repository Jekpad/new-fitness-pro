import { useState } from "react";

import ModalSignIn from "../Modal/ModalSignIn";
import ModalSignUp from "../Modal/ModalSignUp";
import { useUserContext } from "@/contexts/userContext";
import ButtonRegular from "../UI/Buttons/ButtonRegular";
import { DisplayModalsType } from "../Modal/DisplayModalsType";

export default function Header() {
  const { user, setUser } = useUserContext();
  const [displayModal, setDisplayModal] = useState<DisplayModalsType>(null);

  return (
    <header className="flex flex-row items-center">
      <div>
        <img className="" src="/logo.png" alt="course_picture" width="220" height="35" />
        <p className="mt-[15px] text-wrap text-lg text-[#7d7d7d]">
          Онлайн-тренировки для занятий дома
        </p>
      </div>

      {!user?.uid && (
        <ButtonRegular className="ml-auto" onClick={() => setDisplayModal("signin")}>
          Войти
        </ButtonRegular>
      )}
      {user?.uid && (
        <button className="ml-auto" onClick={() => setUser(null)}>
          Выйти
        </button>
      )}

      {displayModal === "signin" && <ModalSignIn setDisplayModal={setDisplayModal} />}
      {displayModal === "signup" && <ModalSignUp setDisplayModal={setDisplayModal} />}
    </header>
  );
}

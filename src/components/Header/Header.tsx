import { useState } from "react";
import ModalSignIn from "../Modal/ModalSignIn";
import ModalSignUp from "../Modal/ModalSignUp";
import { useUserContext } from "@/contexts/userContext";
import Button from "../Button";

export default function Header() {
  const { user, setUser } = useUserContext();
  const [displayModal, setDisplayModal] = useState<"signin" | "signup" | null>(null);

  return (
    <header className="flex flex-row items-center">
      <div>
        <img className="" src="/logo.png" alt="course_picture" width="220" height="35" />
        <p className="mt-[15px] text-wrap text-lg text-[#7d7d7d]">
          Онлайн-тренировки для занятий дома
        </p>
      </div>

      {!user?.uid && (
        <Button text="Войти" className="ml-auto" onClick={() => setDisplayModal("signin")} />
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

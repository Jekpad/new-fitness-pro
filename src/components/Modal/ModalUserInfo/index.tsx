import ButtonRegular from "@/components/UI/Buttons/ButtonRegular";
import ButtonTransparent from "@/components/UI/Buttons/ButtonTransparent";
import { ROUTES } from "@/Routes";
import { Link } from "react-router-dom";
import { DisplayModalsType } from "../DisplayModalsType";
import { auth } from "@/firebase";
import { useUserContext } from "@/contexts/userContext";

type Props = {
  className?: string;
  setDisplayModal: (category: DisplayModalsType) => void;
};

const ModalUserInfo = ({ className, setDisplayModal }: Props) => {
  const { user, setUser } = useUserContext();

  return (
    <div
      className={`bg-color-component-background shadow-md rounded-[30px] p-[30px] w-[266px] flex flex-col gap-[10px] ${className}`}
    >
      <p className="text-lg leading-5">{user?.name}</p>
      <p className="text-lg leading-5 text-[#999]">{user?.email}</p>
      <Link className="mt-[22px]" to={ROUTES.profile.generateUrl({})}>
        <ButtonRegular className=" w-full">Мой профиль</ButtonRegular>
      </Link>
      <ButtonTransparent
        className="w-full"
        onClick={() => {
          setUser(null);
          auth.signOut();
          setDisplayModal(null);
        }}
      >
        Выйти
      </ButtonTransparent>
    </div>
  );
};

export default ModalUserInfo;

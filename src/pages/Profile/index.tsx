import { useEffect, useState } from "react";
import Header from "@/components/Header/Header";
import ContentWrapper from "@/components/ContentWrapper";
import { useUserContext } from "@/contexts/userContext";
import ButtonRegular from "@/components/UI/Buttons/ButtonRegular";
import ButtonTransparent from "@/components/UI/Buttons/ButtonTransparent";
import { auth } from "@/firebase";
import { Course } from "@/types/course";
import { getCourseById, getUserSubscriptions } from "@/utils/api";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/Routes";
import Card from "@/components/Card";
import ModalChangePassword from "@/components/Modal/isModalChangePassword";

const Profile = () => {
  const navigate = useNavigate();

  const { user, setUser } = useUserContext();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isModalChangePasswordOpen, setModalChangePasswod] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserCourses = async () => {
      if (!user?.uid) return;

      try {
        const userCoursesIds: string[] = await getUserSubscriptions(user?.uid);
        const coursesData: Course[] = await Promise.all(
          Object.values(userCoursesIds).map(async (courseId) => {
            const course = await getCourseById(courseId);
            return course as Course;
          }),
        );
        let filteredCoursesData = coursesData.filter((element) => element !== undefined);
        filteredCoursesData = filteredCoursesData.map((course) => {
          return { ...course, progress: Math.round(Math.random() * 100) };
        });
        setCourses(filteredCoursesData);
        console.log(filteredCoursesData)
      } catch (error) {
        console.error("Ошибка при получении курсов:", error);
      }
    };

    fetchUserCourses();
  }, [user]);
  const handleCloseModal = () => {
    setModalChangePasswod(false)
  }
  useEffect(() => {
    const returnToMain = () => {
      navigate(ROUTES.main.generateUrl({}));
    };

    if (!user?.uid) return returnToMain();


  }, [user, navigate]);
  // if (!user?.uid) return navigate(ROUTES.main.generateUrl({}));

  return (
    <ContentWrapper>
      <Header />
      <div className="flex w-full flex-col">
        <div className="mt-[50px]">
          <h2 className="text-start text-[40px] font-semibold" data-testid="test">Профиль</h2>
        </div>
        <div className="mt-4 flex gap-[33px] rounded-2xl bg-color-component-background p-10 shadow-lg">
          <img src="/ProfilePicture.png" alt="Картинка" width={197} height={197} />
          <div className="flex flex-col gap-[30px]">
            <p className="text-[32px]">{user?.name}</p>
            <div>
              <p className="text-[18px]">Логин: {user?.email}</p>
              <p className="text-[18px]">Пароль: ******</p>
            </div>
            <div className="mt-auto">
              <ButtonRegular className="min-w-[192px]" onClick={() => setModalChangePasswod(true)} data-testid="modalChangeButton">Изменить пароль</ButtonRegular>
              <ButtonTransparent
                className="ml-[10px] min-w-[192px]"
                onClick={() => {
                  setUser(null);
                  auth.signOut();
                }}>
                Выйти
              </ButtonTransparent>
            </div>
          </div>
        </div>
        <div className="mt-[60px]">
          <h2 className="text-[40px] font-semibold">Мои курсы</h2>
          <div className="mt-[50px] flex flex-wrap justify-start gap-[40px]">
            {courses.map((course, index) => (
              <Card key={index} course={course} initialSubscribed={true} uid={user?.uid} />
            ))}
          </div>
        </div>
      </div>
      <ModalChangePassword  isOpen={isModalChangePasswordOpen} onClose={handleCloseModal}/>
    </ContentWrapper>
  );
}

export default Profile;

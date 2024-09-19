import { auth } from "@/firebase";
import { useEffect, useState } from "react";
import Header from "@/components/Header/Header";
import ContentWrapper from "@/components/ContentWrapper";
import { useUserContext } from "@/contexts/userContext";
import ButtonRegular from "@/components/UI/Buttons/ButtonRegular";
import ButtonTransparent from "@/components/UI/Buttons/ButtonTransparent";
import { useNavigate } from "react-router-dom";
import Card from "@/components/Card";
import { DisplayModalsType } from "@/components/Modal/DisplayModalsType";
import ModalWorkoutSelect from "@/components/Modal/ModalWorkoutSelect";
import ModalChangePassword from "@/components/Modal/ChangePassword";
import { ROUTES } from "@/Routes";
import { getCourseById, getUserSubscriptions } from "@/utils/api";
import { Course } from "@/types/course";

const Profile = () => {
  const navigate = useNavigate();

  const { user, setUser } = useUserContext();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isModalChangePasswordOpen, setModalChangePasswod] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [displayModal, setDisplayModal] = useState<DisplayModalsType>(null);

  const handleDisplayWorkouts = async (course: Course) => {
    setSelectedCourse(course);
    setDisplayModal("workout");
  };

  useEffect(() => {
    const fetchUserCourses = async () => {
      if (!user?.uid) return;

      try {
        const userCourses = await getUserSubscriptions(user?.uid);

        if (!userCourses) return;

        let coursesData = await Promise.all(
          Object.keys(userCourses).map(async (courseId) => {
            return await getCourseById(courseId);
          }),
        );

        coursesData = Object.values(coursesData).map((course) => {
          const courseProgress =
            Object.values(userCourses).find((userCourse) => userCourse._id === course._id)
              ?.progress || 0;

          const courseWorkouts = Object.keys(course.workouts).length;

          return { ...course, progress: (courseProgress / courseWorkouts) * 100 };
        });
        setCourses(coursesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserCourses();
  }, [user]);

  const handleCloseModal = () => {
    setModalChangePasswod(false);
  };

  if (!user?.uid) {
    navigate(ROUTES.main.generateUrl({}));
    return <></>;
  }

  return (
    <ContentWrapper>
      <Header />
      <div className="flex w-full flex-col">
        <div className="mt-[50px]">
          <h2 className="text-start text-2xl font-semibold md:text-[40px]" data-testid="test">
            Профиль
          </h2>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-[33px] rounded-2xl bg-color-component-background p-10 shadow-lg md:justify-start">
          <img src="/ProfilePicture.png" className="h-[197px] w-[197px]" alt="Фото профиля" />
          <div className="flex flex-col gap-[30px]">
            <p className="text-2xl md:text-[32px]">{user?.name}</p>
            <div>
              <p className="text-base md:text-[18px]">Логин: {user?.email}</p>
              <p className="text-base md:text-[18px]">Пароль: ******</p>
            </div>
            <div className="mt-auto flex flex-wrap gap-[10px]">
              <ButtonRegular
                className="w-full min-w-[192px] text-base md:w-auto md:text-lg"
                onClick={() => setModalChangePasswod(true)}
                data-testid="modalChangeButton">
                Изменить пароль
              </ButtonRegular>
              <ButtonTransparent
                className="w-full min-w-[192px] text-base md:w-auto md:text-lg"
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
          <h2 className="text-2xl font-semibold md:text-[40px]">Мои курсы</h2>
          <div className="mt-[50px] flex flex-wrap justify-center gap-[40px] lg:justify-start">
            {courses.map((course, index) => (
              <Card
                key={index}
                course={course}
                initialSubscribed={true}
                uid={user?.uid}
                handleDisplayWorkouts={handleDisplayWorkouts}
              />
            ))}
          </div>
        </div>
      </div>
      <ModalChangePassword isOpen={isModalChangePasswordOpen} onClose={handleCloseModal} />
      {displayModal === "workout" && selectedCourse && (
        <ModalWorkoutSelect course={selectedCourse} setDisplayModal={setDisplayModal} />
      )}
    </ContentWrapper>
  );
};

export default Profile;

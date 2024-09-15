import { useEffect, useState } from "react";
// import CourseItem from "@/components/CourseItem";
import Header from "@/components/Header/Header";
// import ModalSelect from "@/components/Modal/ModalSelect";
import ContentWrapper from "@/components/ContentWrapper";
// import {
//   getCourseById,
//   getUserSubscriptions,
//   getWorkoutById,
//   unsubscribeFromCourse,
// } from "@/utils/api";
import { useUserContext } from "@/contexts/userContext";
import ButtonRegular from "@/components/UI/Buttons/ButtonRegular";
import ButtonTransparent from "@/components/UI/Buttons/ButtonTransparent";
import { auth } from "@/firebase";
import { Course } from "@/types/course";
import { getCourseById, getUserSubscriptions } from "@/utils/api";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/Routes";
import Card from "@/components/Card";
import { DisplayModalsType } from "@/components/Modal/DisplayModalsType";
import ModalWorkoutSelect from "@/components/Modal/ModalWorkoutSelect";
import ModalChangePassword from "@/components/Modal/isModalChangePassword";

function Profile() {
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
  }, []);

  const handleCloseModal = () => {
    setModalChangePasswod(false);
  };

  if (!user?.uid) return navigate(ROUTES.main.generateUrl({}));
  return (
    <ContentWrapper>
      <Header />
      <div className="flex w-full flex-col">
        <div className="mt-[50px]">
          <h2 className="text-start text-[40px] font-semibold">Профиль</h2>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-[33px] rounded-2xl bg-color-component-background p-10 shadow-lg md:justify-start">
          <img src="/ProfilePicture.png" className="h-[197px] w-[197px]" alt="Фото профиля" />
          <div className="flex flex-col gap-[30px]">
            <p className="text-[32px]">{user?.name}</p>
            <div>
              <p className="text-[18px]">Логин: {user?.email}</p>
              <p className="text-[18px]">Пароль: ******</p>
            </div>
            <div className="mt-auto flex flex-wrap gap-[10px]">
              <ButtonRegular
                className="w-full min-w-[192px] md:w-auto"
                onClick={() => setModalChangePasswod(true)}>
                Изменить пароль
              </ButtonRegular>
              <ButtonTransparent
                className="w-full min-w-[192px] md:w-auto"
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
          <div className="mt-[50px] flex flex-wrap justify-center gap-[40px] lg:justify-start">
            {courses.map((course, index) => (
              <Card
                key={index}
                course={course}
                initialSubscribed={true}
                uid={user.uid}
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
}

export default Profile;

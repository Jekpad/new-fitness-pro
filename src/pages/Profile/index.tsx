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

function Profile() {
  const navigate = useNavigate();

  const { user, setUser } = useUserContext();
  const [courses, setCourses] = useState<Course[]>([]);
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
        const userCourses: Course[] = await getUserSubscriptions(user?.uid);

        let coursesData: Course[] = await Promise.all(
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

  if (!user?.uid) return navigate(ROUTES.main.generateUrl({}));
  return (
    <ContentWrapper>
      <Header />
      <div className="flex w-full flex-col">
        <div className="mt-[50px]">
          <h2 className="text-start text-[40px] font-semibold">Профиль</h2>
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
              <ButtonRegular className="min-w-[192px]">Изменить пароль</ButtonRegular>
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
      {displayModal === "workout" && selectedCourse && (
        <ModalWorkoutSelect course={selectedCourse} setDisplayModal={setDisplayModal} />
      )}
    </ContentWrapper>
  );
}

export default Profile;

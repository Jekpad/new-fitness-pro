import Card from "@/components/Card";
import ContentWrapper from "@/components/ContentWrapper";
import Header from "@/components/Header/Header";
import { useUserContext } from "@/contexts/userContext";
import { Course, UserCourse } from "@/types/course";
import { getCourses, getUserSubscriptions } from "@/utils/api";
import { useEffect, useState } from "react";

function Main() {
  const { user } = useUserContext();
  const [courses, setCourses] = useState<Course[]>([]);
  const [userCourses, setUserCourses] = useState<Record<string, UserCourse> | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      if (user?.uid) setUserCourses(await getUserSubscriptions(user?.uid));
      else setUserCourses(null);

      const coursesData = await getCourses();
      setCourses(coursesData);
    };

    fetchCourses();
  }, [user]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <ContentWrapper>
      <Header />
      <div className="mt-[25px] flex flex-col items-center justify-center md:mt-[60px]">
        <div className="flex flex-col items-start justify-center gap-[10px] md:flex-row">
          <h1 className="text-left text-[32px] font-medium leading-[35px] md:mb-[50px] md:text-left md:text-6xl md:leading-[60px]">
            Начните заниматься спортом и улучшите качество жизни
          </h1>
          <div className="quote hidden gap-[10px] rounded-[5px] bg-[#BCEC30] px-[20px] py-[16px] text-[32px] font-normal leading-[35px] md:min-w-[288px] lg:flex">
            Измени своё тело за полгода!
          </div>
        </div>
        <div className="mt-[50px] flex w-full flex-wrap justify-center gap-[24px] lg:justify-start lg:gap-[40px]">
          {courses.map((course) => {
            const subscribed = !!userCourses?.[course._id];
            return (
              <Card
                key={course._id}
                course={course}
                uid={user?.uid}
                initialSubscribed={subscribed}
                onChangeSubscribe={async () => {
                  if (user?.uid) setUserCourses(await getUserSubscriptions(user?.uid));
                }}
              />
            );
          })}
        </div>
        <div
          className="ml-auto mt-[20px] cursor-pointer rounded-[46px] bg-[#BCEC30] px-[26px] py-[16px] md:mx-auto md:mt-[40px]"
          onClick={scrollToTop}>
          Наверх ↑
        </div>
      </div>
    </ContentWrapper>
  );
}

export default Main;

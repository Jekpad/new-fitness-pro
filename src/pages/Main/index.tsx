import Card from "@/components/Card";
import ContentWrapper from "@/components/ContentWrapper";
import Header from "@/components/Header/Header";
import { useUserContext } from "@/contexts/userContext";
import { Course } from "@/types/course";
import { getCourses } from "@/utils/api";
import { useEffect, useState } from "react";

function Main() {
  const { user } = useUserContext();
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const coursesData = await getCourses();
      setCourses(coursesData);
    };

    fetchCourses();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <ContentWrapper>
      <Header />
      <div className="mt-[25px] flex flex-col items-center justify-center md:mt-[60px]">
        <div className="flex flex-col items-start justify-center gap-[10px] md:flex-row">
          <h1 className="text-left text-3xl font-medium leading-[35px] md:text-left md:text-6xl md:leading-[60px]">
            Начните заниматься спортом и улучшите качество жизни
          </h1>
          <div className="hidden gap-[10px] bg-[#BCEC30] px-[16px] py-[20px] text-[32px] font-normal leading-[35px] rounded-[5px] md:flex">
            Измени своё тело за полгода!
          </div>
        </div>
        <div className="mt-[50px] flex w-full flex-wrap justify-start gap-[40px]">
          {courses.map((course) => (
            <Card key={course._id} course={course} uid={user?.uid} initialSubscribed={false} />
          ))}
        </div>
        <div 
          className="ml-auto mt-[20px] cursor-pointer rounded-[46px] bg-[#BCEC30] px-[26px] py-[16px] md:mt-[40px] md:mx-auto"
          onClick={scrollToTop}
        >
          Наверх ↑
        </div>
      </div>
    </ContentWrapper>
  );
}

export default Main;

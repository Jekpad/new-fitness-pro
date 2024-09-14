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

  return (
    <ContentWrapper>
      <Header />
      <div className="mt-[60px] flex flex-col items-start justify-center w-full">
        <div className="w-full flex flex-col items-start justify-start gap-[10px]">
          <h1 className="text-3xl md:text-6xl font-medium leading-[40px] md:leading-[60px] text-left">
            Начните заниматься спортом и улучшите качество жизни
          </h1>
        </div>
        <div className="mt-[30px] md:mt-[50px] flex flex-wrap justify-start gap-[20px] w-full">
          {courses.map((course) => (
            <Card key={course._id} course={course} uid={user?.uid} initialSubscribed={false} />
          ))}
        </div>
        <div className="mt-[20px] md:mt-[40px] rounded-[46px] bg-[#BCEC30] px-[26px] py-[16px] cursor-pointer ml-auto">
          Наверх ↑
        </div>
      </div>
    </ContentWrapper>
  );
}

export default Main;

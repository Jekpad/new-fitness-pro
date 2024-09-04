import Card from "@/components/Card";
import ContentWrapper from "@/components/ContentWrapper";
import Header from "@/components/Header/Header";
import { getCourses } from "@/utils/api";
import { useEffect, useState } from "react";
const env = import.meta.env;


interface Course {
  _id: string;
  nameRU: string;
  imageUrl: string;
}

function Main() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const coursesData = await getCourses();
      setCourses(coursesData);
    };

    fetchCourses();
  }, []);

  console.log(env);

  return (
    <ContentWrapper>
      <Header />
      <div className="mt-[60px] flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-[10px]">
          <h1 className="text-6xl font-medium leading-[60px]">
            Начните заниматься спортом и улучшите качество жизни
          </h1>
          <div className="flex gap-[10px] bg-[#BCEC30] px-[16px] py-[20px] text-[32px] font-normal leading-[35px]">
            Измени своё тело за полгода!
          </div>
        </div>
        <div className="mt-[50px] flex flex-wrap justify-start gap-[40px]">
         {courses.map((course) => (
            <Card key={course._id} id={course._id} nameRU={course.nameRU} imageUrl={course.imageUrl} />
          ))}
        </div>
        <div className="rounded-[46px] bg-[#BCEC30] px-[26px] py-[16px]">Наверх ↑</div>
      </div>
    </ContentWrapper>
  );
}

export default Main;

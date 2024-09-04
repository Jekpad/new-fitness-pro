import ContentWrapper from "@/components/ContentWrapper";
import Header from "@/components/Header/Header";
import { getCourseById } from "@/utils/api";
import { useEffect, useState } from "react";


interface CourseInt {
  nameRU: string;
  fitting: string[];
  directions: string[];
}

function Course() {
  const [courseData, setCourseData] = useState<CourseInt | null>(null);
  const courseId = "kfpq8e"; // Здесь указываем ID курса, например, для "Йога"

  useEffect(() => {
    const fetchCourseData = async () => {
      const data = await getCourseById(courseId);
      setCourseData(data);
    };

    fetchCourseData();
  }, [courseId]);

  if (!courseData) {
    return <p>Загрузка...</p>; // Показываем, пока данные загружаются
  }

  return (
    <ContentWrapper>
      <Header />
      <div className="my-[60px]">
        <div className="">
          <div className="flex h-[310px] w-[1160px] flex-row justify-between rounded-[20px] bg-[#ffc700]">
            <div className="ml-10 mt-10">
              <p className="leading-16 text-6xl font-medium text-white">{courseData?.nameRU}</p>
            </div>
            <img
              className="rounded-lg"
              src="/yoga.png"
              alt="course_picture"
              width="1023"
              height="310"
            />
          </div>
          <div className="gap-x-[3.75rem] pt-[60px]">
            <p className="pb-[40px] text-4xl font-bold">Подойдет для вас, если:</p>
            <div className="flex flex-row gap-4">
            {courseData?.fitting?.map((fit, index) => (
                <div key={index} className="h-[141px] w-[368px] rounded-[20px] bg-black p-[17px] text-white">
                  <div className="flex flex-row">
                    <div className="flex items-center pr-[25px] text-7xl text-[#BCEC30]">
                      {index + 1}
                    </div>
                    <p className="text-[24px]">{fit}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="">
              <h1 className="mb-[40px] pt-[60px] text-4xl font-bold">Направления</h1>
              <div className="flex h-[146px] w-[1160px] flex-row rounded-[20px] bg-[#BCEC30]">
                <div className="">
                {courseData?.directions?.map((direction, index) => (
                    <div key={index} className="flex flex-row pb-[30px] pl-[30px] pt-[34px]">
                      <div className="h-[26px] w-[26px] pr-[5px]">
                        <svg
                          className=""
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.46373 1.36751C9.6202 0.704433 9.69843 0.372896 9.82424 0.298229C9.93259 0.233924 10.0674 0.233924 10.1758 0.298229C10.3016 0.372896 10.3798 0.704434 10.5363 1.36751L11.2997 4.60302C11.5837 5.80636 11.7257 6.40803 12.0343 6.89596C12.3071 7.32744 12.6726 7.69285 13.104 7.96574C13.592 8.27432 14.1936 8.4163 15.397 8.70025L18.6325 9.46373C19.2956 9.6202 19.6271 9.69843 19.7018 9.82424C19.7661 9.93259 19.7661 10.0674 19.7018 10.1758C19.6271 10.3016 19.2956 10.3798 18.6325 10.5363L15.397 11.2997C14.1936 11.5837 13.592 11.7257 13.104 12.0343C12.6726 12.3071 12.3071 12.6726 12.0343 13.104C11.7257 13.592 11.5837 14.1936 11.2997 15.397L10.5363 18.6325C10.3798 19.2956 10.3016 19.6271 10.1758 19.7018C10.0674 19.7661 9.93259 19.7661 9.82424 19.7018C9.69843 19.6271 9.6202 19.2956 9.46373 18.6325L8.70025 15.397C8.4163 14.1936 8.27432 13.592 7.96574 13.104C7.69285 12.6726 7.32744 12.3071 6.89596 12.0343C6.40803 11.7257 5.80636 11.5837 4.60301 11.2997L1.36751 10.5363C0.704433 10.3798 0.372896 10.3016 0.298229 10.1758C0.233924 10.0674 0.233924 9.93259 0.298229 9.82424C0.372896 9.69843 0.704434 9.6202 1.36751 9.46373L4.60302 8.70025C5.80636 8.4163 6.40803 8.27432 6.89596 7.96574C7.32744 7.69285 7.69285 7.32744 7.96574 6.89596C8.27432 6.40803 8.4163 5.80636 8.70025 4.60301L9.46373 1.36751Z"
                            fill="black"
                          />
                        </svg>
                      </div>
                      <p className="text-2xl">{direction}</p>
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <div className="overflow-hidden">
                <div className="mt-[102px] flex h-[486px] w-[1160px] flex-row rounded-[20px] bg-[#FFFFFF] shadow-2xl">
                  <div>
                    <div className="h-[406px] w-[437px] p-[28px]">
                      <h1 className="h-[120px] w-[398px] text-5xl font-semibold">
                        Начните путь <br />к новому телу
                      </h1>
                      <div className="">
                        <ul className="h-[178px] w-[437px] list-disc pb-[28px] pl-[28px] text-2xl/loose">
                          <li>проработка всех групп мышц</li>
                          <li>тренировка суставов</li>
                          <li>улучшение циркуляции крови</li>
                          <li>упражнения заряжают бодростью</li>
                          <li>помогают противостоять стрессам</li>
                        </ul>
                      </div>
                    </div>
                    <div className="cursor-pointer pl-[28px]">
                      <div className="btn-green h-[52px] w-[437px] px-4 py-2 text-center text-2xl font-semibold">
                        Войдите, чтобы добавить курс
                      </div>
                    </div>
                  </div>
                  <div>
                    <img
                      className="relative rotate-[355deg] pt-[100px]"
                      alt=""
                      src="/green_line.png"
                      width="670"
                      height="390"
                    />

                    <img
                      className="relative left-[+150px] top-[-655px] z-[1] rotate-[357deg]"
                      alt=""
                      src="/running_man.png"
                      width="519"
                      height="539"
                    />
                    <img
                      className="relative left-[+250px] top-[-1110px] z-[2]"
                      alt=""
                      src="/black_line.png"
                      width="50"
                      height="42"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </ContentWrapper>
  );
}
export default Course;
export default function Header() {
  return (
    <>
      <div className="flex flex-row">
        <div>
          <img className="" src="/logo.png" alt="course_picture" width="220" height="35" />
          <p className="mt-[15px] text-wrap text-lg text-[#7d7d7d]">
            Онлайн-тренировки для занятий дома
          </p>
        </div>
        <div className="ml-auto">
          <div className="btn-green h-[52px] w-[103px] px-4 py-2 text-center text-2xl font-semibold">
            Войти
          </div>
        </div>
      </div>
    </>
  );
}

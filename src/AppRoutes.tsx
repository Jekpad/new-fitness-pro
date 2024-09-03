import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ROUTES } from "./Routes";
import Main from "./pages/Main";
import Course from "./pages/Course";
import Profile from "./pages/Profile";
import Workout from "./pages/Workout";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.main.path} element={<Main />} />
        <Route path={ROUTES.course.path} element={<Course />} />
        <Route path={ROUTES.profile.path} element={<Profile />} />
        <Route path={ROUTES.workout.path} element={<Workout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

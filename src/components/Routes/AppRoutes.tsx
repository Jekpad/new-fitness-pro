import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ROUTES } from "@/Routes";
import Main from "@/pages/Main";
import Course from "@/pages/Course";
import Profile from "@/pages/Profile";
import Workout from "@/pages/Workout";
import UserContextProvider from "@/contexts/UserContextProvider";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.main.path} element={<Main />} />
          <Route path={ROUTES.course.path} element={<Course />} />
          <Route element={<PrivateRoute />}>
            <Route path={ROUTES.profile.path} element={<Profile />} />
            <Route path={ROUTES.workout.path} element={<Workout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
};

export default AppRoutes;

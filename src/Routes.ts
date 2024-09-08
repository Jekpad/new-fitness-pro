export type RoutesType = Record<
  "main" | "course" | "profile" | "workout",
  { name: string; path: string; generateUrl: (params: Record<string, string | number>) => string }
>;

export const ROUTES: RoutesType = {
  main: {
    name: "Main",
    path: "/",
    generateUrl: () => "/",
  },
  course: {
    name: "Course",
    path: "/course/:id",
    generateUrl: ({ id }) => `/course/${id}`,
  },
  profile: {
    name: "Profile",
    path: "/profile",
    generateUrl: () => "/profile",
  },
  workout: {
    name: "Workout",
    path: "/workout/:id",
    generateUrl: ({ id }) => `/workout/${id}`,
  },
};

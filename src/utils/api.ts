import { getDatabase, ref, set, get, child, remove, update } from "firebase/database";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updatePassword,
} from "firebase/auth";
import { auth, database } from "../../firebase";
import { Course, UserCourse } from "@/types/course";
import { Workout } from "@/types/workout";
// Регистрация пользователя
export const createUser = async (name: string, email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const uid = userCredential.user.uid;

  return await set(ref(database, "users/" + uid), {
    uid: uid,
    name: name,
    email: email,
    courses: {
      workouts: {},
    },
  });
};

// Вход пользователя
export const getUser = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const uid = userCredential.user.uid;

  const dbRef = ref(getDatabase());
  const snapshot = await get(child(dbRef, `users/${uid}`));

  // if (!snapshot.exists()) {
  //   throw new Error("Пользователь не найден");
  // }

  return snapshot.val();
};

// Функция получения всех курсов
export const getCourses = async (): Promise<Course[]> => {
  try {
    const coursesRef = ref(database, "courses");
    const snapshot = await get(coursesRef);

    const courses = snapshot.val();
    const formattedCourses = Object.keys(courses).map((key) => ({
      id: key,
      ...courses[key],
    }));

    return formattedCourses;
  } catch (error) {
    console.error("Ошибка при получении курсов: ", error);
    return [];
  }
};

// Функция получения данных конкретного курса
export const getCourseById = async (courseId: string): Promise<Course> => {
  const courseRef = ref(database, `courses/${courseId}`);
  const snapshot = await get(courseRef);

  if (!snapshot.exists()) throw new Error("Курс не найден");

  return snapshot.val();
};

// Подписка на курс
export const subscribeToCourse = async (uid: string, courseId: string) => {
  try {
    const userCoursesRef = ref(database, `users/${uid}/courses/${courseId}`);

    const snapshot = await get(userCoursesRef);
    const subscribed = snapshot.val();

    // Добавление нового курса, если его нет в списке подписок
    if (!subscribed) {
      await set(userCoursesRef, { _id: courseId, progress: 0, workouts: {} });
    } else {
      console.log(`Пользователь уже подписан на курс ${courseId}.`);
    }
  } catch (error) {
    console.error("Ошибка при подписке на курс: ", error);
  }
};

// Отписка от курса
export const unsubscribeFromCourse = async (uid: string, courseId: string): Promise<void> => {
  const courseRef = ref(database, `users/${uid}/courses/${courseId}`);
  await remove(courseRef);
};

// Функция получения всех подписок пользователя
export const getUserSubscriptions = async (
  uid: string,
): Promise<Record<string, UserCourse> | null> => {
  try {
    const userSubscriptionsRef = ref(database, `users/${uid}/courses`);
    const snapshot = await get(userSubscriptionsRef);
    const subscribedCourses = snapshot.val();

    if (!subscribedCourses) {
      return null;
    }

    return subscribedCourses;
  } catch (error) {
    console.error("Ошибка при получении подписок на курсы пользователя: ", error);
    return null;
  }
};

//получение данных тренировки по id
export const getWorkoutById = async (workoutId: string): Promise<Workout> => {
  const workoutRef = ref(database, `workouts/${workoutId}`);
  const snapshot = await get(workoutRef);

  if (!snapshot.exists()) throw new Error("Workout not found");

  return snapshot.val();
};

export const setProgress = async (
  courseId: string,
  workoutId: string,
  done: boolean,
  exercisesProgress: number[],
) => {
  await set(
    ref(database, `users/${auth.currentUser?.uid}/courses/${courseId}/workouts/${workoutId}`),
    { done: done, exercises: exercisesProgress },
  );

  // Количество пройденных пользователем тренировок
  const userWorkoutsSnapshot = await get(
    ref(database, `users/${auth.currentUser?.uid}/courses/${courseId}/workouts/`),
  );
  const userWorkouts:Record<string, Workout> = userWorkoutsSnapshot.val();
  const userWorkoutsCount = Object.values(userWorkouts).reduce(
    (accumulator: number, current: Workout) => accumulator + +current?.done,
    0,
  );

  await update(ref(database, `users/${auth.currentUser?.uid}/courses/${courseId}/`), {
    progress: userWorkoutsCount,
  });
};

export const getUserCourseInfo = async (courseId: string): Promise<UserCourse> => {
  if (!auth.currentUser) throw new Error("Пользователь не авторизован");

  const workoutRef = ref(database, `users/${auth.currentUser.uid}/courses/${courseId}`);
  const snapshot = await get(workoutRef);

  if (!snapshot.exists()) throw new Error("Данные не найдены");

  return snapshot.val();
};

// Функция восстановления пароля
export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return {
      success: true,
      message: "Ссылка для восстановления пароля была отправлена на указанный email.",
    };
  } catch (error: unknown) {
    let errorMessage = "Произошла неизвестная ошибка.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("Ошибка при отправке ссылки на восстановление пароля: ", errorMessage);
    return {
      success: false,
      message: errorMessage, //для использования в компонентах
    };
  }
};

// Функция для изменения пароля текущего пользователя
export const changePassword = async (password: string) => {
  try {
    // Проверяем, что пользователь авторизован
    if (!auth.currentUser) {
      throw new Error("Нет авторизации");
    }
    // Обновляем пароль текущего пользователя
    await updatePassword(auth.currentUser, password);
  } catch (error) {
    // Обрабатываем ошибки и выбрасываем их с сообщением
    if (error instanceof Error) throw new Error(error.message);
  }
};

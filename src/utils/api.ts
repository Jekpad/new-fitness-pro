import { child, Database, get, ref, set } from "firebase/database";
import { database } from "../../firebase";

//Регистация пользователя
export const createUser = async (
  database: Database,
  email: string,
  uid: string
) => {
  await set(ref(database, "users/" + uid), {
    email: email,
    courses: {},
  });
};

//Вход
export const getUser = async (database: Database, uid: string) => {
  const dbRef = ref(database);
  const snapshot = await get(child(dbRef, `users/${uid}`));

  if (!snapshot.exists()) {
    throw new Error("No data available");
  }

  return snapshot.val();
};

// Функция получения всех курсов
export const getCourses = async () => {
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
export const getCourseById = async (courseId: string) => {
  try {
    const courseRef = ref(database, `courses/${courseId}`);
    const snapshot = await get(courseRef);

    if (!snapshot.exists()) {
      throw new Error("Курс не найден");
    }

    return snapshot.val();
  } catch (error) {
    console.error("Ошибка при получении курса: ", error);
    return null;
  }
};

// Подписка на курс
export const subscribeToCourse = async (uid: string, courseId: string) => {
  try {
    const userCoursesRef = ref(database, `users/${uid}/courses`);

    // Получение текущих подписок пользователя
    const snapshot = await get(userCoursesRef);
    const subscribedCourses = snapshot.val() || [];

    // Добавление нового курса, если его нет в списке подписок
    if (!subscribedCourses.includes(courseId)) {
      subscribedCourses.push(courseId);
      await set(userCoursesRef, subscribedCourses);
      console.log(`Пользователь ${uid} успешно подписался на курс ${courseId}.`);
    } else {
      console.log(`Пользователь уже подписан на курс ${courseId}.`);
    }
  } catch (error) {
    console.error("Ошибка при подписке на курс: ", error);
  }
};

// Отписка от курса
export const unsubscribeFromCourse = async (uid: string, courseId: string) => {
  try {
    const userCoursesRef = ref(database, `users/${uid}/courses`);

    const snapshot = await get(userCoursesRef);
    const subscribedCourses = snapshot.val() || [];

    // Удаление курса из списка подписок, если он там есть
    if (subscribedCourses.includes(courseId)) {
      const updatedCourses = subscribedCourses.filter(
        (id: string) => id !== courseId
      );
      await set(userCoursesRef, updatedCourses);
      console.log(`Пользователь ${uid} успешно отписался от курса ${courseId}.`);
    } else {
      console.log(`Пользователь не подписан на курс ${courseId}.`);
    }
  } catch (error) {
    console.error("Ошибка при отписке от курса: ", error);
  }
};

// Функция получения всех подписок пользователя
export const getUserSubscriptions = async (uid: string): Promise<string[]> => {
  try {
    const userSubscriptionsRef = ref(database, `users/${uid}/courses`);
    const snapshot = await get(userSubscriptionsRef);
    const subscribedCourses = snapshot.val();

    if (!subscribedCourses) {
      return [];
    }

    return subscribedCourses;
  } catch (error) {
    console.error("Ошибка при получении подписок пользователя: ", error);
    return [];
  }
};
import firebase from "firebase/compat/app";
import { child, Database, get, ref, set } from "firebase/database";

export const createUser = async (database: Database, email: string, uid: string) => {
  await set(ref(database, "users/" + uid), {
    email: email,
    workouts: {},
  });
};

export const getUser = async (database: Database, uid: string) => {
  const dbRef = ref(database);
  const snapshot = await get(child(dbRef, `users/${uid}`));

  if (!snapshot.exists()) {
    throw new Error("No data available");
  }

  return snapshot.val();
};

//функция получения информации по всем курсам
export const getCourses = async () => {
  try {
    const coursesRef = firebase.database().ref("courses");
    const snapshot = await coursesRef.once("value");

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

//функция получения данных конкретного курса
export const getCourseById = async (courseId) => {
  try {
    const courseRef = firebase.database().ref(`courses/${courseId}`);
    const snapshot = await courseRef.once("value");
    const course = snapshot.val();

    if (course) {
      return {
        id: courseId,
        ...course,
      };
    } else {
      throw new Error("Курс не найден");
    }
  } catch (error) {
    console.error("Ошибка при получении курса: ", error);
    return null;
  }
};

//подписка на курс
export const subscribeToCourse = async (userId, courseId) => {
  try {
    // Ссылка на подписки пользователя в базе данных
    const userCoursesRef = firebase.database().ref(`users/${userId}/сourses`);

    // Получение текущих подписок пользователя
    const snapshot = await userCoursesRef.once("value");
    const subscribedCourses = snapshot.val() || [];

    // Добавление нового курса, если его нет в списке подписок
    if (!subscribedCourses.includes(courseId)) {
      subscribedCourses.push(courseId);
      await userCoursesRef.set(subscribedCourses);
      console.log(`Пользователь ${userId} успешно подписался на курс ${courseId}.`);
    } else {
      console.log(`Пользователь уже подписан на курс ${courseId}.`);
    }
  } catch (error) {
    console.error("Ошибка при подписке на курс: ", error);
  }
};

//отписка от курса
export const unsubscribeFromCourse = async (userId, courseId) => {
  try {
    // Ссылка на подписки пользователя в базе данных
    const userCoursesRef = firebase.database().ref(`users/${userId}/сourses`);

    // Получение текущих подписок пользователя
    const snapshot = await userCoursesRef.once("value");
    const subscribedCourses = snapshot.val() || [];

    // Удаление курса из списка подписок, если он там есть
    if (subscribedCourses.includes(courseId)) {
      const updatedCourses = subscribedCourses.filter((id) => id !== courseId);
      await userCoursesRef.set(updatedCourses);
      console.log(`Пользователь ${userId} успешно отписался от курса ${courseId}.`);
    } else {
      console.log(`Пользователь не подписан на курс ${courseId}.`);
    }
  } catch (error) {
    console.error("Ошибка при отписке от курса: ", error);
  }
};

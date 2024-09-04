import firebase from "firebase/compat/app";
import { child, Database, get, ref, set } from "firebase/database";

const db = firebase.database();

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

//функция получения информации по всем курсам
export const getCourses = async () => {
  try {
    const coursesRef = db.ref("courses");
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
export const getCourseById = async (courseId: string) => {
  try {
    const courseRef = db.ref(`courses/${courseId}`);
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
export const subscribeToCourse = async (uid: string, courseId: string) => {
  try {
    // Ссылка на подписки пользователя в базе данных
    const userCoursesRef = db.ref(`users/${uid}/сourses`);

    // Получение текущих подписок пользователя
    const snapshot = await userCoursesRef.once("value");
    const subscribedCourses = snapshot.val() || [];

    // Добавление нового курса, если его нет в списке подписок
    if (!subscribedCourses.includes(courseId)) {
      subscribedCourses.push(courseId);
      await userCoursesRef.set(subscribedCourses);
      console.log(
        `Пользователь ${uid} успешно подписался на курс ${courseId}.`
      );
    } else {
      console.log(`Пользователь уже подписан на курс ${courseId}.`);
    }
  } catch (error) {
    console.error("Ошибка при подписке на курс: ", error);
  }
};

//отписка от курса
export const unsubscribeFromCourse = async (uid: string, courseId: string) => {
  try {
    const userCoursesRef = db.ref(`users/${uid}/сourses`);

    const snapshot = await userCoursesRef.once("value");
    const subscribedCourses = snapshot.val() || [];

    // Удаление курса из списка подписок, если он там есть
    if (subscribedCourses.includes(courseId)) {
      const updatedCourses = subscribedCourses.filter(
        (id: string) => id !== courseId
      );
      await userCoursesRef.set(updatedCourses);
      console.log(
        `Пользователь ${uid} успешно отписался от курса ${courseId}.`
      );
    } else {
      console.log(`Пользователь не подписан на курс ${courseId}.`);
    }
  } catch (error) {
    console.error("Ошибка при отписке от курса: ", error);
  }
};

//функция получения всех курсов (подписок) пользователя
export const getUserSubscriptions = async (uid: string): Promise<string[]> => {
  try {
    // Ссылка на узел с подписками пользователя
    const userSubscriptionsRef = db.ref(`users/${uid}/courses`);

    // Получаем данные подписок
    const snapshot = await userSubscriptionsRef.once("value");
    const subscribedCourses = snapshot.val();

    // Если подписок нет, возвращаем пустой массив
    if (!subscribedCourses) {
      return [];
    }

    // Возвращаем подписки (массив ID курсов)
    return subscribedCourses;
  } catch (error) {
    console.error("Ошибка при получении подписок пользователя: ", error);
    return [];
  }
};

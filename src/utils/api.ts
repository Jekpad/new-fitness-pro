import { getDatabase, ref, set, get, child } from "firebase/database";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updatePassword,
} from "firebase/auth";
import { auth, database } from "../../firebase";

// Регистрация пользователя
export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const uid = userCredential.user.uid;

  await set(ref(database, "users/" + uid), {
    email: email,
    username: username,
    courses: {},
  });
};

// Вход пользователя
export const getUser = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const uid = userCredential.user.uid;

  const dbRef = ref(getDatabase());
  const snapshot = await get(child(dbRef, `users/${uid}`));

  if (!snapshot.exists()) {
    throw new Error("Пользователь не найден");
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

//получение данных тренировки по id
export const getWorkoutById = async (workoutId: string) => {
  try {
    const workoutRef = ref(database, `workouts/${workoutId}`);
    const snapshot = await get(workoutRef);

    if (!snapshot.exists()) {
      throw new Error("Workout not found");
    }

    return snapshot.val(); // Возвращаем данные тренировки
  } catch (error) {
    console.error("Ошибка при получении тренировки: ", error);
    return null;
  }
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
			throw new Error('Нет авторизации');
		}
		// Обновляем пароль текущего пользователя
		await updatePassword(auth.currentUser, password);
	} catch (error) {
		// Обрабатываем ошибки и выбрасываем их с сообщением
		if (error instanceof Error) throw new Error(error.message);
	}
};
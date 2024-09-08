import {
	// auth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updatePassword,
} from 'firebase/auth';

// Функция для входа пользователя в систему
export async function userSignin(email: string, password: string) {
	// Попытка входа с использованием email и пароля
	const resSignin = await signInWithEmailAndPassword(auth, email, password);
	// Если вход не удался, выбрасываем ошибку
	if (!resSignin) {
		throw new Error('Ошибка');
	}
	// Получаем данные пользователя из ответа
	const dataSignin = await resSignin.user;
	return dataSignin;
}

// Функция для регистрации нового пользователя
export async function userSignup(email: string, password: string) {
	// Попытка создания нового пользователя с email и паролем
	const resSignup = await createUserWithEmailAndPassword(auth, email, password);
	// Если регистрация не удалась, выбрасываем ошибку
	if (!resSignup) {
		throw new Error('Ошибка');
	}
	// Получаем данные пользователя из ответа
	const dataSignup = await resSignup.user;
	return dataSignup;
}

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

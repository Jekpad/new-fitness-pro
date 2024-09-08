/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, FC, PropsWithChildren, useState } from 'react';
import { UserContextType, UserType } from '../types';

function getUserFromLocalStorage(): UserType | null {
	const res = localStorage.getItem('user');
	if (res) {
		try {
			return JSON.parse(res) as UserType;
		} catch (error) {
			return null;
		}
	}
	return null;
}

export const UserDataContext = createContext<UserContextType>({
	user: null,
	login: null,
	logout: null,
});

export const UserDataProvider: FC<PropsWithChildren> = ({ children }) => {
	const [user, setUser] = useState(getUserFromLocalStorage());

	function login(newUser: UserType) {
		setUser(newUser);
		localStorage.setItem('user', JSON.stringify(newUser));
	}

	function logout() {
		setUser(null);
		localStorage.removeItem('user');
	}

	return (
		<UserDataContext.Provider value={{ user, login, logout }}>
			{children}
		</UserDataContext.Provider>
	);
};

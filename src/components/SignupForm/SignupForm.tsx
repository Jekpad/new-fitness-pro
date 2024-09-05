import { ChangeEvent, useState } from 'react';

import { useUserData } from '../../hooks/useUserData';
import { userSignup } from '../../utils/userAuth_api';

type SignupForm = {
	setIsOpenedSignupForm: (arg: boolean) => void;
	setIsOpenedSigninForm: (arg: boolean) => void;
};

type SignupType = {
	email: string;
	passwordFirst: string;
	passwordSecond: string;
};

export default function SignupForm({
	setIsOpenedSigninForm,
	setIsOpenedSignupForm,
}: SignupForm) {
	const { login } = useUserData();

	const [isNotCorrectEmail, setIsNotCorrectEmail] = useState<boolean>(false);

	const [isNotCorrectPassword, setIsNotCorrectPassword] =
		useState<boolean>(false);

	const [registrationData, setRegistrationData] = useState<SignupType>({
		email: '',
		passwordFirst: '',
		passwordSecond: '',
	});

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setRegistrationData({ ...registrationData, [name]: value });
	};

	function handleOpenSigninForm() {
		setIsOpenedSigninForm(true);
		setIsOpenedSignupForm(false);
	}

	const handleSignUp = async () => {
		setIsNotCorrectPassword(false);
		if (registrationData.passwordFirst !== registrationData.passwordSecond) {
			setIsNotCorrectPassword(true);
			return;
		}
		setIsNotCorrectEmail(false);
		await userSignup(registrationData.email, registrationData.passwordFirst)
			.then(userData => {
				login?.({
					id: userData.uid,
					email: userData.email,
					token: userData.refreshToken,
				});
				setIsOpenedSignupForm(false);
			})
			.catch(() => {
				setIsNotCorrectEmail(true);
			});
	};

	return (
		<>
			<div className='min-w-375 absolute left-0 top-0 z-50 flex h-[100%] min-h-[100vh] w-[100%] flex-col items-center justify-center bg-black bg-opacity-20'>
				<div className='block h-[490px] w-[100%] max-w-[360px] rounded-blockRadiusMax border-solid border-zinc-300 bg-white px-20 py-10'>
					<div className='mb-12 flex items-center justify-center'>
						<img
							onClick={() => setIsOpenedSignupForm(false)}
							src='/public/logo.png'
							alt='logo'
						/>
					</div>
					<form>
						<div className='flex flex-col items-center justify-center'>
							<div className=' '>
								<input
									className={
										isNotCorrectEmail
											? 'rounded-small border-gray-extra bg-white-base text-black-base placeholder-gray-extra mb-2.5 h-[52px] w-[280px] appearance-none rounded-inputRadius border border-errorColor px-[18px] py-[12px] text-lg'
											: 'rounded-small border-gray-extra bg-white-base text-black-base placeholder-gray-extra mb-2.5 h-[52px] w-[280px] appearance-none rounded-inputRadius border px-[18px] py-[12px] text-lg'
									}
									name='email'
									type='email'
									placeholder='Email'
									value={registrationData.email}
									onChange={handleInputChange}
								/>
							</div>
							<div className=''>
								<input
									className='border-error rounded-small border-gray-extra bg-white-base text-black-base placeholder-gray-extra mb-2.5 h-[52px] w-[280px] appearance-none rounded-inputRadius border px-[18px] py-[12px] text-lg'
									name='passwordFirst'
									type='password'
									placeholder='Пароль'
									value={registrationData.passwordFirst}
									onChange={handleInputChange}
								/>
							</div>
							<div className=''>
								<input
									className='border-error rounded-small border-gray-extra bg-white-base text-black-base placeholder-gray-extra mb-4 h-[52px] w-[280px] appearance-none rounded-inputRadius border px-[18px] py-[12px] text-lg'
									name='passwordSecond'
									type='password'
									placeholder='Повторите пароль'
									value={registrationData.passwordSecond}
									onChange={handleInputChange}
								/>
							</div>
						</div>
						{/* <div className="border-errorColor text-error w-[220px] text-sm text-center ">
              {isNotCorrectPassword ? "Данная почта уже используется. Попробуйте войти." : `${isNotCorrect}`}
            </div> */}
						{isNotCorrectPassword && (
							<div className='text-error w-[220px] text-center text-sm text-errorColor'>
								Пароли не совпадают...
							</div>
						)}
						{isNotCorrectEmail && (
							<div className='text-error w-[220px] text-center text-sm text-errorColor'>
								Данная почта уже используется. Попробуйте войти.
							</div>
						)}
						<div className='flex flex-col items-center justify-center'>
							<button
								className='mt-4 h-[52px] w-[280px] rounded-buttonRadius bg-mainColor text-[18px] font-normal hover:bg-mainHover active:bg-black'
								onClick={handleSignUp}
								type='button'
							>
								Зарегистрироваться
							</button>
							<button
								className='disabled:bg-gray-light disabled:text-gray-dark disabled:border-gray-dark mt-3 h-[52px] w-[280px] rounded-buttonRadius border border-zinc-900 text-[18px] font-normal leading-[19.8px] transition-colors duration-300 hover:bg-bgColor active:bg-blackout'
								onClick={handleOpenSigninForm}
								type='button'
							>
								Войти
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

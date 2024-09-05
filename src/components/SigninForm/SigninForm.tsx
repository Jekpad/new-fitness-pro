import { ChangeEvent, useState } from 'react';
import { useUserData } from '../../hooks/useUserData';
import { userSignin } from '../../utils/userAuth_api';

type SigninForm = {
	setIsOpenedSignupForm: (arg: boolean) => void;
	setIsOpenedSigninForm: (arg: boolean) => void;
};

type SigninType = {
	email: string;
	password: string;
};

export default function SigninForm({
	setIsOpenedSigninForm,
	setIsOpenedSignupForm,
}: SigninForm) {
	const { login } = useUserData();

	const [isOpenedEmailForm, setIsOpenedEmailForm] = useState<boolean>(false);

	const [loginData, setLoginData] = useState<SigninType>({
		email: '',
		password: '',
	});

	const [isNotCorrectPassword, setIsNotCorrectPassword] =
		useState<boolean>(false);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setLoginData({
			...loginData,
			[name]: value,
		});
	};

	function handleOpenSignupForm() {
		setIsOpenedSigninForm(false);
		setIsOpenedSignupForm(true);
	}

	function handleRecoverPassword() {
		setIsOpenedEmailForm(true);
		setTimeout(() => {
			setIsOpenedEmailForm(false);
		}, 3000);
	}

	const handleLogin = async () => {
		setIsNotCorrectPassword(false);
		await userSignin(loginData.email, loginData.password)
			.then(userData => {
				login?.({
					id: userData.uid,
					email: userData.email,
					token: userData.refreshToken,
				});
				setIsOpenedSigninForm(false);
			})
			.catch(() => {
				setIsNotCorrectPassword(true);
			});
	};

	return (
		<>
			<div className='absolute left-0 top-0 z-50 flex h-[100%] min-h-[100vh] w-[100%] min-w-[375px] flex-col items-center justify-center bg-black bg-opacity-20'>
				<div className='block h-[425px] w-[100%] max-w-[360px] rounded-blockRadiusMax border-solid border-zinc-300 bg-white px-20 py-10'>
					<div className='mb-12 flex items-center justify-center'>
						<img
							onClick={() => setIsOpenedSigninForm(false)}
							src='/images/logo.png'
							alt='logo'
						/>
					</div>
					<form>
						<div className='flex flex-col items-center justify-center'>
							<div className=' '>
								<input
									className='rounded-small border-gray-extra bg-white-base text-black-base placeholder-gray-extra mb-2.5 h-[52px] w-[280px] appearance-none rounded-inputRadius border px-[18px] py-[12px] text-lg'
									name='email'
									type='email'
									placeholder='Email'
									value={loginData.email}
									onChange={handleInputChange}
								/>
							</div>
							<div className=''>
								<input
									className={
										isNotCorrectPassword
											? 'rounded-small border-gray-extra bg-white-base text-black-base placeholder-gray-extra mb-3 h-[52px] w-[280px] appearance-none rounded-inputRadius border border-errorColor px-[18px] py-[12px] text-lg'
											: 'rounded-small border-gray-extra bg-white-base text-black-base placeholder-gray-extra mb-3 h-[52px] w-[280px] appearance-none rounded-inputRadius border px-[18px] py-[12px] text-lg'
									}
									name='password'
									type='password'
									placeholder='Пароль'
									value={loginData.password}
									onChange={handleInputChange}
								/>
							</div>
							{isNotCorrectPassword && (
								<>
									<div className='text-error w-[270px] text-center text-sm text-errorColor'>
										Пароль введен неверно, попробуйте еще раз.&nbsp;
										<button
											className='text-errorColor underline'
											onClick={handleRecoverPassword}
										>
											Восстановить пароль?
										</button>
									</div>
								</>
							)}
							{isOpenedEmailForm && (
								<div className='absolute left-0 top-0 z-50 flex min-h-[100vh] w-[100%] min-w-[375px] flex-col items-center justify-center bg-black bg-opacity-20'>
									<div className='flex h-[450px] w-[100%] max-w-[360px] items-center rounded-blockRadiusMax border-solid border-zinc-300 bg-white px-20 py-10'>
										<div className='flex flex-col items-center justify-center'>
											<img src='/images/logo.png' alt='logo' />
											<div className='mt-10 text-center text-[18px]'>
												Ссылка для востановления пароля отправлена на{' '}
												{loginData.email}
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
						<div className='mt-3 flex flex-col items-center justify-center'>
							<button
								className='h-[52px] w-[280px] rounded-buttonRadius bg-mainColor text-[18px] font-normal hover:bg-mainHover active:bg-black'
								onClick={handleLogin}
								type='button'
							>
								Войти
							</button>
							<button
								className='disabled:bg-gray-light disabled:text-gray-dark disabled:border-gray-dark mt-3 h-[52px] w-[280px] rounded-buttonRadius border border-zinc-900 text-[18px] font-normal leading-[19.8px] transition-colors duration-300 hover:bg-bgColor active:bg-blackout'
								onClick={handleOpenSignupForm}
								type='button'
							>
								Зарегистрироваться
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

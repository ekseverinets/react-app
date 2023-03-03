import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { IPaths } from 'src/constants';
import InputField from '../../common/InputField/InputField';

import styles from './Login.module.css';
import { AppDispatch } from 'src/store';
import { loginUser } from 'src/store/user/actions';

const LoginForm = () => {
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();

	const [values, setValues] = useState({
		email: '',
		password: '',
	});

	const [error, setError] = useState({
		email: {
			isReq: true,
			errorMsg: '',
		},
		password: {
			isReq: true,
			errorMsg: '',
		},
	});

	const [hasAuthError, setAuthError] = useState(false);

	const handleInputChange = useCallback((value, name) => {
		setValues((prevState) => ({
			...prevState,
			[name]: value,
		}));
	}, []);

	const onValidateFunc = (value, name) => {
		setError((prevState) => ({
			...prevState,
			[name]: { ...prevState[name], errorMsg: value },
		}));
	};

	const validateForm = () => {
		let isInvalid = false;
		Object.keys(error).forEach((errorItem) => {
			const errObj = error[errorItem];
			if (errObj.errorMsg) {
				isInvalid = true;
			} else if (errObj.isReq && !values[errorItem]) {
				isInvalid = true;
				onValidateFunc(true, errorItem);
			}
		});
		return !isInvalid;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const isValid = validateForm();
		if (!isValid) {
			console.error('Invalid Form!');
			return false;
		}

		if (isValid) {
			const user = {
				email: values.email,
				password: values.password,
			};

			// if (!result.successful) {
			// 	setAuthError(true);
			// } else {
			// 	setAuthorror(false);
			// 	handleSetUser(true, result.user.name);
			// 	localStorage.setItem('token', JSON.stringify(result.result));
			// 	navigate(IPaths.Courses);
			// }

			dispatch(loginUser(user));
			navigate(IPaths.Courses);
		}
	};

	return (
		<div className={styles.formWrap}>
			<h2 className={styles.formTitle}>Login</h2>
			<form className={styles.formInner} onSubmit={handleSubmit}>
				<InputField
					type='email'
					placeholder='Enter email'
					name='email'
					title='Email'
					value={values.email}
					onChangeFunc={handleInputChange}
					onValidateFunc={onValidateFunc}
					{...error.email}
				/>

				<InputField
					type='password'
					placeholder='Enter password'
					name='password'
					title='Password'
					value={values.password}
					onChangeFunc={handleInputChange}
					onValidateFunc={onValidateFunc}
					{...error.password}
				/>

				<button className={styles.formBtn} type='submit'>
					Login
				</button>
			</form>

			{hasAuthError && (
				<div className={styles.formError}>
					<span>Authentication error! Please try again</span>
				</div>
			)}

			<div className={styles.formLink}>
				If you not have an account you can{' '}
				<Link to={IPaths.Registration}>Registration</Link>
			</div>
		</div>
	);
};

export default LoginForm;

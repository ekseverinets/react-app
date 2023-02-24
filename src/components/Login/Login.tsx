import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import InputField from '../../common/InputField/InputField';

import { IPaths } from 'src/constants';

import styles from './Login.module.css';

const LoginForm = ({ setUserName, setAuthState }) => {
	const navigate = useNavigate();

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

	const [hasAuthorError, setAuthorError] = useState(false);

	const handleInputChange = useCallback((value, name) => {
		setValues((prev) => ({
			...prev,
			[name]: value,
		}));
	}, []);

	const onValidateFunc = (value, name) => {
		setError((prev) => ({
			...prev,
			[name]: { ...prev[name], errorMsg: value },
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

			const response = await fetch('http://localhost:4000/login', {
				method: 'POST',
				body: JSON.stringify(user),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const result = await response.json();

			if (!result.successful) {
				setAuthorError(true);
			} else {
				setAuthorError(false);
				setUserName(result.user.name);
				localStorage.setItem('token', JSON.stringify(result.result));
				setAuthState(true);
				navigate(IPaths.Courses);
			}
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

			{hasAuthorError === true && (
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

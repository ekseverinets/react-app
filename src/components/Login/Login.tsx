import React, { useState, useCallback } from 'react';
import { Link, Navigate } from 'react-router-dom';

import InputField from '../../common/InputField/InputField';

import styles from './Login.module.css';

const LoginForm = () => {
	const [values, setValues] = useState({
		email: '',
		password: '',
	});

	const handleInputChange = useCallback((value, name) => {
		setValues((prev) => ({
			...prev,
			[name]: value,
		}));
	}, []);

	const onInputValidate = (value, name) => {
		setError((prev) => ({
			...prev,
			[name]: { ...prev[name], errorMsg: value },
		}));
	};

	const isReq = true;
	const errorMsg = '';
	const onValidateFunc = onInputValidate;

	const [error, setError] = useState({
		email: {
			isReq,
			errorMsg,
			onValidateFunc,
		},
		password: {
			isReq,
			errorMsg,
			onValidateFunc,
		},
	});

	const validateForm = () => {
		let isInvalid = false;
		Object.keys(error).forEach((errorItem) => {
			const errObj = error[errorItem];
			if (errObj.errorMsg) {
				isInvalid = true;
			} else if (errObj.isReq && !values[errorItem]) {
				isInvalid = true;
				onInputValidate(true, errorItem);
			}
		});
		return !isInvalid;
	};

	const [submitted, setSubmitted] = useState(false);

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
			console.log(result);

			setSubmitted(true);
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
					{...error.email}
				/>
				{submitted && !values.email && (
					<span>Please enter an email address</span>
				)}

				<InputField
					type='password'
					placeholder='Enter password'
					name='password'
					title='Password'
					value={values.password}
					onChangeFunc={handleInputChange}
					{...error.password}
				/>
				{submitted && !values.password && <span>Please enter a password</span>}

				<button className={styles.formBtn} type='submit'>
					Login
				</button>
			</form>
			<div className={styles.formLink}>
				If you not have an account you can{' '}
				<Link to='/registration'>Registration</Link>
			</div>
			{submitted && <Navigate to='/courses' />}
		</div>
	);
};

export default LoginForm;

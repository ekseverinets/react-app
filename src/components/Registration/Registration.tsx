import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getUser } from '../../store/user/selectors';
import { registerUser } from '../../store/user/actions';

import { IPaths } from 'src/constants';
import InputField from '../../common/InputField/InputField';

import styles from './Registration.module.css';

const RegistrationForm = () => {
	const { registerError } = useAppSelector(getUser);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [values, setValues] = useState({
		name: '',
		email: '',
		password: '',
	});

	const [error, setError] = useState({
		name: {
			isReq: true,
			errorMsg: '',
		},
		email: {
			isReq: true,
			errorMsg: '',
		},
		password: {
			isReq: true,
			errorMsg: '',
		},
	});

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
			const newUser = {
				name: values.name,
				email: values.email,
				password: values.password,
			};

			dispatch(registerUser(newUser, () => navigate(IPaths.Login)));
		}
	};

	return (
		<div className={styles.formWrap}>
			<h2 className={styles.formTitle}>Registration</h2>
			<form className={styles.formInner} onSubmit={handleSubmit}>
				<InputField
					type='text'
					placeholder='Enter name'
					name='name'
					title='Name'
					min={2}
					value={values.name}
					onChangeFunc={handleInputChange}
					onValidateFunc={onValidateFunc}
					{...error.name}
				/>

				<InputField
					type='email'
					placeholder='Enter email'
					name='email'
					title='Email'
					min={2}
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
					min={6}
					value={values.password}
					onChangeFunc={handleInputChange}
					onValidateFunc={onValidateFunc}
					{...error.password}
				/>

				<button className={styles.formBtn} type='submit'>
					Registration
				</button>
			</form>

			{registerError && (
				<div className={styles.formError}>
					<span>Mayby your email already exists! Try login</span>
				</div>
			)}

			<div className={styles.formLink}>
				If you have an account you can <Link to={IPaths.Login}> Login</Link>
			</div>
		</div>
	);
};

export default RegistrationForm;

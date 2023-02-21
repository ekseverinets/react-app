import React, { memo } from 'react';

import styles from './InputField.module.css';

const validationHandler = (e, props) => {
	if (!props.onValidateFunc) return;

	const { value, name } = e.target;
	let msg = null;

	if (!value && props.isReq) {
		msg = `Please enter ${props.title}.`;
	} else if (props.min && value.length < props.min) {
		msg = `${props.title} must be at least ${props.min} characters long.`;
	} else if (props.type === 'number' && parseInt(value) < 1) {
		msg = 'Duration should be more than 0 minutes';
	} else if (props.type === 'password' && !/^[a-zA-Z]*$/g.test(value)) {
		msg = 'Please enter only letters';
	}
	props.onValidateFunc(msg, name);
};

const InputField = (props) => {
	const inputProps = {
		name: props.name,
		type: props.type,
		placeholder: props.placeholder || `Enter ${props.title}`,
		className: props.className,
		value: props.value,
	};

	return (
		<div className={styles.inputWrap}>
			<label>{props.title}</label>
			<input
				{...inputProps}
				onChange={(e) => props.onChangeFunc(e.target.value, e.target.name, e)}
				onBlur={(e) => validationHandler(e, props)}
			/>
			{props.errorMsg && (
				<span className={styles.errorText}>
					{props.errorMsg === true
						? `Please enter ${props.title}.`
						: props.errorMsg}
				</span>
			)}
		</div>
	);
};

InputField.defaultProps = {
	type: 'text',
	name: '',
	title: '',
	placeholder: '',
	value: '',
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onChangeFunc: () => {},
	isReq: null,
	reqType: '',
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onValidateFunc: () => {},
};

export default memo(InputField);

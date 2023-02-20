import React, { memo } from 'react';
import PropTypes from 'prop-types';

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
		<div>
			<label>{props.title}</label>
			<input
				{...inputProps}
				onChange={(e) => props.onChangeFunc(e.target.value, e.target.name, e)}
				onBlur={(e) => validationHandler(e, props)}
			/>
			{props.errorMsg && (
				<span className='error-text'>
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
	onChangeFunc: () => {},
	isReq: null,
	reqType: '',
	onValidateFunc: () => {},
};

InputField.propTypes = {
	type: PropTypes.string,
	name: PropTypes.string,
	title: PropTypes.string,
	placeholder: PropTypes.string,
	className: PropTypes.string,
	outerClassName: PropTypes.string,
	value: PropTypes.any,
	min: PropTypes.number,
	max: PropTypes.number,
	onChangeFunc: PropTypes.func,
	isReq: PropTypes.bool,
	reqType: PropTypes.string,
	errorMsg: PropTypes.any,
	onValidateFunc: PropTypes.func,
};

export default memo(InputField);

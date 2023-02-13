export const getCourseDuration = (mins) => {
	let hours = Math.trunc(mins / 60);
	let minutes = mins % 60;

	return (hours === 0 || hours === 1) && minutes < 10
		? `0${hours}:0${minutes} hour`
		: (hours === 0 || hours === 1) && minutes >= 10
		? `0${hours}:${minutes} hour`
		: hours < 10 && minutes < 10
		? `0${hours}:0${minutes} hours`
		: hours < 10 && minutes >= 10
		? `0${hours}:${minutes} hours`
		: hours >= 10 && minutes < 10
		? `${hours}:0${minutes} hours`
		: hours >= 10 && minutes >= 10
		? `${hours}:${minutes} hours`
		: undefined;
};

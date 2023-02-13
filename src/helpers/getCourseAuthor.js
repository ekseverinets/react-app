export const getCourseAuthor = (dataArray, authorsArray) => {
	return dataArray.map((item) => {
		return authorsArray.filter((author) => {
			return item.includes(author.id);
		});
	});
};

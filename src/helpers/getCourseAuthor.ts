export const getCourseAuthor = (authorsIds, authors) => {
	const authorsResult = authors.filter(({ id }) => {
		return authorsIds.some((authorId) => authorId === id);
	});

	return authorsResult.map(({ name }) => name).join(', ');
};

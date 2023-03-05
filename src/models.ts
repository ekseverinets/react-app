export interface IUser {
	name?: string;
	email: string;
	password: string;
}

export interface ICourse {
	id: string;
	title: string;
	description: string;
	duration: number;
	creationDate: string;
	authors: string[];
}

export interface IAuthor {
	id: string;
	name: string;
}

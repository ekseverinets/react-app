export interface IUser {
	isAuth: boolean;
	name: string;
	email: string;
	token: string;
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

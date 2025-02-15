import { ObjectId } from 'mongodb';

export enum Status {
	TODO = 'todo',
	WIP = 'wip',
	DONE = 'done',
}

export interface IProblem {
	_id?: ObjectId;
	id: number;
	rating: number;
	title: string;
	titleSlug: string;
	contestSlug: string;
	contestTitle: string;
	problemIndex: string;
	status: Status;
	date: string; // e.g., "Yesterday", "2 days ago", "DD-MM-YYYY"
	tags: string[];
	favorite: boolean;
	attempts: number;
}

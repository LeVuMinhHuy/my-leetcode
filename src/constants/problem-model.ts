import { ObjectId } from 'mongodb';

export enum Status {
	TODO = 'todo',
	WIP = 'wip',
	DONE = 'done',
}

export interface IProblem {
	_id?: ObjectId;
	id: string;
	rating: number;
	title: string;
	titleSlug: string;
	contestSlug: string;
	contestTitle: string;
	problemIndex: string;
	status: Status;
	date: string; // e.g., "Yesterday", "2 days ago", "DD-MM-YYYY"
	favorite: boolean;
	attempts: number;
	likes?: number;
	dislikes?: number;
	likeRatio?: number;
	topics?: string[];
	difficulty?: string;
	accepted?: number;
	submissions?: number;
	acceptRate?: number;
	free?: boolean;
	solution?: boolean;
	videoSolution?: boolean;
	category?: string;
	llmPrompt?: string;
}

export interface IProblemAdditonalData {
	id: string;
	problemName: string;
	likes: number;
	dislikes: number;
	likeRatio: number;
	topics: string[];
	difficulty: string;
	accepted: number;
	submissions: number;
	acceptRate: number;
	free: boolean;
	solution: boolean;
	videoSolution: boolean;
	category: string;
	llmPrompt: string;
}

export type LeetCodeCSV = {
	ID: string;
	'Problem Name': string;
	Likes: string;
	Dislikes: string;
	'Like Ratio': string;
	Topics: string;
	Difficulty: string;
	Accepted: string;
	Submissions: string;
	'Accept Rate': string;
	'Free?': string;
	'Solution?': string;
	'Video Solution?': string;
	Category: string;
	'LLM Prompt': string;
};

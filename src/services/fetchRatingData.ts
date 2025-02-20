import { type ColumnSchema } from '@/app/(default)/schema';
import { ZEROTRACK_RATINGS_DATA } from '@/constants/data-source';
import { DB_COLLECTION } from '@/constants/database';
import { IProblem, Status } from '@/constants/problem-model';
import { processRatingData } from './processRatingData';
import { WithId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

export const fetchRatingData = async (): Promise<ColumnSchema[]> => {
	try {
		const client = await clientPromise;
		const db = client.db();
		const collection = db.collection<IProblem>(DB_COLLECTION);

		const response = await fetch(ZEROTRACK_RATINGS_DATA);
		const text = await response.text();

		const processedData = await processRatingData(text);

		await Promise.all(
			processedData.map(async (problem) => {
				const existingProblem = await collection.findOne({ id: problem.id });
				await collection.updateOne(
					{ id: problem.id },
					{
						//$set: initData(existingProblem, problem),
						$set: updateData(existingProblem, problem),
					},
					{ upsert: true }
				);

				console.log(
					`${(((processedData.indexOf(problem) + 1) / processedData.length) * 100).toFixed(
						2
					)}% | Done problem ${problem.id}`
				);
			})
		);

		return processedData;
	} catch (error) {
		console.error(error);
		return [];
	}
};

const initData = (existingProblem: WithId<IProblem> | null, problem: ColumnSchema) => {
	return {
		...problem,
		status: existingProblem?.status ?? Status.TODO,
		date: existingProblem?.date ?? '',
		favorite: existingProblem?.favorite ?? false,
		attempts: existingProblem?.attempts ?? 0,
		// ===
		//status: problem.status ?? Status.TODO,
		//date: problem.date ?? '',
		//favorite: problem.favorite ?? false,
		//attempts: problem.attempts ?? 0,
		likes: problem.likes ?? 0,
		dislikes: problem.dislikes ?? 0,
		likeRatio: problem.likeRatio ?? 0,
		topics: problem.topics ?? [],
		difficulty: problem.difficulty ?? '',
		accepted: problem.accepted ?? 0,
		submissions: problem.submissions ?? 0,
		acceptRate: problem.acceptRate ?? 0,
		free: problem.free ?? false,
		solution: problem.solution ?? false,
		videoSolution: problem.videoSolution ?? false,
		category: problem.category ?? '',
		llmPrompt: problem.llmPrompt ?? '',
	};
};

const updateData = (existingProblem: WithId<IProblem> | null, problem: ColumnSchema) => {
	return {
		...problem,
		status: existingProblem?.status ?? Status.TODO,
		date: existingProblem?.date ?? '',
		favorite: existingProblem?.favorite ?? false,
		attempts: existingProblem?.attempts ?? 0,
		likes: existingProblem?.likes ?? 0,
		dislikes: existingProblem?.dislikes ?? 0,
		likeRatio: existingProblem?.likeRatio ?? 0,
		topics: existingProblem?.topics ?? [],
		difficulty: existingProblem?.difficulty ?? '',
		accepted: existingProblem?.accepted ?? 0,
		submissions: existingProblem?.submissions ?? 0,
		acceptRate: existingProblem?.acceptRate ?? 0,
		free: existingProblem?.free ?? false,
		solution: existingProblem?.solution ?? false,
		videoSolution: existingProblem?.videoSolution ?? false,
		category: existingProblem?.category ?? '',
		llmPrompt: existingProblem?.llmPrompt ?? '',
	};
};

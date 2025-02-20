import { type ColumnSchema } from '@/app/(default)/schema';
import { MY_LOCAL_CSV } from '@/constants/data-source';
import { IProblem, LeetCodeCSV } from '@/constants/problem-model';
import { ARRAY_DELIMITER, SLUG_DELIMITER } from '@/lib/delimiters';
import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';

export const processRatingData = async (data: string): Promise<ColumnSchema[]> => {
	const updatedData = data
		.trim()
		.split('\n')
		.map((line) => {
			const [rating, id, title, _titleZH, titleSlug, contestSlug, problemIndex] = line.split('\t');

			return {
				rating: Math.round(parseFloat(rating)),
				id: id,
				title,
				titleSlug,
				contestSlug,
				contestTitle: contestSlug
					.split(SLUG_DELIMITER)
					.map((s) => s.charAt(0).toUpperCase() + s.slice(1))
					.join(' '),
				problemIndex,
			};
		})
		.filter((entry) => !Number.isNaN(entry.id) && !isNaN(entry.rating)) satisfies ColumnSchema[];

	// polulate additional data
	const populatedData = await getProblemAdditionalData(updatedData);

	// shuffle the data
	for (let i = populatedData.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[populatedData[i], populatedData[j]] = [populatedData[j], populatedData[i]];
	}

	return populatedData;
};

export const processDatabaseData = (data: IProblem[]): ColumnSchema[] => {
	return data.map((entry) => ({
		rating: entry.rating,
		id: entry.id.toString(),
		title: entry.title,
		titleSlug: entry.titleSlug,
		contestSlug: entry.contestSlug,
		contestTitle: entry.contestTitle,
		problemIndex: entry.problemIndex,
		status: entry.status,
		date: entry.date,
		tags: entry.tags,
		favorite: entry.favorite,
		attempts: entry.attempts,
		likes: entry.likes,
		dislikes: entry.dislikes,
		likeRatio: entry.likeRatio,
		topics: entry.topics,
		difficulty: entry.difficulty,
		accepted: entry.accepted,
		submissions: entry.submissions,
		acceptRate: entry.acceptRate,
		free: entry.free,
		solution: entry.solution,
		//videoSolution: entry.videoSolution,
		category: entry.category,
		//llmPrompt: entry.llmPrompt,
	}));
};

const getProblemAdditionalData = async (problems: ColumnSchema[]): Promise<IProblem[]> => {
	const filePath = path.resolve(process.cwd(), MY_LOCAL_CSV);
	const data = await readCSV(filePath);

	const problemMap = new Map<string, LeetCodeCSV>();
	data.forEach((problem) => {
		problemMap.set(problem.ID, problem);
	});

	const result = problems.map((problem) => {
		const problemData = problemMap.get(problem.id);
		if (problemData) {
			return {
				...problem,
				likes: Number(problemData.Likes),
				dislikes: Number(problemData.Dislikes),
				likeRatio: Number(problemData['Like Ratio'].replace('%', '')),
				topics: problemData.Topics.split(ARRAY_DELIMITER).map((topic) => topic.trim()),
				difficulty: problemData.Difficulty,
				accepted: Number(problemData.Accepted),
				submissions: Number(problemData.Submissions),
				acceptRate: Number(problemData['Accept Rate'].replace('%', '')),
				free: problemData['Free?'] === 'Yes',
				solution: problemData['Solution?'] === 'Yes',
				videoSolution: problemData['Video Solution?'] === 'Yes',
				category: problemData.Category,
				llmPrompt: problemData['LLM Prompt'],
			};
		}
		return {};
	}) as IProblem[];

	return result;
};

const readCSV = (filePath: string): Promise<LeetCodeCSV[]> => {
	return new Promise((resolve, reject) => {
		const results: LeetCodeCSV[] = [];
		fs.createReadStream(filePath)
			.pipe(csv())
			.on('data', (data) => results.push(data))
			.on('end', () => resolve(results))
			.on('error', (err) => reject(err));
	});
};

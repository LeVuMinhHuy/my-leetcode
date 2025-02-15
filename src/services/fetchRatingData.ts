import { type ColumnSchema } from '@/app/(default)/schema';
import { ZEROTRACK_RATINGS_DATA } from '@/constants/data-source';
import { DB_COLLECTION } from '@/constants/database';
import { IProblem, Status } from '@/constants/problem-model';
import { getDb } from '@/lib/mongodb';
import { processRatingData } from './processRatingData';

export const fetchRatingData = async (): Promise<ColumnSchema[]> => {
	try {
		const db = await getDb();
		const collection = db.collection<IProblem>(DB_COLLECTION);

		const response = await fetch(ZEROTRACK_RATINGS_DATA);
		const text = await response.text();

		const processedData = processRatingData(text);

		await Promise.all(
			processedData.map(async (problem) => {
				const existingProblem = await collection.findOne({ id: problem.id });
				await collection.updateOne(
					{ id: problem.id },
					{
						$set: {
							...problem,
							status: existingProblem?.status ?? Status.TODO,
							tags: existingProblem?.tags ?? [],
							date: existingProblem?.date ?? '',
							favorite: existingProblem?.favorite ?? false,
							attempts: existingProblem?.attempts ?? 0,
						},
					},
					{ upsert: true }
				);
			})
		);

		return processedData;
	} catch (error) {
		console.error(error);
		return [];
	}
};

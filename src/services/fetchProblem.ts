import { ColumnSchema } from '@/app/(default)/schema';
import { DB_COLLECTION } from '@/constants/database';
import { IProblem } from '@/constants/problem-model';
import clientPromise from '@/lib/mongodb';
import { processDatabaseData } from './processRatingData';

export const fetchProblem = async (): Promise<ColumnSchema[]> => {
	const client = await clientPromise;
	const db = client.db();
	const collection = db.collection(DB_COLLECTION);
	const problems = (await collection.find().toArray()) as IProblem[];

	return processDatabaseData(problems);
};

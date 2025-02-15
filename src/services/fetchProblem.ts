import { ColumnSchema } from '@/app/(default)/schema';
import { DB_COLLECTION } from '@/constants/database';
import { connectDB, getDb } from '@/lib/mongodb';
import { processDatabaseData } from './processRatingData';
import { IProblem } from '@/constants/problem-model';

export const fetchProblem = async (): Promise<ColumnSchema[]> => {
	await connectDB();
	const db = await getDb();
	const collection = db.collection(DB_COLLECTION);
	const problems = (await collection.find().toArray()) as IProblem[];

	return processDatabaseData(problems);
};

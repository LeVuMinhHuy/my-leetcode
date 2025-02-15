import { DB_COLLECTION } from '@/constants/database';
import { connectDB, getDb } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	try {
		await connectDB();

		const { id, status, date, tags, favorite, attempts } = await req.json();

		if (!id) {
			return NextResponse.json({ error: 'Where is the id bro ?' }, { status: 400 });
		}

		const db = await getDb();
		const collection = db.collection(DB_COLLECTION);

		await collection.updateOne(
			{ id },
			{
				$set: {
					status,
					date: date || new Date(),
					tags: tags || [],
					favorite: favorite ?? false,
					attempts: attempts ?? 0,
				},
			}
		);

		return NextResponse.json({ message: 'Problem updated successfully' });
	} catch (error) {
		return NextResponse.json({ error: 'Failed to update problem' }, { status: 500 });
	}
}

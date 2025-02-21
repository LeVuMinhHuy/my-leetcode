import { DB_COLLECTION } from '@/constants/database';
import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	try {
		const client = await clientPromise;

		const { id, status, date, favorite, attempts } = await req.json();

		if (!id) {
			return NextResponse.json({ error: 'Where is the id bro ?' }, { status: 400 });
		}

		const db = client.db();
		const collection = db.collection(DB_COLLECTION);

		const result = await collection.updateOne(
			{ id: +id },
			{
				$set: {
					...(status && { status }),
					...(date && { date }),
					...((favorite === true || favorite === false) && { favorite }),
					...(attempts && { attempts }),
				},
			}
		);

		return NextResponse.json({ message: 'Problem updated successfully' });
	} catch (error) {
		return NextResponse.json({ error: 'Failed to update problem' }, { status: 500 });
	}
}

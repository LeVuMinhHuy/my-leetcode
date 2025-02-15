import { fetchRatingData } from '@/services/fetchRatingData';
import { NextResponse } from 'next/server';

export async function GET() {
	console.log('Running fetchRatingData cron job at midnight...');
	try {
		await fetchRatingData();
		console.log('Data fetched and updated successfully.');
		return NextResponse.json({ message: 'Cron job executed successfully' });
	} catch (error) {
		console.error('Error running fetchRatingData:', error);
		return NextResponse.json({ error: 'Failed to execute cron job' }, { status: 500 });
	}
}

import { LC_USERNAME } from '@/constants/data-source';
import { NextResponse } from 'next/server';

interface LeetCodeCalendarResponse {
	totalSolved: number;
	totalQuestions: number;
	submissionCalendar: { [key: string]: number };
}

export async function GET() {
	try {
		const username = LC_USERNAME;
		const year = new Date().getFullYear();
		const url = `https://leetcode-stats-api.herokuapp.com/${username}`;

		const response = await fetch(url);
		if (!response.ok) {
			console.log({ response });
			throw new Error('Failed to fetch calendar data');
		}

		const data: LeetCodeCalendarResponse = await response.json();
		const submissionCalendar: { [key: string]: number } = data.submissionCalendar;

		const totalSolved = data.totalSolved;
		const totalQuestions = data.totalQuestions;

		let streak = 0;
		let maxStreak = 0;
		const uniqueDates = new Set<number>();
		const dates: Date[] = [];

		// Collect unique submission dates
		Object.entries(submissionCalendar).forEach(([timestamp, problemCount]) => {
			if (problemCount > 0) {
				const date = new Date(parseInt(timestamp) * 1000);
				const dateYear = date.getFullYear();

				if (dateYear === year) {
					uniqueDates.add(date.setHours(0, 0, 0, 0));

					for (let i = 0; i < problemCount; i++) {
						dates.push(date);
					}
				}
			}
		});

		// Convert to sorted array
		const sortedDates = Array.from(uniqueDates).sort((a, b) => a - b);

		// Calculate longest streak
		for (let i = 0; i < sortedDates.length; i++) {
			if (i > 0 && sortedDates[i] === sortedDates[i - 1] + 86400000) {
				streak++;
			} else {
				streak = 1;
			}
			maxStreak = Math.max(maxStreak, streak);
		}

		return NextResponse.json({ dates, year, streak: maxStreak, totalSolved, totalQuestions });
	} catch (error) {
		console.error('Error fetching calendar data:', error);
		return NextResponse.json({ error: 'Failed to fetch calendar data' }, { status: 500 });
	}
}

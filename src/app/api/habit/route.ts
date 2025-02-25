import { LC_USERNAME } from '@/constants/data-source';
import { NextResponse } from 'next/server';

interface LeetCodeCalendarResponse {
	data: {
		matchedUser: {
			userCalendar: {
				activeYears: number[];
				streak: number;
				totalActiveDays: number;
				dccBadges: any[];
				submissionCalendar: string;
			};
		};
	};
}

export async function GET() {
	try {
		const username = LC_USERNAME;
		const year = new Date().getFullYear();
		const url = `https://alfa-leetcode-api.onrender.com/userProfileCalendar?username=${username}&year=${year}`;

		const response = await fetch(url);
		if (!response.ok) {
			throw new Error('Failed to fetch calendar data');
		}

		const data: LeetCodeCalendarResponse = await response.json();
		const submissionCalendar: { [key: string]: number } = JSON.parse(
			data.data.matchedUser.userCalendar.submissionCalendar
		);

		const dates: Date[] = [];
		Object.entries(submissionCalendar).forEach(([timestamp, problemCount]) => {
			const date = new Date(parseInt(timestamp) * 1000);
			// Repeat the date 'problemCount' times
			for (let i = 0; i < problemCount; i++) {
				dates.push(date);
			}
		});

		return NextResponse.json({ dates, year });
	} catch (error) {
		console.error('Error fetching calendar data:', error);
		return NextResponse.json({ error: 'Failed to fetch calendar data' }, { status: 500 });
	}
}

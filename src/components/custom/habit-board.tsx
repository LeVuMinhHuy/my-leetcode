import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export interface HabitBoardProps {
	dates: Date[];
	year: number;
}

const getProblemCountMap = (dates: Date[]): Map<string, number> => {
	const problemCount = new Map<string, number>();
	dates.forEach((date) => {
		const dateStr = `${String(date.getDate()).padStart(2, '0')}-${String(
			date.getMonth() + 1
		).padStart(2, '0')}-${date.getFullYear()}`; // DD-MM-YYYY
		problemCount.set(dateStr, (problemCount.get(dateStr) || 0) + 1);
	});
	return problemCount;
};

const getColorClass = (count: number): string => {
	if (count === 0) return 'bg-gray-100'; // No problem
	if (count === 1) return 'bg-orange-100'; // Very light orange
	if (count === 2) return 'bg-orange-200'; // Light orange
	if (count === 3) return 'bg-orange-300'; // Soft orange
	if (count === 4) return 'bg-orange-400'; // Medium orange
	if (count === 5) return 'bg-orange-500'; // Strong orange
	if (count === 6) return 'bg-orange-600'; // Darker orange
	return 'bg-orange-700'; // Deep orange for 7+ problems
};

// Format date as DD-MM-YYYY for display
const formatDateStr = (date: Date): string => {
	return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(
		2,
		'0'
	)}-${date.getFullYear()}`;
};

// Get days in a month and group by weeks, starting Monday
const getMonthWeeks = (month: number, year: number) => {
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	const firstDay = new Date(year, month, 1).getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
	const weeks: (Date | null)[][] = [];
	let currentWeek: (Date | null)[] = [];

	// Add placeholders for days before the first Monday
	const startOffset = firstDay === 0 ? 6 : firstDay - 1; // Shift to start on Monday
	for (let i = 0; i < startOffset; i++) {
		currentWeek.push(null);
	}

	// Fill in the days
	for (let day = 1; day <= daysInMonth; day++) {
		const date = new Date(year, month, day);
		currentWeek.push(date);
		if (currentWeek.length === 7) {
			weeks.push([...currentWeek]);
			currentWeek = [];
		}
	}

	// Pad the last week with nulls if incomplete
	if (currentWeek.length > 0) {
		while (currentWeek.length < 7) {
			currentWeek.push(null);
		}
		weeks.push([...currentWeek]);
	}

	return weeks;
};

// HabitBoard component
const HabitBoard: React.FC<HabitBoardProps> = ({ dates, year }) => {
	const problemCountMap = getProblemCountMap(dates);
	const months = Array.from({ length: 12 }, (_, i) => i); // 0 = Jan, 11 = Dec

	return (
		<Card className='p-2 md:p-4 w-full overflow-x-auto border-none'>
			<CardContent className='p-0'>
				<TooltipProvider>
					{/* Container with horizontal scroll for mobile */}
					<div className='min-w-[900px] md:min-w-0 flex flex-col gap-4'>
						{/* Boards for each month */}
						<div className='flex gap-6'>
							{months.map((month) => {
								const weeks = getMonthWeeks(month, year);
								return (
									<div key={month} className='flex flex-col items-center'>
										{/* Grid: 7 rows (Mon-Sun), columns = weeks */}
										<div
											className='grid grid-rows-7 gap-y-1 gap-x-4 xs:gap-y-[6px] xs:gap-x-[6px]' // 8px gap for rows and columns
											style={{
												gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))`,
											}}
										>
											{Array.from({ length: 7 }, (_, rowIndex) => (
												<React.Fragment key={rowIndex}>
													{weeks.map((week, weekIndex) => {
														const date = week[rowIndex]; // Row 0 = Mon, Row 6 = Sun
														if (!date) {
															return <div key={weekIndex} className='w-3 h-3' />;
														}
														const dateStr = formatDateStr(date);
														const problemCount = problemCountMap.get(dateStr) || 0;
														const colorClass = getColorClass(problemCount);

														return (
															<Tooltip key={dateStr}>
																<TooltipTrigger>
																	<div
																		className={`w-3 h-3 rounded-sm ${colorClass} cursor-pointer`}
																	/>
																</TooltipTrigger>
																<TooltipContent>
																	<p>
																		{dateStr}: {problemCount}{' '}
																		{problemCount === 1 ? 'problem' : 'problems'}
																	</p>
																</TooltipContent>
															</Tooltip>
														);
													})}
												</React.Fragment>
											))}
										</div>
										{/* Month label below the grid */}
										<div className='text-center text-xs md:text-sm text-muted-foreground mt-2'>
											{new Date(year, month).toLocaleString('default', {
												month: 'short',
											})}
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</TooltipProvider>
			</CardContent>
		</Card>
	);
};

export default HabitBoard;

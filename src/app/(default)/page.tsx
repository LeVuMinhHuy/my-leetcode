import HabitBoard, { HabitBoardProps } from '@/components/custom/habit-board';

async function getHabits(): Promise<HabitBoardProps> {
	// Determine the base URL based on the environment
	const isDev = process.env.NODE_ENV === 'development';
	const apiUrl = isDev ? 'http://localhost:303/api/habit' : 'https://tedcode.vercel.app/api/habit';

	const response = await fetch(apiUrl, { cache: 'no-store' });
	if (!response.ok) {
		throw new Error('Failed to fetch habits');
	}
	return response.json();
}

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	//const search = searchParamsCache.parse(await searchParams);
	//const data = await fetchProblem();
	//const filterFields = getFilterFields(data);
	//const habits = data
	//	.filter((d) => d.date && (d.status === Status.DONE || d.status === Status.WIP))
	//	.map((d) => new Date(d.date as string));

	const { dates: dateStrings, year, streak, totalActiveDays } = await getHabits();
	// Convert date strings back to Date objects
	const dates = dateStrings.map((dateStr) => new Date(dateStr));
	console.log({ streak, totalActiveDays });

	return (
		<div className='flex flex-col gap-8 w-full'>
			<HabitBoard dates={dates} year={year} streak={streak} totalActiveDays={totalActiveDays} />

			{/*
			<React.Suspense fallback={<Skeleton />}>
				<DataTable
					columns={columns}
					data={data}
					filterFields={filterFields}
					defaultColumnFilters={Object.entries(search)
						.map(([key, value]) => ({
							id: key,
							value,
						}))
						.filter(({ value }) => value ?? undefined)}
				/>
			</React.Suspense>
      */}
		</div>
	);
}

import HabitBoard from '@/components/custom/habit-board';
import { columns } from './columns';
import { DataTable } from './data-table';
import { searchParamsCache } from './search-params';
import { Skeleton } from './skeleton';

import { fetchProblem } from '@/services/fetchProblem';
import { getFilterFields } from '@/services/getFilterFields';
import * as React from 'react';
import { Status } from '@/constants/problem-model';

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const search = searchParamsCache.parse(await searchParams);
	const data = await fetchProblem();
	const filterFields = getFilterFields(data);
	const habits = data
		.filter((d) => d.date && (d.status === Status.DONE || d.status === Status.WIP))
		.map((d) => new Date(d.date as string));

	return (
		<div className='flex flex-col gap-8 w-full'>
			<HabitBoard dates={habits} year={2025} />

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
		</div>
	);
}

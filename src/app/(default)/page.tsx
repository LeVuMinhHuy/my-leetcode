import { fetchRatingData } from '@/services/fetchRatingData';
import { columns } from './columns';
import { DataTable } from './data-table';
import { searchParamsCache } from './search-params';
import { Skeleton } from './skeleton';

import { getFilterFields } from '@/services/getFilterFields';
import * as React from 'react';

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const search = searchParamsCache.parse(await searchParams);
	const data = await fetchRatingData();
	const filterFields = getFilterFields(data);

	return (
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
	);
}

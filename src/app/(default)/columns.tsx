'use client';

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { isArrayOfNumbers } from '@/lib/is-array';
import type { ColumnDef } from '@tanstack/react-table';
import type { ColumnSchema } from './schema';

export const columns: ColumnDef<ColumnSchema>[] = [
	{
		accessorKey: 'id',
		header: 'Id',
		enableHiding: false,
	},
	{
		accessorKey: 'rating',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Rating' />,
		cell: ({ row }) => {
			const value = row.getValue('rating') as number;

			return (
				<div>
					<span className='font-mono'>{`${value.toFixed(2)}`}</span>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			const rowValue = row.getValue(id) as number;
			if (typeof value === 'number') return value === Number(rowValue);
			if (Array.isArray(value) && isArrayOfNumbers(value)) {
				if (value.length === 1) {
					return value[0] === rowValue;
				} else {
					const sorted = value.sort((a, b) => a - b);
					return sorted[0] <= rowValue && rowValue <= sorted[1];
				}
			}
			return false;
		},
	},
	{
		accessorKey: 'title',
		header: 'Title',
		cell: ({ row }) => {
			const slug = row.original.titleSlug as string;
			const title = row.getValue('title') as string;
			const href = 'https://leetcode.com/problems/' + slug;
			return (
				<a
					className='text-blue-500 visited:text-purple-500 hover:text-pink-500'
					href={href}
					target={'_blank'}
				>
					{title}
				</a>
			);
		},
		filterFn: (row, id, value) => {
			const rowValue = row.getValue(id);
			return value === String(rowValue);
		},
	},

	//{
	//	accessorKey: 'tags',
	//	header: 'Tags',
	//	cell: ({ row }) => {
	//		const value = row.getValue('tags') as string | string[];
	//		if (Array.isArray(value)) {
	//			return (
	//				<div className='flex flex-wrap gap-1'>
	//					{value.map((v) => (
	//						<Badge key={v} className={tagsColor[v].badge}>
	//							{v}
	//						</Badge>
	//					))}
	//				</div>
	//			);
	//		}
	//		return <Badge className={tagsColor[value]?.badge}>{value}</Badge>;
	//	},
	//	filterFn: (row, id, value) => {
	//		const array = row.getValue(id) as string[];
	//		if (typeof value === 'string') return array.includes(value);
	//		// up to the user to define either `.some` or `.every`
	//		if (Array.isArray(value)) return value.some((i) => array.includes(i));
	//		return false;
	//	},
	//},
	{
		accessorKey: 'contestTitle',
		header: 'Contest',
		cell: ({ row }) => {
			const slug = row.original.contestSlug as string;
			const title = row.getValue('contestTitle') as string;
			const href = 'https://leetcode.com/contest/' + slug;
			return (
				<a className='visited:text-purple-500 hover:text-pink-500' href={href} target={'_blank'}>
					{title}
				</a>
			);
		},
		filterFn: (row, id, value) => {
			const rowValue = row.getValue(id);
			return value === String(rowValue);
		},
	},
	{
		accessorKey: 'problemIndex',
		header: 'Problem',
		cell: ({ row }) => {
			const value = row.getValue('problemIndex') as string;
			return (
				<div>
					<span className='font-mono'>{value}</span>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			const rowValue = row.getValue(id);
			return value === String(rowValue);
		},
	},
	//{
	//	accessorKey: 'date',
	//	header: ({ column }) => <DataTableColumnHeader column={column} title='Date' />,
	//	cell: ({ row }) => {
	//		const value = row.getValue('date');
	//		if (value) {
	//			return (
	//				<div className='text-xs text-muted-foreground' suppressHydrationWarning>
	//					{format(new Date(`${value}`), 'LLL dd, y HH:mm')}
	//				</div>
	//			);
	//		}
	//	},
	//	filterFn: (row, id, value) => {
	//		const rowValue = row.getValue(id);
	//		if (value instanceof Date && rowValue instanceof Date) {
	//			return isSameDay(value, rowValue);
	//		}
	//		if (Array.isArray(value)) {
	//			if (isArrayOfDates(value) && rowValue instanceof Date) {
	//				const sorted = value.sort((a, b) => a.getTime() - b.getTime());
	//				// TODO: check length
	//				return (
	//					sorted[0]?.getTime() <= rowValue.getTime() && rowValue.getTime() <= sorted[1]?.getTime()
	//				);
	//			}
	//		}
	//		return false;
	//	},
	//},
];

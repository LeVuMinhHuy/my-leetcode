import { type ColumnSchema } from '@/app/(default)/schema';
import { DataTableFilterField } from '@/components/data-table/types';
import { Status } from '@/constants/problem-model';

export const getFilterFields = (data: ColumnSchema[]): DataTableFilterField<ColumnSchema>[] => {
	const filterFields = [
		{
			label: 'Id',
			value: 'id',
			type: 'input',
			options: data.map(({ id }) => ({ label: `${id}`, value: id })),
			defaultOpen: true,
		},
		{
			label: 'Title',
			value: 'title',
			type: 'input',
			options: data.map(({ title }) => ({ label: title, value: title })),
			defaultOpen: true,
		},
		{
			label: 'Rating',
			value: 'rating',
			type: 'slider',
			min: 0,
			max: 3000,
			options: data.map(({ rating }) => ({ label: `${rating}`, value: rating })),
			defaultOpen: true,
		},
		{
			label: 'Status',
			value: 'status',
			type: 'checkbox',
			options: Object.values(Status).map((status) => ({ label: `${status}`, value: status })),
			defaultOpen: true,
		},
		{
			label: 'Time Range',
			value: 'date',
			type: 'timerange',
			defaultOpen: true,
			commandDisabled: true,
		},
		//{
		//	label: 'Tags',
		//	value: 'tags',
		//	type: 'checkbox',
		//	defaultOpen: true,
		//	// REMINDER: "use client" needs to be declared in the file - otherwise getting serialization error from Server Component
		//	component: (props: Option) => {
		//		if (typeof props.value === 'boolean') return null;
		//		if (typeof props.value === 'undefined') return null;
		//		return (
		//			<div className='flex w-full items-center justify-between gap-2'>
		//				<span className='truncate font-normal'>{props.value}</span>
		//				<span className={cn('h-2 w-2 rounded-full', tagsColor[props.value].dot)} />
		//			</div>
		//		);
		//	},
		//	options: TAGS.map((tag) => ({ label: tag, value: tag })),
		//},
	] satisfies DataTableFilterField<ColumnSchema>[];

	return filterFields;
};

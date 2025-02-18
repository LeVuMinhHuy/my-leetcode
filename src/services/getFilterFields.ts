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
		//	label: 'Topics',
		//	value: 'topics',
		//	type: 'input',
		//	defaultOpen: true,
		//	options: data.map(({ topics }) => ({
		//		label: topics?.join(', ') || '',
		//		value: topics?.join(', ') || '',
		//	})),
		//},
	] satisfies DataTableFilterField<ColumnSchema>[];

	return filterFields;
};

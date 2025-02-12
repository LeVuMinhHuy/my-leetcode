'use client';

import type { DataTableFilterField } from '@/components/data-table/types';
import { type ColumnSchema } from './schema';

export const tagsColor = {
	api: {
		badge: 'text-[#10b981] bg-[#10b981]/10 border-[#10b981]/20 hover:bg-[#10b981]/10',
		dot: 'bg-[#10b981]',
	},
	web: {
		badge: 'text-[#0ea5e9] bg-[#0ea5e9]/10 border-[#0ea5e9]/20 hover:bg-[#0ea5e9]/10',
		dot: 'bg-[#0ea5e9]',
	},
	enterprise: {
		badge: 'text-[#ec4899] bg-[#ec4899]/10 border-[#ec4899]/20 hover:bg-[#ec4899]/10',
		dot: 'bg-[#ec4899]',
	},
	app: {
		badge: 'text-[#f97316] bg-[#f97316]/10 border-[#f97316]/20 hover:bg-[#f97316]/10',
		dot: 'bg-[#f97316]',
	},
} as Record<string, Record<'badge' | 'dot', string>>;

export const filterFields = [
	//{
	//	label: 'Time Range',
	//	value: 'date',
	//	type: 'timerange',
	//	defaultOpen: true,
	//	commandDisabled: true,
	//},
	{
		label: 'Title',
		value: 'title',
		type: 'input',
		//options: data.map(({ url }) => ({ label: url, value: url })),
	},
	{
		label: 'Rating',
		value: 'rating',
		type: 'slider',
		min: 0,
		max: 3000,
		//options: data.map(({ p95 }) => ({ label: `${p95}`, value: p95 })),
		defaultOpen: true,
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

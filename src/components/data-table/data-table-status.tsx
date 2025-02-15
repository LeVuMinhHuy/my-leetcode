'use client';

import { statusColor } from '@/app/(default)/constants';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Status } from '@/constants/problem-model';
import { cn } from '@/lib/utils';
import { updateProblem } from '@/services/updateProblem';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export function DataTableStatus({ id, value }: { id: number; value: Status }) {
	const router = useRouter();

	const onChangeStatus = useCallback(async (status: Status) => {
		await updateProblem(id, { status });
		router.refresh();
	}, []);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				{value === Status.TODO ? (
					<div className={cn('w-4 h-4 rounded-full cursor-pointer ml-4')} />
				) : (
					<div
						className={cn('w-2 h-2 rounded-full cursor-pointer ml-4', statusColor[value]?.dot)}
					/>
				)}
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				<DropdownMenuLabel>Update status</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					{Object.values(Status).map((status) => (
						<DropdownMenuCheckboxItem
							key={status}
							checked={status === value}
							onClick={() => onChangeStatus(status)}
							className={statusColor[status]?.color}
						>
							{status}
						</DropdownMenuCheckboxItem>
					))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

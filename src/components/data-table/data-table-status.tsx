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
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

export function DataTableStatus({ id, value }: { id: number; value: Status }) {
	const [currentStatus, setCurrentStatus] = useState(value);

	const onChangeStatus = useCallback(
		async (status: Status) => {
			setCurrentStatus(status);
			const res = await updateProblem(id, { status });

			if (res) {
				toast.success('Status updated');
			} else {
				setCurrentStatus(value);
				toast.error('Failed to update status');
			}
		},
		[currentStatus]
	);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				{currentStatus === Status.TODO ? (
					<div className={cn('w-4 h-4 rounded-full cursor-pointer ml-4')} />
				) : (
					<div
						className={cn(
							'w-2 h-2 rounded-full cursor-pointer ml-4',
							statusColor[currentStatus]?.dot
						)}
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
							checked={status === currentStatus}
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

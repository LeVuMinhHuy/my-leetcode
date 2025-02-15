'use client';

import { updateProblem } from '@/services/updateProblem';
import { Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export function DataTableFavorite({ id, favorite }: { id: number; favorite: boolean }) {
	const router = useRouter();

	const onChangeFavorite = useCallback(async () => {
		await updateProblem(id, { favorite: !favorite }, false);
		router.refresh();
	}, [favorite]);

	return (
		<Star
			size={16}
			className={`ml-6 cursor-pointer transition-colors ${
				favorite ? 'fill-yellow-500 text-yellow-500' : 'fill-none text-gray-400'
			}`}
			onClick={onChangeFavorite}
		/>
	);
}

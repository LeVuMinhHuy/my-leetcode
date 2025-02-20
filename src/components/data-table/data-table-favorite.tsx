'use client';

import { updateProblem } from '@/services/updateProblem';
import { Star } from 'lucide-react';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

export function DataTableFavorite({ id, favorite }: { id: string; favorite: boolean }) {
	const [fav, setFav] = useState(favorite);

	const onChangeFavorite = useCallback(async () => {
		setFav(!fav);
		const res = await updateProblem(id, { favorite: !fav }, false);

		if (res) {
			toast.success('Knowledge updated');
		} else {
			setFav(fav);
			toast.error('Failed to update knowledge');
		}
	}, [fav]);

	return (
		<Star
			size={16}
			className={`ml-6 cursor-pointer transition-colors ${
				fav ? 'fill-yellow-500 text-yellow-500' : 'fill-none text-gray-400'
			}`}
			onClick={onChangeFavorite}
		/>
	);
}

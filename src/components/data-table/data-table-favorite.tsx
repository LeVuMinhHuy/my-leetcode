'use client';

import { updateProblem } from '@/services/updateProblem';
import { Star } from 'lucide-react';
import { useCallback, useState } from 'react';

export function DataTableFavorite({ id, favorite }: { id: number; favorite: boolean }) {
	const [fav, setFav] = useState(favorite);

	const onChangeFavorite = useCallback(() => {
		updateProblem(id, { favorite: !fav }, false);
		setFav(!fav);
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

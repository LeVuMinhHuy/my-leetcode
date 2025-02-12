import { ZEROTRACK_RATINGS_DATA } from '@/constants/data-source';
import { processRatingData } from './processRatingData';
import { ColumnSchema } from '@/app/(default)/schema';

export const fetchRatingData = async (): Promise<ColumnSchema[]> => {
	try {
		const response = await fetch(ZEROTRACK_RATINGS_DATA);
		const text = await response.text();
		return processRatingData(text);
	} catch (error) {
		console.error(error);
		return [];
	}
};

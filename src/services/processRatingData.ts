import { ColumnSchema } from '@/app/(default)/schema';
import { SLUG_DELIMITER } from '@/lib/delimiters';

export const processRatingData = (data: string): ColumnSchema[] => {
	return data
		.trim()
		.split('\n')
		.map((line) => {
			const [rating, id, title, _titleZH, titleSlug, contestSlug, problemIndex] = line.split('\t');
			return {
				rating: parseFloat(rating),
				id: parseInt(id),
				title,
				titleSlug,
				contestSlug,
				contestTitle: contestSlug
					.split(SLUG_DELIMITER)
					.map((s) => s.charAt(0).toUpperCase() + s.slice(1))
					.join(' '),
				problemIndex,
			};
		})
		.filter((entry) => !isNaN(entry.id) && !isNaN(entry.rating)) satisfies ColumnSchema[];
};

import { type ColumnSchema } from '@/app/(default)/schema';
import { IProblem } from '@/constants/problem-model';
import { SLUG_DELIMITER } from '@/lib/delimiters';

export const processRatingData = (data: string): ColumnSchema[] => {
	const updatedData = data
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

	// shuffle the data
	for (let i = updatedData.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[updatedData[i], updatedData[j]] = [updatedData[j], updatedData[i]];
	}

	return updatedData;
};

export const processDatabaseData = (data: IProblem[]): ColumnSchema[] => {
	return data.map((entry) => ({
		rating: entry.rating,
		id: entry.id,
		title: entry.title,
		titleSlug: entry.titleSlug,
		contestSlug: entry.contestSlug,
		contestTitle: entry.contestTitle,
		problemIndex: entry.problemIndex,
		status: entry.status,
		date: entry.date,
		tags: entry.tags,
		favorite: entry.favorite,
	}));
};

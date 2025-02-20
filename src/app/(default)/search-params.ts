import {
	createParser,
	createSearchParamsCache,
	parseAsArrayOf,
	parseAsInteger,
	parseAsString,
	parseAsStringLiteral,
	parseAsTimestamp,
} from 'nuqs/server';
// Note: import from 'nuqs/server' to avoid the "use client" directive
import { Status } from '@/constants/problem-model';
import { ARRAY_DELIMITER, RANGE_DELIMITER, SLIDER_DELIMITER } from '@/lib/delimiters';

export const parseAsSort = createParser({
	parse(queryValue) {
		const [id, desc] = queryValue.split('.');
		if (!id && !desc) return null;
		return { id, desc: desc === 'desc' };
	},
	serialize(value) {
		return `${value.id}.${value.desc ? 'desc' : 'asc'}`;
	},
});

export const searchParamsParser = {
	// FILTERS
	title: parseAsString,
	id: parseAsString,
	rating: parseAsArrayOf(parseAsInteger, SLIDER_DELIMITER),
	status: parseAsArrayOf(parseAsStringLiteral(Object.values(Status)), ARRAY_DELIMITER),
	date: parseAsArrayOf(parseAsTimestamp, RANGE_DELIMITER),
};

export const searchParamsCache = createSearchParamsCache(searchParamsParser);

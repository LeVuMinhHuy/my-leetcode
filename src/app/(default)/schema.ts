import { TAGS } from '@/constants/tag';
import { ARRAY_DELIMITER, RANGE_DELIMITER } from '@/lib/delimiters';
import { z } from 'zod';

//const stringToBoolean = z
//	.string()
//	.toLowerCase()
//	.transform((val) => {
//		try {
//			return JSON.parse(val);
//		} catch (e) {
//			console.log(e);
//			return undefined;
//		}
//	})
//	.pipe(z.boolean().optional());

export const columnSchema = z.object({
	id: z.number(),
	rating: z.number(),
	title: z.string(),
	titleSlug: z.string().optional(),
	contestSlug: z.string().optional(),
	contestTitle: z.string(),
	problemIndex: z.string(),
	tags: z.string().optional(),
	date: z.string().optional(),
});

export type ColumnSchema = z.infer<typeof columnSchema>;

export const columnFilterSchema = z.object({
	id: z.number().optional(),
	rating: z.number().optional(),
	title: z.string().optional(),
	titleSlug: z.string().optional(),
	contestSlug: z.string().optional(),
	contestTitle: z.string().optional(),
	tags: z
		.string()
		.transform((val) => val.split(ARRAY_DELIMITER))
		.pipe(z.enum(TAGS).array())
		.optional(),
	date: z
		.string()
		.transform((val) => val.split(RANGE_DELIMITER).map(Number))
		.pipe(z.coerce.date().array())
		.optional(),
});

export type ColumnFilterSchema = z.infer<typeof columnFilterSchema>;

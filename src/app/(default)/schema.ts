import { TAGS } from '@/constants/tag';
import { ARRAY_DELIMITER, RANGE_DELIMITER } from '@/lib/delimiters';
import { z } from 'zod';

export const columnSchema = z.object({
	id: z.number(),
	rating: z.number(),
	title: z.string(),
	titleSlug: z.string().optional(),
	contestSlug: z.string().optional(),
	contestTitle: z.string(),
	problemIndex: z.string(),
	tags: z.array(z.string()).optional(),
	date: z.string().optional(),
	favorite: z.boolean().optional(),
	attempts: z.number().optional(),
	status: z.string().optional(),
	likes: z.number().optional(),
	dislikes: z.number().optional(),
	likeRatio: z.number().optional(),
	topics: z.array(z.string()).optional(),
	difficulty: z.string().optional(),
	accepted: z.number().optional(),
	submissions: z.number().optional(),
	acceptRate: z.number().optional(),
	free: z.boolean().optional(),
	solution: z.boolean().optional(),
	videoSolution: z.boolean().optional(),
	category: z.string().optional(),
	llmPrompt: z.string().optional(),
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
	favorite: z.boolean().optional(),
	attempts: z.number().optional(),
	status: z.string().optional(),
	likes: z.number().optional(),
	dislikes: z.number().optional(),
	likeRatio: z.number().optional(),
	topics: z.array(z.string()).optional(),
	difficulty: z.string().optional(),
	accepted: z.number().optional(),
	submissions: z.number().optional(),
	acceptRate: z.number().optional(),
	free: z.boolean().optional(),
	solution: z.boolean().optional(),
	videoSolution: z.boolean().optional(),
	category: z.string().optional(),
});

export type ColumnFilterSchema = z.infer<typeof columnFilterSchema>;

import { IProblem } from '@/constants/problem-model';

export const updateProblem = async (
	id: string,
	updates: Partial<IProblem>,
	updateDate: boolean = true
): Promise<boolean> => {
	const res = await fetch('/api/problem', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			id,
			...(updateDate && { date: new Date() }),
			...updates,
		}),
	});

	return res.ok;
};

import { IProblem } from '@/constants/problem-model';

export const updateProblem = async (
	id: number,
	updates: Partial<IProblem>,
	updateDate: boolean = true
): Promise<boolean> => {
	const res = await fetch('/api/problem', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			id,
			...(updateDate && { date: new Date().toISOString().split('T')[0] }),
			...updates,
		}),
	});

	return res.ok;
};

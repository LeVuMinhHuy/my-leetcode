import { IProblem } from '@/constants/problem-model';

export const updateProblem = async (id: number, updates: Partial<IProblem>): Promise<boolean> => {
	const res = await fetch('/api/problem', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ id, ...updates }),
	});

	return res.ok;
};

'use client';

export const topicsColor = {} as Record<string, Record<'badge' | 'dot', string>>;

export const statusColor = {
	done: {
		badge: 'text-[#10b981] bg-[#10b981]/10 border-[#10b981]/20 hover:bg-[#10b981]/10',
		dot: 'bg-[#10b981]',
		color: 'text-[#10b981]',
	},
	todo: {
		badge: 'text-[#0ea5e9] bg-[#0ea5e9]/10 border-[#0ea5e9]/20 hover:bg-[#0ea5e9]/10',
		dot: 'bg-[#0ea5e9]',
		color: 'text-[#0ea5e9]',
	},
	wip: {
		badge: 'text-[#ec4899] bg-[#ec4899]/10 border-[#ec4899]/20 hover:bg-[#ec4899]/10',
		dot: 'bg-[#ec4899]',
		color: 'text-[#ec4899]',
	},
} as Record<string, Record<'badge' | 'dot' | 'color', string>>;

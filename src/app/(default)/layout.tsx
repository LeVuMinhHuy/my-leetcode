import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { SocialsFooter } from '@/components/layout/socials-footer';
import { Link } from '@/components/custom/link';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<main className='container mx-auto flex min-h-screen flex-col gap-4 p-4 sm:p-16'>
				<div className='flex flex-col gap-4 sm:gap-8 w-full max-w-7xl mx-auto relative min-h-full h-full rounded-lg border border-border/50 bg-background/50 p-4 backdrop-blur-[2px] sm:p-8'>
					<div className='grid gap-1'>
						<h1 className='text-3xl font-semibold text-foreground pt-4 pb-4'>
							Ted&apos;s Leetcode Board
						</h1>
						<h2 className='text-lg text-muted-foreground mb-2'>
							Do Leetcode with Elo ranking strategy
						</h2>
						<h3 className='text-md text-muted-foreground'>
							shoutout to <Link href='https://www.youtube.com/@jamesperaltaSWE'>James Peralta</Link>
							, <Link href='https://github.com/zerotrac/leetcode_problem_rating'>zerotrack</Link>,{' '}
							<Link href='https://github.com/openstatusHQ/data-table-filters'>openstatus</Link>,{' '}
							<Link href='https://ui.shadcn.com'>shadcn ui</Link>,{' '}
							<Link href='https://tanstack.com/table'>tanstack table</Link>
						</h3>
					</div>
					<Separator />
					{children}
					<Badge
						variant='outline'
						className='absolute -top-2.5 pt-1 left-4 bg-background sm:left-8'
					>
						Try hard mode: &nbsp;<span className='text-green-600 font-semibold'>On</span>
					</Badge>
				</div>
				<SocialsFooter />
			</main>
		</>
	);
}

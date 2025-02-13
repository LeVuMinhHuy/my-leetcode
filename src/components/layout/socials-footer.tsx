import { ModeToggle } from '@/components/theme/toggle-mode';
import { Button } from '@/components/ui/button';
import { Github, Globe, Instagram } from 'lucide-react';
import { Link } from '../custom/link';

export function SocialsFooter() {
	return (
		<div className='flex flex-col gap-1'>
			<div className='flex justify-center items-center gap-2 p-1'>
				<ModeToggle className='[&>svg]:h-4 [&>svg]:w-4' />
				<Button variant='ghost' size='sm' className='w-9 px-0' asChild>
					<Link href='https://github.com/LeVuMinhHuy/my-leetcode'>
						<Github className='h-4 w-4' />
					</Link>
				</Button>
				<Button variant='ghost' size='sm' className='w-9 px-0' asChild>
					<Link href='https://www.instagram.com/mh.hmmm/'>
						<Instagram className='h-4 w-4' />
					</Link>
				</Button>
				<Button variant='ghost' size='sm' className='w-9 px-0' asChild>
					<Link href='https://tedvu.me'>
						<Globe className='h-4 w-4' />
					</Link>
				</Button>
			</div>
		</div>
	);
}

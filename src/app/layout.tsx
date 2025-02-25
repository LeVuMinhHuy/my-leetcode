import { ThemeProvider } from '@/components/theme/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
});

const TITLE = "Ted's Leetcode board";
const DESCRIPTION = 'Do Leetcode by elo ranking';

export const metadata: Metadata = {
	metadataBase: new URL('https://tedcode.vercel.app'),
	title: TITLE,
	description: DESCRIPTION,
	twitter: {
		images: ['/assets/table.png'],
		card: 'summary_large_image',
		title: TITLE,
		description: DESCRIPTION,
	},
	openGraph: {
		type: 'website',
		images: ['/assets/table.png'],
		title: TITLE,
		description: DESCRIPTION,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
				<NuqsAdapter>
					<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
						{children}
						<Toaster richColors />
					</ThemeProvider>
				</NuqsAdapter>

				<SpeedInsights />
				<Analytics />
			</body>
		</html>
	);
}

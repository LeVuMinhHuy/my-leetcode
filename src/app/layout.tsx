import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import { ThemeProvider } from '@/components/theme/theme-provider';
import PlausibleProvider from 'next-plausible';
import { ReactQueryProvider } from '@/providers/react-query';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Toaster } from '@/components/ui/sonner';

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
});

const TITLE = "Ted's Leetcode board";
const DESCRIPTION = 'Do Leetcode by elo ranking';

export const metadata: Metadata = {
	metadataBase: new URL('https://tedvu.me'),
	title: TITLE,
	description: DESCRIPTION,
	twitter: {
		images: ['/assets/data-table-infinite.png'],
		card: 'summary_large_image',
		title: TITLE,
		description: DESCRIPTION,
	},
	openGraph: {
		type: 'website',
		images: ['/assets/data-table-infinite.png'],
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
				<PlausibleProvider domain='data-table.openstatus.dev'>
					<ReactQueryProvider>
						<NuqsAdapter>
							<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
								{children}
								<Toaster richColors />
							</ThemeProvider>
						</NuqsAdapter>
					</ReactQueryProvider>
				</PlausibleProvider>
			</body>
		</html>
	);
}

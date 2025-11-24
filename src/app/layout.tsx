import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { DockComponent } from "@/components/DockComponent";

export const metadata: Metadata = {
    title: "Oliver Dave's Portfolio",
    description: "Web and Game Development Portfolio of Oliver Dave",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <div className="pointer-events-none fixed inset-x-0 top-0 z-50">
                <ScrollProgress />
            </div>
            <div className="relative flex min-h-screen flex-col pb-28">
                {children}
            </div>
            <div className="fixed inset-x-0 bottom-10 z-50">
                <DockComponent />
            </div>
        </ThemeProvider>
        </body>
        </html>
    );
}

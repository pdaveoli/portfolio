import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ScrollProgressGate } from "@/components/ScrollProgressGate";
import { DockComponent } from "@/components/DockComponent";
import Footer from "@/components/Footer";
import {Metadata} from "next";
import ClickSpark from "@/components/ClickSpark";
export const metadata : Metadata = {
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


                <ScrollProgressGate />

            <div className="relative flex min-h-screen flex-col pb-28">
                {children}
            </div>
            <div className="fixed inset-x-0 bottom-10 z-50">
                <DockComponent />
            </div>
            <Footer />
        </ThemeProvider>
        </body>
        </html>
    );
}

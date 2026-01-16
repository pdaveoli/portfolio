import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ScrollProgressGate } from "@/components/ScrollProgressGate";
import { DockComponent } from "@/components/DockComponent";
import Footer from "@/components/Footer";
import {Metadata} from "next";
export const metadata: Metadata = {
    title: {
        default: "Oliver Dave – Developer",
        template: "%s | Oliver Dave",
    },
    description:
        "Student Developer focused on web apps, games, and thoughtful design. Projects, experiments, and writing.",
    metadataBase: new URL("https://oliverdave.dev"),
    openGraph: {
        title: "Oliver Dave",
        description:
            "Student Developer focused on web apps, games, and thoughtful design.",
        url: "https://oliverdave.dev",
        siteName: "Oliver Dave",
        images: [
            {
                url: "/og.png",
                width: 1200,
                height: 630,
                alt: "Oliver Dave portfolio",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Oliver Dave",
        description:
            "Student Developer focused on web apps, games, and thoughtful design.",
        images: ["/og.png"],
    },
    icons: {
        icon: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning className="scroll-smooth">
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

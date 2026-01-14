import type { Metadata } from "next";
import { Rubik_Mono_One, Caveat } from "next/font/google";
import "./globals.css";

const rubikMono = Rubik_Mono_One({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-rubik-mono",
});

const caveat = Caveat({
    weight: ["400", "600", "700"],
    subsets: ["latin"],
    variable: "--font-caveat",
});

export const metadata: Metadata = {
    title: "PARTYNEXTDOOR - Album Cover Generator",
    description: "PARTYNEXTDOOR - Album Cover",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
            </head>
            <body
                className={`${rubikMono.variable} ${caveat.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}

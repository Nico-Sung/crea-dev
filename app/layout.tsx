import type { Metadata } from "next";
import "./globals.css";

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
            <body>
                <div className="noise-overlay" />
                {children}
            </body>
        </html>
    );
}

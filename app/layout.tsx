import type { Metadata } from "next";
import "./globals.css";
import NoiseOverlay from "./components/NoiseOverlay";
import LoadingScreen from "./components/LoadingScreen";
import { LoadingProvider } from "./context/LoadingContext";

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
                <LoadingProvider>
                    <LoadingScreen />
                    <NoiseOverlay opacity={0.015} />
                    {children}
                </LoadingProvider>
            </body>
        </html>
    );
}

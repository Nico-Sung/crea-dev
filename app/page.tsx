import Hero from "./components/Hero";
import Discography from "./components/Discography";
import CoverGenerator from "./components/CoverGenerator";

export default function Home() {
    return (
        <main>
            <Hero />
            <Discography />
            <CoverGenerator />
        </main>
    );
}

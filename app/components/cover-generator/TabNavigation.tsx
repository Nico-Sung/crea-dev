import type { TabType } from "../../types/coverGenerator";

interface TabNavigationProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
}

export const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
    return (
        <div className="flex border-b border-white/10 mb-8">
            <button
                onClick={() => onTabChange("gen")}
                className={`flex-1 pb-3 font-space-mono text-xs uppercase tracking-wider border-b-2 transition-colors ${
                    activeTab === "gen"
                        ? "text-white border-white"
                        : "text-[var(--text-muted)] border-transparent hover:text-white"
                }`}
            >
                Génératif
            </button>
            <button
                onClick={() => onTabChange("content")}
                className={`flex-1 pb-3 font-space-mono text-xs uppercase tracking-wider border-b-2 transition-colors ${
                    activeTab === "content"
                        ? "text-white border-white"
                        : "text-[var(--text-muted)] border-transparent hover:text-white"
                }`}
            >
                Contenu
            </button>
        </div>
    );
};

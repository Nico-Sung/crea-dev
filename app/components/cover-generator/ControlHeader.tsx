interface ControlHeaderProps {
    onRandomize: () => void;
    onExport: () => void;
}

export const ControlHeader = ({ onRandomize, onExport }: ControlHeaderProps) => {
    return (
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_10px_white]" />
                <span className="font-space-mono text-xs text-[var(--text-muted)] uppercase tracking-wider">
                    Flow Lines
                </span>
            </div>
            <div className="flex gap-2">
                <button
                    onClick={onRandomize}
                    className="font-dm text-xs tracking-wider hover:text-white text-[var(--text-muted)] transition-colors uppercase border border-white/20 px-3 py-1.5 hover:border-white"
                >
                    Regénérer
                </button>
                <button
                    onClick={onExport}
                    className="font-dm bg-white text-[var(--bg-deep)] px-4 py-1.5 text-xs tracking-wider hover:bg-[var(--text-primary)] transition-colors uppercase"
                >
                    Exporter
                </button>
            </div>
        </div>
    );
};

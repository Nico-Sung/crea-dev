interface ToastProps {
    message: string | null;
}

export const Toast = ({ message }: ToastProps) => {
    return (
        <div
            className={`fixed bottom-10 right-10 bg-white text-[var(--bg-deep)] px-6 py-4 shadow-xl z-50 flex items-center gap-3 transition-all duration-300 ${
                message
                    ? "translate-y-0 opacity-100"
                    : "translate-y-20 opacity-0"
            }`}
        >
            <div className="w-2 h-2 bg-[var(--bg-deep)] rounded-full animate-bounce" />
            <span className="font-dm text-sm uppercase tracking-wider">
                {message}
            </span>
        </div>
    );
};

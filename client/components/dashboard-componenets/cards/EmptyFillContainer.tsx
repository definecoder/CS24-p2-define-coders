export default function EmptyFillContainer({children, className = ""}: {children: React.ReactNode, className?: string}) {
    return (
        <div className={"rounded-xl border bg-card text-card-foreground shadow w-full h-full p-4 " + className}>{children}</div>
    );

}
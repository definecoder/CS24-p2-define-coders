export default function EmptyFillContainer({children}: {children: React.ReactNode}) {
    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow w-full h-full p-4">{children}</div>
    );

}
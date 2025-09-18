interface SectionProps {
    children: React.ReactNode;
    backgroundColor?: 'bg-white' | 'bg-primary';
    fullHeight?: boolean;
}

export default function Section({
    children,
    backgroundColor = "bg-white",
    fullHeight = false
}: SectionProps) {
    const heightClass = fullHeight ? 'min-h-screen' : '';
    
    return (
        <section className={`container mx-auto px-4 py-15 ${backgroundColor} ${heightClass}`}>
            {children}
        </section>
    );
}
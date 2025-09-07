interface SectionProps {
    children: React.ReactNode;
    backgroundColor?: 'bg-white' | 'bg-primary';
}

export default function Section({
    children,
    backgroundColor = "bg-white"
}: SectionProps) {
    return (
        <section className={`container mx-auto px-4 py-15 ${backgroundColor}`}>
            {children}
        </section>
    );
}
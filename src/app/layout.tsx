import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Header, Footer, FloatingButton } from "../components";
import "../styles/globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "VoxDem - Transparência e dados para fortalecer a democracia",
  description: "Visualize dados que incluem pesquisas sobre satisfação democrática, tolerância política, comportamento eleitoral, cultura política e legitimidade institucional, com abrangência nacional.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${montserrat.variable} antialiased`}
      >
        <Header />
        <main>
          {children}
        </main>
        <Footer />
        <FloatingButton 
          href="https://forms.gle/jDkEj9AXRNNVuAzZ9"
          text="Pesquisa"
        />
      </body>
    </html>
  );
}

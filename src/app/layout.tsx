import type { Metadata } from "next";
import { Bricolage_Grotesque, Work_Sans } from "next/font/google";
import { ReservationProvider } from "@/components/reservation/provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const body = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Brew & Co | Neighbourhood coffee in Crown Heights, Brooklyn",
    template: "%s | Brew & Co",
  },
  description:
    "Specialty coffee, fresh pastries and light lunches on Franklin Avenue, Brooklyn. Open mic every Friday, coffee tastings every Saturday.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <ReservationProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </ReservationProvider>
      </body>
    </html>
  );
}

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getSiteSettings } from "@/lib/queries";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <>
      <Header settings={settings} />
      <main className="main-content">
        {children}
      </main>
      <Footer settings={settings} />
      <WhatsAppButton settings={settings} />
    </>
  );
}

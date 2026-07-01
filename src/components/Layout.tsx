import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CursorTrail } from "./CursorTrail";
import { GlobalBackHome } from "./GlobalBackHome";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FDFAF5] flex flex-col font-sans">
      <CursorTrail />
      <Navbar />
      <GlobalBackHome />
      <main className="grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}

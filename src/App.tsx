import { useState } from 'react';
import { AnimatePresence } from "framer-motion";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { ImproverModule } from "./components/improver/ImproverModule";
import { SupportModule } from "./components/support/SupportModule";

export default function App() {
  const [activeModule, setActiveModule] = useState<'improver' | 'support'>('improver');

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-[#1a1a1a] font-sans pb-12 selection:bg-[#00FF66] selection:text-black" dir="rtl">
      
      <Header activeModule={activeModule} setActiveModule={setActiveModule} />

      <main className="max-w-6xl mx-auto w-full px-4 mt-4">
        <AnimatePresence mode="wait">
          {activeModule === 'improver' ? (
            <ImproverModule key="improver" />
          ) : (
            <SupportModule key="support" />
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

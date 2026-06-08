import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ImproverModule } from './components/improver/ImproverModule';
import { SupportModule } from './components/support/SupportModule';
import { LoginPage } from './pages/LoginPage';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const [activeModule, setActiveModule] = useState<'improver' | 'support'>('improver');
  const { user, isLoading, login, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setActiveModule('improver');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center" dir="rtl">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <div className="w-16 h-16 border-4 border-[#e5e7eb] border-t-[#00FF66] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#666] font-medium">جاري التحميل...</p>
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage onLoginSuccess={login} />;
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-[#1a1a1a] font-sans pb-12 selection:bg-[#00FF66] selection:text-black" dir="rtl">
      <Header activeModule={activeModule} setActiveModule={setActiveModule} user={user} onLogout={handleLogout} />

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
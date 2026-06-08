import { motion } from 'framer-motion';
import { LogOut, User } from 'lucide-react';

interface HeaderProps {
  activeModule: 'improver' | 'support';
  setActiveModule: (module: 'improver' | 'support') => void;
  user?: any;
  onLogout?: () => void;
}

export function Header({ activeModule, setActiveModule, user, onLogout }: HeaderProps) {
  return (
    <motion.header
      className="bg-white shadow-md sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      dir="rtl"
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
          <div className="w-10 h-10 bg-gradient-to-br from-[#00FF66] to-[#00CC52] rounded-lg flex items-center justify-center">
            <span className="text-lg font-bold text-black">📱</span>
          </div>
          <h1 className="text-2xl font-bold text-[#1a1a1a] hidden sm:block">Social Post Pro</h1>
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center gap-4">
          <motion.button
            onClick={() => setActiveModule('improver')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              activeModule === 'improver'
                ? 'bg-[#00FF66] text-black shadow-lg'
                : 'text-[#666] hover:text-[#1a1a1a]'
            }`}
            whileHover={{ scale: 1.05 }}
          >
            تحسين المنشورات
          </motion.button>

          <motion.button
            onClick={() => setActiveModule('support')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              activeModule === 'support'
                ? 'bg-[#00FF66] text-black shadow-lg'
                : 'text-[#666] hover:text-[#1a1a1a]'
            }`}
            whileHover={{ scale: 1.05 }}
          >
            الدعم
          </motion.button>

          {/* User Info */}
          {user && (
            <motion.div
              className="flex items-center gap-3 border-r border-[#e5e7eb] pr-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-[#00FF66]" />
                <span className="text-sm font-medium text-[#666] hidden sm:block">{user.name}</span>
              </div>
              <motion.button
                onClick={onLogout}
                className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
                whileHover={{ scale: 1.1 }}
                title="تسجيل الخروج"
              >
                <LogOut className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.header>
  );
}
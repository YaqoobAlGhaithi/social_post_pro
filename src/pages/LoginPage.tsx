import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (user: { email: string; name: string }) => void;
}

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim()) {
      setError('البريد الإلكتروني مطلوب');
      return;
    }

    if (!validateEmail(email)) {
      setError('البريد الإلكتروني غير صحيح');
      return;
    }

    if (!password || password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }

    if (isSignUp && !name.trim()) {
      setError('الاسم مطلوب');
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const userData = {
        email,
        name: isSignUp ? name : email.split('@')[0],
        token: `token_${Date.now()}`,
        loginTime: new Date().toISOString()
      };

      localStorage.setItem('user', JSON.stringify(userData));
      setSuccess(isSignUp ? 'تم إنشاء الحساب بنجاح!' : 'تم تسجيل الدخول بنجاح!');
      
      setTimeout(() => {
        onLoginSuccess(userData);
      }, 500);
    } catch (err) {
      setError('حدث خطأ أثناء التسجيل. حاول مجدداً.');
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f3f4f6] to-[#e5e7eb] flex items-center justify-center p-4" dir="rtl">
      <motion.div className="w-full max-w-md" variants={containerVariants} initial="hidden" animate="visible">
        {/* Header */}
        <motion.div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#00FF66] to-[#00CC52] rounded-2xl mb-4 shadow-lg">
            <span className="text-2xl font-bold text-black">📱</span>
          </div>
          <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2">Social Post Pro</h1>
          <p className="text-[#666] text-sm">{isSignUp ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}</p>
        </motion.div>

        {/* Form Card */}
        <motion.form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8" whileHover={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}>
          {/* Success Message */}
          {success && (
            <motion.div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl flex items-start gap-2" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-green-700 text-sm">{success}</p>
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </motion.div>
          )}

          {/* Name Field */}
          {isSignUp && (
            <motion.div className="mb-4" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
              <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">الاسم الكامل</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="أدخل اسمك الكامل" className="w-full px-4 py-3 border-2 border-[#e5e7eb] rounded-xl focus:outline-none focus:border-[#00FF66] transition-colors bg-[#f9fafb]" />
            </motion.div>
          )}

          {/* Email Field */}
          <motion.div className="mb-4" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: isSignUp ? 0.1 : 0 }}>
            <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">البريد الإلكتروني</label>
            <div className="relative">
              <Mail className="absolute right-3 top-3.5 w-5 h-5 text-[#999]" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@gmail.com" className="w-full pl-4 pr-10 py-3 border-2 border-[#e5e7eb] rounded-xl focus:outline-none focus:border-[#00FF66] transition-colors bg-[#f9fafb]" />
            </div>
          </motion.div>

          {/* Password Field */}
          <motion.div className="mb-6" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: isSignUp ? 0.2 : 0.1 }}>
            <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">كلمة المرور</label>
            <div className="relative">
              <Lock className="absolute right-3 top-3.5 w-5 h-5 text-[#999]" />
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-10 pr-10 py-3 border-2 border-[#e5e7eb] rounded-xl focus:outline-none focus:border-[#00FF66] transition-colors bg-[#f9fafb]" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-3 top-3.5 text-[#666] hover:text-[#1a1a1a]">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.button type="submit" disabled={isLoading} className="w-full py-3 bg-gradient-to-r from-[#00FF66] to-[#00CC52] text-black font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            {isLoading ? <span className="flex items-center justify-center gap-2"><div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />جاري...</span> : isSignUp ? 'إنشاء حساب' : 'تسجيل الدخول'}
          </motion.button>

          {/* Toggle Auth Mode */}
          <motion.div className="mt-6 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <p className="text-[#666] text-sm">
              {isSignUp ? 'لديك حساب؟ ' : 'ليس لديك حساب؟ '}
              <button type="button" onClick={() => { setIsSignUp(!isSignUp); setError(''); setSuccess(''); }} className="text-[#00FF66] font-semibold hover:text-[#00CC52]">
                {isSignUp ? 'تسجيل الدخول' : 'إنشاء حساب'}
              </button>
            </p>
          </motion.div>
        </motion.form>

        {/* Demo Info */}
        <motion.div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <p className="text-xs text-blue-700 mb-2 font-semibold">🔓 بيانات اختبار:</p>
          <p className="text-xs text-blue-600">البريد: demo@example.com</p>
          <p className="text-xs text-blue-600">كلمة المرور: 123456</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
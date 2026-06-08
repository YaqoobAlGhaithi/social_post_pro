import { useState } from 'react';
import { motion } from "framer-motion";
import { Phone, Mail, Github, ExternalLink, ChevronLeft, Info, FileText, ShieldCheck } from "lucide-react";

export const ContactHub = () => {
  const [aboutSectionOpen, setAboutSectionOpen] = useState<'info' | 'terms' | 'privacy' | null>(null);

  return (
    <motion.div
      key="hub"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="space-y-4"
    >
      <div className="brutal-card rounded-2xl p-6 bg-white space-y-6">
        <div>
          <h3 className="text-lg font-black text-gray-800">بطاقة الاتصال الفوري بقنوات المطور</h3>
          <p className="text-xs text-gray-500">اختر المنصة التي تناسبك للتوجيه التلقائي الآمن وبدء محادثة الدعم المباشرة مع المهندس يعقوب الغيثي.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a href="tel:+967771142060" className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] group">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                <Phone className="w-4 h-4" />
              </div>
              <div className="text-right">
                <p className="text-[9px] text-gray-500 font-bold">هاتف / اتصال مباشر</p>
                <p className="text-xs font-black font-mono text-gray-800" dir="ltr">+967 771142060</p>
              </div>
            </div>
            <ChevronLeft className="w-4 h-4 text-orange-500 group-hover:-translate-x-1 transition-transform" />
          </a>

          <a href="https://wa.me/967771142060" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 hover:bg-green-50 transition-all border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] group">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.022-.08-.115-.135-.354-.254-.24-.12-1.417-.7-1.629-.778-.21-.078-.36-.118-.515.117-.156.233-.6.779-.737.934-.135.154-.269.173-.51.054-.24-.12-.997-.367-1.9-1.172-.704-.627-1.18-1.402-1.318-1.642-.138-.24-.015-.369.106-.488.11-.107.24-.279.36-.419.12-.14.16-.239.24-.399.08-.16.04-.3-.02-.42-.06-.12-.515-1.24-.705-1.7-.186-.447-.364-.384-.515-.391-.131-.007-.28-.009-.43-.009-.15 0-.395.056-.602.28-.206.224-.788.77-0.788 1.875s.8 2.17 1.1 2.57c.3.4 1.579 2.41 3.824 3.38.536.23 1.05.367 1.412.482.538.171 1.028.147 1.416.09.43-.064 1.325-.54 1.512-1.04.187-.5.187-.928.131-1.04-.056-.11-.207-.179-.447-.298zM12 2C6.48 2 2 6.48 2 12c0 2.17.7 4.21 2 5.87L3 22l4.31-1.13C8.89 21.3 10.41 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.65 0-3.19-.49-4.51-1.34l-.32-.2-2.58.68.69-2.51-.22-.35C4.21 15.02 3.7 13.56 3.7 12c0-4.58 3.72-8.3 8.3-8.3 4.58 0 8.3 3.72 8.3 8.3 0 4.58-3.72 8.3-8.3 8.3z"/>
                </svg>
              </div>
              <div className="text-right">
                <p className="text-[9px] text-gray-500 font-bold">دعم واتساب الفوري</p>
                <p className="text-xs font-black font-mono text-gray-800" dir="ltr">+967 771142060</p>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-500 transition-colors" />
          </a>

          <a href="mailto:yqwbalghythy69@gmail.com" className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] group">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                <Mail className="w-4 h-4" />
              </div>
              <div className="text-right">
                <p className="text-[9px] text-gray-500 font-bold">بريد إلكتروني رسمي</p>
                <p className="text-xs font-black font-mono text-gray-800 break-all">yqwbalghythy69@gmail.com</p>
              </div>
            </div>
            <ChevronLeft className="w-4 h-4 text-orange-500 group-hover:-translate-x-1 transition-transform" />
          </a>

          <a href="https://github.com/YaqoubAlGhaithi" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] group">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700">
                <Github className="w-4 h-4" />
              </div>
              <div className="text-right">
                <p className="text-[9px] text-gray-500 font-bold">حساب GitHub المطور</p>
                <p className="text-xs font-black font-mono text-gray-800">YaqoubAlGhaithi</p>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-orange-500 transition-colors" />
          </a>
        </div>

        <div className="pt-4 border-t-2 border-dashed border-gray-200 space-y-3">
          <div className="border-2 border-black rounded-xl overflow-hidden bg-white">
            <button onClick={() => setAboutSectionOpen(aboutSectionOpen === 'info' ? null : 'info')} className="w-full text-right p-3.5 flex justify-between items-center text-xs font-black text-gray-800 hover:bg-gray-50 transition-colors">
              <span className="flex items-center gap-2"><Info className="w-4.5 h-4.5 text-orange-500" /> معلومات الخدمة والتطبيق</span>
              <ChevronLeft className={`w-4 h-4 text-orange-500 transition-transform ${aboutSectionOpen === 'info' ? '-rotate-90' : ''}`} />
            </button>
            {aboutSectionOpen === 'info' && (
              <div className="p-4 border-t-2 border-black bg-gray-50 text-xs font-bold leading-relaxed text-gray-600">
                منصة <strong className="text-orange-600 font-display">POST PRO</strong> هي طفرة متقدمة تهدف لأرشفة ذكاء المحتوى العربي وتوظيف الذكاء الاصطناعي التوليدي عبر منصة مصممة بشكل حصري وهالة إبداعية للمبرمج يعقوب الغيثي. يقدم التعديل المتناهي للمنشورات، الترجمة وصناعة الصور الفنية المعبرة.
              </div>
            )}
          </div>

          <div className="border-2 border-black rounded-xl overflow-hidden bg-white">
            <button onClick={() => setAboutSectionOpen(aboutSectionOpen === 'terms' ? null : 'terms')} className="w-full text-right p-3.5 flex justify-between items-center text-xs font-black text-gray-800 hover:bg-gray-50 transition-colors">
              <span className="flex items-center gap-2"><FileText className="w-4.5 h-4.5 text-orange-500" /> الشروط والأحكام</span>
              <ChevronLeft className={`w-4 h-4 text-orange-500 transition-transform ${aboutSectionOpen === 'terms' ? '-rotate-90' : ''}`} />
            </button>
            {aboutSectionOpen === 'terms' && (
              <div className="p-4 border-t-2 border-black bg-gray-50 text-xs font-bold leading-relaxed text-gray-600 space-y-1.5">
                <p>• استخدام المنصة متاح للأغراض الفانتاستيكية والقانونية ولا يُسمح باستخدام الذكاء الاصطناعي لتوليد محتوى ضار أو مسيء.</p>
                <p>• تعود ملكية الرسوم والمحسنات التي يصدرها التطبيق لاستخدامك الشخصي والتجاري المحدود.</p>
              </div>
            )}
          </div>

          <div className="border-2 border-black rounded-xl overflow-hidden bg-white">
            <button onClick={() => setAboutSectionOpen(aboutSectionOpen === 'privacy' ? null : 'privacy')} className="w-full text-right p-3.5 flex justify-between items-center text-xs font-black text-gray-800 hover:bg-gray-50 transition-colors">
              <span className="flex items-center gap-2"><ShieldCheck className="w-4.5 h-4.5 text-orange-500" /> سياسة الخصوصية</span>
              <ChevronLeft className={`w-4 h-4 text-orange-500 transition-transform ${aboutSectionOpen === 'privacy' ? '-rotate-90' : ''}`} />
            </button>
            {aboutSectionOpen === 'privacy' && (
              <div className="p-4 border-t-2 border-black bg-gray-50 text-xs font-bold leading-relaxed text-gray-600">
                نحن في POST PRO نولي أهمية قصوى لخصوصيتك. لا يتم تخزين نصوصك أو صورك المولدة في قواعد بياناتنا الدائمة؛ كل العمليات تتم لحظياً لضمان أعلى مستويات الأمان والسرية.
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Search, HelpCircle, ChevronLeft } from "lucide-react";
import { FAQ_DATA } from "../../data/faqData";

export const FaqSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFAQ, setSelectedFAQ] = useState<number | null>(null);

  const filteredFAQs = FAQ_DATA.filter(faq => 
    faq.q.includes(searchQuery) || 
    faq.a.includes(searchQuery)
  );

  return (
    <motion.div
      key="help"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="space-y-4"
    >
      <div className="brutal-card rounded-2xl p-6 bg-white space-y-6">
        <div className="relative">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن سؤالك هنا..."
            className="w-full pr-12 pl-4 py-3.5 bg-gray-50 border-2 border-black rounded-xl text-xs font-bold focus:ring-0 focus:border-orange-500 transition-all"
          />
        </div>

        <div className="space-y-3">
          {filteredFAQs.map((faq, idx) => (
            <div key={idx} className="border-2 border-black rounded-xl overflow-hidden bg-white shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              <button
                onClick={() => setSelectedFAQ(selectedFAQ === idx ? null : idx)}
                className="w-full text-right p-4 flex justify-between items-center text-xs font-black text-gray-800 hover:bg-gray-50 transition-colors"
              >
                <span className="flex items-center gap-3">
                  <HelpCircle className="w-4 h-4 text-orange-500" />
                  {faq.q}
                </span>
                <ChevronLeft className={`w-4 h-4 text-orange-500 transition-transform ${selectedFAQ === idx ? '-rotate-90' : ''}`} />
              </button>
              <AnimatePresence>
                {selectedFAQ === idx && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden border-t-2 border-black bg-orange-50"
                  >
                    <div className="p-4 text-xs font-bold leading-relaxed text-gray-700">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          {filteredFAQs.length === 0 && (
            <div className="text-center py-12 text-gray-400 font-bold text-xs">
              عذراً، لم نجد نتائج مطابقة لبحثك.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

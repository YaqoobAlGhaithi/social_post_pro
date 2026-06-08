import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { SupportSidebar } from "./SupportSidebar";
import { ContactHub } from "./ContactHub";
import { FaqSection } from "./FaqSection";
import { ChatBot } from "./ChatBot";

export const SupportModule = () => {
  const [helpTab, setHelpTab] = useState<'hub' | 'help' | 'chat'>('hub');

  return (
    <motion.div
      key="support-module"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.25 }}
      className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
    >
      <SupportSidebar helpTab={helpTab} setHelpTab={setHelpTab} />

      <div className="md:col-span-8">
        <AnimatePresence mode="wait">
          {helpTab === 'hub' && <ContactHub />}
          {helpTab === 'help' && <FaqSection />}
          {helpTab === 'chat' && <ChatBot />}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

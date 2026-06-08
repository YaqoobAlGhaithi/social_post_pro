import { Send, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useSupportChat } from "../../hooks/useSupportChat";

export const ChatBot = () => {
  const {
    chatMessages,
    inputMessage,
    setInputMessage,
    isTyping,
    handleSendMessage
  } = useSupportChat();

  return (
    <motion.div
      key="chat"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="brutal-card rounded-2xl p-0 bg-white overflow-hidden flex flex-col h-[500px]"
    >
      <div className="bg-black p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#00FF66] flex items-center justify-center">
            <span className="text-black text-[10px] font-black">AI</span>
          </div>
          <div>
            <p className="text-xs font-black">مساعد POST PRO الذكي</p>
            <p className="text-[9px] text-[#00FF66] font-bold">متصل الآن ومستعد للمساعدة</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {chatMessages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-xs font-bold shadow-sm border-2 ${
              msg.sender === 'user' 
                ? 'bg-white border-black text-gray-800 rounded-tr-none' 
                : 'bg-black border-black text-white rounded-tl-none'
            }`}>
              <p>{msg.text}</p>
              <p className={`text-[8px] mt-1 opacity-50 ${msg.sender === 'user' ? 'text-left' : 'text-right'}`}>{msg.time}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-end">
            <div className="bg-black text-white p-3 rounded-2xl rounded-tl-none border-2 border-black flex items-center gap-2">
              <Loader2 className="w-3 h-3 animate-spin" />
              <span className="text-[10px] font-bold">جاري التفكير...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t-2 border-black flex gap-2">
        <input 
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="اكتب استفسارك هنا..."
          className="flex-1 bg-gray-50 border-2 border-black rounded-xl px-4 py-2 text-xs font-bold focus:ring-0 focus:border-[#00FF66] transition-all"
        />
        <button 
          onClick={handleSendMessage}
          className="w-10 h-10 bg-[#00FF66] border-2 border-black rounded-xl flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
        >
          <Send className="w-4 h-4 text-black" />
        </button>
      </div>
    </motion.div>
  );
};

import { useState } from 'react';

export interface Message {
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

export const useSupportChat = () => {
  const [chatMessages, setChatMessages] = useState<Message[]>([
    { sender: 'ai', text: "مرحبًا بك في مركز دعم POST PRO الذكي. كيف يمكنني مساعدتك اليوم؟", time: "الآن" }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    const userMsg = inputMessage;
    const timeNow = new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
    
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg, time: timeNow }]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      let aiReply = "شكرًا لتواصلك معنا! لقد تم تسجيل استفسارك وسيقوم المطور يعقوب الغيثي بمراجعته والرد عليك قريباً.";
      const lowerMsg = userMsg.toLowerCase();
      
      if (lowerMsg.includes('بوت') || lowerMsg.includes('ذكاء') || lowerMsg.includes('ai')) {
        aiReply = "تطبيق POST PRO يعتمد على نماذج Gemini المتقدمة من جوجل لصياغة وتحليل النصوص وتوليد مرئيات متكاملة بجودة فائقة بنقرة زر واحدة.";
      } else if (lowerMsg.includes('رقم') || lowerMsg.includes('تواصل') || lowerMsg.includes('اتصال') || lowerMsg.includes('واتس')) {
        aiReply = "يمكنك الاتصال بالمطور يعقوب مباشرة عبر الرقم 967771142060+ أو النقر على زر واتساب للانتقال فورا وتلقي دعم مباشر.";
      } else if (lowerMsg.includes('مطور') || lowerMsg.includes('صاحب') || lowerMsg.includes('يعقوب')) {
        aiReply = "مطور هذا التطبيق الرائع هو المبرمج يعقوب الغيثي، مطور ويب متكامل (Full-Stack Developer) متخصص في تكنولوجيا الذكاء الاصطناعي وحلول السحاب.";
      }

      setChatMessages(prev => [...prev, { sender: 'ai', text: aiReply, time: "الآن" }]);
      setIsTyping(false);
    }, 1200);
  };

  return {
    chatMessages,
    inputMessage,
    setInputMessage,
    isTyping,
    handleSendMessage
  };
};

import { ChevronLeft, Check } from "lucide-react";

interface SupportSidebarProps {
  helpTab: 'hub' | 'help' | 'chat';
  setHelpTab: (tab: 'hub' | 'help' | 'chat') => void;
}

export const SupportSidebar = ({ helpTab, setHelpTab }: SupportSidebarProps) => {
  return (
    <div className="md:col-span-4 space-y-4">
      <div className="brutal-card rounded-2xl p-4 bg-white space-y-2">
        <h3 className="text-xs font-black uppercase text-gray-500 tracking-wider mb-2">
          📱 أقسام الدعم الفني
        </h3>
        
        {[
          { id: 'hub', label: 'بطاقة الاتصال بالمطور 👤' },
          { id: 'help', label: 'الأسئلة الشائعة ❓' },
          { id: 'chat', label: 'مساعد ودردشة الدعم 💬' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setHelpTab(tab.id as any)}
            className={`w-full text-right p-3 rounded-lg text-xs font-bold border-2 transition-all flex items-center justify-between ${
              helpTab === tab.id
                ? 'bg-black text-[#00FF66] border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200'
            }`}
          >
            <span>{tab.label}</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        ))}
      </div>

      <div className="brutal-card rounded-2xl bg-[#0F1015] text-white p-4 flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-[#00FF66]/10 rounded-full blur-2xl poiner-events-none" />
        
        <div className="relative mb-3">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#00FF66] to-[#00fc60] rounded-full blur-sm opacity-60 animate-pulse" />
          <div className="w-20 h-20 rounded-full p-1 bg-[#00FF66] relative z-10 shadow-xl">
            <img 
              src="https://avatars.githubusercontent.com/u/102377508?v=4" 
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200";
              }}
              className="w-full h-full object-cover rounded-full"
              alt="Yaqoub AlGhaithi Avatar"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="absolute bottom-0 right-1 bg-[#00FF66] rounded-full p-1 border-2 border-[#0F1015]">
            <Check className="w-2.5 h-2.5 text-black stroke-[3]" />
          </span>
        </div>

        <h2 className="text-sm font-bold text-white tracking-wide">
          يعقوب الغيثي | Yaqoub AlGhaithi
        </h2>
        <span className="text-[10px] text-[#00FF66] font-medium font-mono mt-1 px-2 py-0.5 rounded bg-[#00FF66]/5 border border-[#00FF66]/20">
          Full-Stack Software Engineer
        </span>

        <div className="w-full border-t border-white/5 my-3" />
        <p className="text-[11px] text-gray-400 leading-relaxed">
          متخصص في هندسة وتطوير الويب المتكامل وبناء وصيانة منظومات الذكاء الاصطناعي التوليدي والويب المشرق.
        </p>
      </div>
    </div>
  );
};

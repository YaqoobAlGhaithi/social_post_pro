import { Sparkle, Sparkles, MessageSquare } from "lucide-react";

interface HeaderProps {
  activeModule: 'improver' | 'support';
  setActiveModule: (module: 'improver' | 'support') => void;
}

export const Header = ({ activeModule, setActiveModule }: HeaderProps) => {
  return (
    <>
      <div className="h-2 bg-gradient-to-r from-[#00FF66] via-orange-500 to-[#00fc60]" />
      <header className="max-w-6xl mx-auto w-full px-4 pt-8 pb-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-black border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_#00FF66] shrink-0">
            <Sparkle className="w-7 h-7 text-[#00FF66]" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight font-display flex items-center gap-2">
              POST <span className="text-[#00FF66] text-stroke">PRO</span>
            </h1>
            <p className="text-xs font-bold text-gray-600 mt-0.5">
              النسخة الاحترافية: تحسين، ترجمة، وتوليد صور بذكاء اصطناعي فائق.
            </p>
          </div>
        </div>

        <div className="flex gap-2 p-1 bg-white border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] rounded-xl shrink-0">
          <button
            onClick={() => setActiveModule('improver')}
            className={`px-4 py-2 text-xs font-bold transition-all rounded-lg flex items-center gap-1.5 ${
              activeModule === 'improver'
                ? 'bg-[#00FF66] text-black border-2 border-black shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]'
                : 'text-gray-600 hover:text-black hover:bg-gray-100'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>تحسين المنشورات ✨</span>
          </button>
          
          <button
            onClick={() => setActiveModule('support')}
            className={`px-4 py-2 text-xs font-bold transition-all rounded-lg flex items-center gap-1.5 ${
              activeModule === 'support'
                ? 'bg-orange-400 text-black border-2 border-black shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]'
                : 'text-gray-600 hover:text-black hover:bg-gray-100'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>الدعم ومساعدة المطور 💬</span>
          </button>
        </div>
      </header>
    </>
  );
};

import { Sparkles, Loader2 } from "lucide-react";
import { Platform, Tone, Lang } from "../../hooks/useImprover";

interface ImproverFormProps {
  platform: Platform;
  setPlatform: (p: Platform) => void;
  tone: Tone;
  setTone: (t: Tone) => void;
  lang: Lang;
  setLang: (l: Lang) => void;
  inputText: string;
  setInputText: (t: string) => void;
  isImproving: boolean;
  handleImprovePost: () => void;
}

export const ImproverForm = ({
  platform, setPlatform,
  tone, setTone,
  lang, setLang,
  inputText, setInputText,
  isImproving,
  handleImprovePost
}: ImproverFormProps) => {
  return (
    <div className="lg:col-span-5 space-y-6">
      <div className="brutal-card rounded-2xl">
        <div className="space-y-3">
          <label className="text-xs font-black text-gray-800 block uppercase tracking-wider">
            📱 المنصة المستهدفة
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'instagram', label: 'إنستغرام 📸' },
              { id: 'linkedin', label: 'لينكد إن 💼' },
              { id: 'twitter', label: 'إكس / تويتر 🐦' },
              { id: 'facebook', label: 'فيسبوك 👥' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setPlatform(item.id as Platform)}
                className={`p-2.5 text-xs font-bold rounded-lg text-center border-2 transition-all ${
                  platform === item.id
                    ? 'bg-black text-[#00FF66] border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] scale-[1.02]'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-black'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t-2 border-dashed border-gray-200 my-4" />

        <div className="space-y-3">
          <label className="text-xs font-black text-gray-800 block uppercase tracking-wider">
            🗣️ نبرة الصوت
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'professional', label: '💼 احترافي' },
              { id: 'funny', label: '😂 مرح' },
              { id: 'inspiring', label: '✨ ملهم' },
              { id: 'formal', label: '🏨 رسمي' },
              { id: 'marketing', label: '🚀 تسويقي' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setTone(item.id as Tone)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg border-2 transition-all ${
                  tone === item.id
                    ? 'bg-[#00FF66] text-black border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-black'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t-2 border-dashed border-gray-200 my-4" />

        <div className="space-y-3">
          <label className="text-xs font-black text-gray-800 block uppercase tracking-wider">
            🌐 لغة المخرجات
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'ar', label: 'العربية 🇸🇦' },
              { id: 'en', label: 'English 🇺🇸' },
              { id: 'fr', label: 'Français 🇫🇷' },
              { id: 'ar_en', label: 'عربي + English 🔗' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setLang(item.id as Lang)}
                className={`p-2 text-[10px] font-black rounded-lg border-2 transition-all ${
                  lang === item.id
                    ? 'bg-black text-[#00FF66] border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-black'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <label className="text-xs font-black text-gray-800 block uppercase tracking-wider">
            ✍️ اكتب مسودة منشورك هنا
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="مثلاً: أريد كتابة منشور عن افتتاح مطعمي الجديد المتخصص في البرجر..."
            className="w-full h-40 p-4 bg-gray-50 border-2 border-black rounded-xl text-sm font-bold focus:ring-0 focus:border-[#00FF66] transition-all resize-none shadow-inner"
          />
          <button
            onClick={handleImprovePost}
            disabled={isImproving || !inputText.trim()}
            className="w-full py-4 bg-black text-[#00FF66] rounded-xl font-black text-sm border-2 border-black shadow-[4px_4px_0px_#00FF66] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isImproving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                جاري التحليل والتحسين...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                تحسين المنشور الآن ✨
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

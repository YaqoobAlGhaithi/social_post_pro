import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Image, Loader2, RefreshCw, Sparkle } from "lucide-react";

interface ImproverResultProps {
  improvedText: string;
  isCopied: boolean;
  handleCopyText: () => void;
  generatedImage: string;
  isGeneratingImage: boolean;
  handleGenerateImage: () => void;
  warningMessage: string;
}

export const ImproverResult = ({
  improvedText,
  isCopied,
  handleCopyText,
  generatedImage,
  isGeneratingImage,
  handleGenerateImage,
  warningMessage
}: ImproverResultProps) => {
  return (
    <div className="lg:col-span-7 space-y-6">
      <AnimatePresence mode="wait">
        {!improvedText ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full min-h-[400px] border-4 border-dashed border-gray-300 rounded-3xl flex flex-col items-center justify-center p-8 text-center bg-gray-50/50"
          >
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <Sparkle className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-black text-gray-400">بانتظار إبداعك...</h3>
            <p className="text-xs font-bold text-gray-400 mt-2 max-w-xs">
              أدخل نص المنشور في الجهة المقابلة وسيقوم الذكاء الاصطناعي بتحويله إلى تحفة تسويقية.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="brutal-card rounded-2xl bg-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#00FF66]" />
              <div className="flex justify-between items-center mb-4">
                <span className="px-3 py-1 bg-[#00FF66] text-black text-[10px] font-black rounded-full border border-black uppercase tracking-tighter">
                  النتيجة المحسنة ✨
                </span>
                <button
                  onClick={handleCopyText}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2 text-xs font-bold"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-green-600">تم النسخ!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-gray-500" />
                      <span>نسخ النص</span>
                    </>
                  )}
                </button>
              </div>
              <div className="text-sm font-bold text-gray-800 leading-relaxed whitespace-pre-wrap bg-gray-50 p-4 rounded-xl border-2 border-black/5 min-h-[150px]">
                {improvedText}
              </div>
              
              <div className="mt-6">
                {!generatedImage ? (
                  <button
                    onClick={handleGenerateImage}
                    disabled={isGeneratingImage}
                    className="w-full py-3 bg-white border-2 border-black rounded-xl font-black text-xs shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all flex items-center justify-center gap-2"
                  >
                    {isGeneratingImage ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        جاري رسم الصورة الفنية...
                      </>
                    ) : (
                      <>
                        <Image className="w-4 h-4" />
                        توليد صورة احترافية للمنشور 🎨
                      </>
                    )}
                  </button>
                ) : (
                  <div className="space-y-4">
                    <div className="relative group rounded-xl overflow-hidden border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                      <img
                        src={generatedImage}
                        alt="AI Generated"
                        className="w-full aspect-square object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <button
                          onClick={handleGenerateImage}
                          className="p-3 bg-white rounded-full hover:scale-110 transition-transform"
                          title="إعادة التوليد"
                        >
                          <RefreshCw className="w-5 h-5 text-black" />
                        </button>
                      </div>
                    </div>
                    {warningMessage && (
                      <p className="text-[10px] font-bold text-orange-600 bg-orange-50 p-2 rounded-lg border border-orange-200">
                        ⚠️ {warningMessage}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

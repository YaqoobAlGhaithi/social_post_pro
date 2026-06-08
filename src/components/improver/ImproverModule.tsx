import { motion } from "framer-motion";
import { ImproverForm } from "./ImproverForm";
import { ImproverResult } from "./ImproverResult";
import { useImprover } from "../../hooks/useImprover";

export const ImproverModule = () => {
  const {
    platform, setPlatform,
    tone, setTone,
    lang, setLang,
    inputText, setInputText,
    improvedText,
    generatedImage,
    isImproving,
    isGeneratingImage,
    isCopied,
    errorLocal, setErrorLocal,
    warningMessage,
    handleImprovePost,
    handleGenerateImage,
    handleCopyText
  } = useImprover();

  return (
    <motion.div
      key="improver-module"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {errorLocal && (
        <div className="bg-red-100 border-2 border-red-500 text-red-700 px-4 py-3 rounded-xl font-bold text-xs shadow-[3px_3px_0px_rgba(0,0,0,0.15)] flex justify-between items-center brutal-border">
          <span>⚠️ {errorLocal}</span>
          <button onClick={() => setErrorLocal('')} className="bg-red-200 hover:bg-red-300 text-red-800 px-2 py-0.5 rounded text-xs">إغلاق</button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <ImproverForm
          platform={platform}
          setPlatform={setPlatform}
          tone={tone}
          setTone={setTone}
          lang={lang}
          setLang={setLang}
          inputText={inputText}
          setInputText={setInputText}
          isImproving={isImproving}
          handleImprovePost={handleImprovePost}
        />
        
        <ImproverResult
          improvedText={improvedText}
          isCopied={isCopied}
          handleCopyText={handleCopyText}
          generatedImage={generatedImage}
          isGeneratingImage={isGeneratingImage}
          handleGenerateImage={handleGenerateImage}
          warningMessage={warningMessage}
        />
      </div>
    </motion.div>
  );
};

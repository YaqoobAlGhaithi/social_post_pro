import { useState } from 'react';
import { improvePost, generateImage } from '../services/gemini';

export type Platform = 'instagram' | 'linkedin' | 'twitter' | 'facebook';
export type Tone = 'professional' | 'funny' | 'inspiring' | 'formal' | 'marketing';
export type Lang = 'ar' | 'en' | 'fr' | 'ar_en';

export const useImprover = () => {
  const [platform, setPlatform] = useState<Platform>('instagram');
  const [tone, setTone] = useState<Tone>('professional');
  const [lang, setLang] = useState<Lang>('ar');
  const [inputText, setInputText] = useState('');
  const [improvedText, setImprovedText] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [isImproving, setIsImproving] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [errorLocal, setErrorLocal] = useState('');
  const [warningMessage, setWarningMessage] = useState('');

  const handleImprovePost = async () => {
    if (!inputText.trim()) return;
    setIsImproving(true);
    setErrorLocal('');
    setWarningMessage('');
    setImprovedText('');
    setGeneratedImage('');

    try {
      const result = await improvePost({
        text: inputText,
        platform,
        tone,
        lang
      });
      setImprovedText(result);
    } catch (err: any) {
      console.error(err);
      setErrorLocal(err.message || 'حدث خطأ أثناء رصد التحسينات بالذكاء الاصطناعي.');
    } finally {
      setIsImproving(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!improvedText) return;
    setIsGeneratingImage(true);
    setErrorLocal('');
    setWarningMessage('');

    try {
      const imageUrl = await generateImage({
        text: improvedText
      });
      setGeneratedImage(imageUrl);
    } catch (err: any) {
      console.error(err);
      // If error message contains "تم استخدام صورة تعبيرية", use fallback and show warning
      if (err.message.includes('تم استخدام صورة تعبيرية')) {
        const fallbackUrl = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80';
        setGeneratedImage(fallbackUrl);
        setWarningMessage('⚠️ تم استخدام صورة تعبيرية مبدعة بسبب قيود حصة توليد الصور');
      } else {
        setErrorLocal(err.message || 'عذراً، فشل توليد الصورة الفنية بالذكاء الاصطناعي.');
      }
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleCopyText = () => {
    if (!improvedText) return;
    navigator.clipboard.writeText(improvedText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return {
    platform, setPlatform,
    tone, setTone,
    lang, setLang,
    inputText, setInputText,
    improvedText, setImprovedText,
    generatedImage, setGeneratedImage,
    isImproving,
    isGeneratingImage,
    isCopied,
    errorLocal, setErrorLocal,
    warningMessage,
    handleImprovePost,
    handleGenerateImage,
    handleCopyText
  };
};

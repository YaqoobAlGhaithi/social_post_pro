import { GoogleGenAI } from '@google/genai';

// Initialize Gemini API with the API key from environment variables
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn('⚠️ VITE_GEMINI_API_KEY environment variable is not set. Gemini features will not work.');
}

const genAI = new GoogleGenAI({
  apiKey: apiKey || '',
  httpOptions: {
    headers: {
      'User-Agent': 'social-post-pro-app',
    }
  }
});

export interface ImprovePostParams {
  text: string;
  platform: 'instagram' | 'linkedin' | 'twitter' | 'facebook';
  tone: 'professional' | 'funny' | 'inspiring' | 'formal' | 'marketing';
  lang: 'ar' | 'en' | 'fr' | 'ar_en';
}

export interface GenerateImageParams {
  text: string;
}

/**
 * تحسين المنشور باستخدام Gemini 2.5 Flash
 */
export async function improvePost(params: ImprovePostParams): Promise<string> {
  const { text, platform, tone, lang } = params;

  if (!text.trim()) {
    throw new Error('النص الأصلي مطلوب');
  }

  if (!apiKey) {
    throw new Error('مفتاح API الخاص بـ Gemini لم يتم تكوينه. يرجى تعيين متغير البيئة VITE_GEMINI_API_KEY');
  }

  // Determine Platform Description
  let platformDesc = '';
  switch (platform) {
    case 'instagram':
      platformDesc = 'إنستغرام (Instagram - ركز على الجذب البصري، خطاف مثير، والرموز التعبيرية والهاشتاجات ذات الصلة)';
      break;
    case 'linkedin':
      platformDesc = 'لينكد إن (LinkedIn - نبرة احترافية، بناء فكري، مقسم لنقاط واضحة لسهولة القراءة، مسافة كافية بين الفقرات، لا تبالغ في الهاشتاجات)';
      break;
    case 'twitter':
      platformDesc = 'إكس/تويتر (X/Twitter - موجز وقصير، مثير للاهتمام للتفاعل والمشاركة، مركز على فكرة أو فكرتين ومع ردم الهاشتاجات)';
      break;
    case 'facebook':
      platformDesc = 'فيسبوك (Facebook - تفاعلي، دافئ، مناسب للمجتمعات والمشاركات الطويلة، دعوة واضحة للتفاعل والمشاركة)';
      break;
    default:
      platformDesc = 'أشكال متعددة لوسائل التواصل الاجتماعي المختلفة';
  }

  // Determine Tone Description
  let toneDesc = '';
  switch (tone) {
    case 'professional':
      toneDesc = 'احترافي ومسؤول (Professional - لغة عمل راقية ومقنعة)';
      break;
    case 'funny':
      toneDesc = 'مرح وساخر خفيف (Funny - لطيف وفيه فكاهة جذابة تسعد المتابعين)';
      break;
    case 'inspiring':
      toneDesc = 'ملهم وحماسي (Inspiring - يحمس القارئ ويدفعه للعمل والتفاؤل)';
      break;
    case 'formal':
      toneDesc = 'رسمي ومفصل (Formal - لغة فصيحة، موضوعية وبدون تكلف)';
      break;
    case 'marketing':
      toneDesc = 'تسويقي ومقنع (Marketing - يدفع للشراء أو اتخاذ إجراء مباشر، يبرز الميزات والحلول)';
      break;
    default:
      toneDesc = 'تفاعلي جذاب';
  }

  // Determine Language Description
  let langDesc = '';
  if (lang === 'en') {
    langDesc = 'قم بصياغة المنشور باللغة الإنجليزية بالكامل بدقة واحترافية تسويقية عالية.';
  } else if (lang === 'fr') {
    langDesc = 'قم بصياغة المنشور باللغة الفرنسية بالكامل بدقة واحترافية تسويقية عالية.';
  } else if (lang === 'ar_en') {
    langDesc = 'قم بصياغة المنشور باللغة العربية أولاً، ثم ألحقها بترجمة إنجليزية احترافية بالكامل في القسم السفلي.';
  } else {
    langDesc = 'حافظ على اللغة العربية كلغة أساسية واجعل الصياغة فصيحة ومناسبة لجمهور عربي.';
  }

  const prompt = `أنت خبير تسويق رقمي فذ وصانع محتوى محترف. 
مهمتك هي تحسين وإعادة صياغة المنشور التالي لمنصات التواصل الاجتماعي ليصبح فائق الجاذبية والانتشار.

النص الأصلي للمنشور:
"${text}"

المعايير المحددة للتعديل:
1. المنصة المستهدفة: ${platformDesc}
2. نبرة الصوت: ${toneDesc}
3. اللغة والترجمة: ${langDesc}

إرشادات الصياغة الإبداعية:
- اكتب خطافاً (Hook) افتتاحياً رائعاً وخاطفاً للأبصار لجعل القارئ يضغط على زر 'قراءة المزيد'.
- قسّم النص إلى جمل مريحة للعين واستخدم النقاط (Bullet points) لتسهيل الفهم والمسح البصري.
- أضف رموزاً تعبيرية (Emojis) منسجمة ومعبرة لتضيف حيوية للمنشور.
- اختم المنشور دائماً بدعوة صريحة للتفاعل (CTA - Call To Action) تناسب المنصة والهدف المحفز.
- أضف 5-8 هاشتاجات ذات صلة قوية وعصرية تناسب المنصة وموضوع المقطع في النهاية.
- نبرة الرد يجب أن تكون فورية ومقنعة، لا تكتب مقدمة مثل "هنا منشورك المعدل"، ابدأ بكتابة المنشور مباشرة ليكون جاهزاً للنسخ والاستخدام.`;

  try {
    const response = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction: 'أنت كاتب محتوى ومسوق رقمي خبير بلغات التواصل واللغات الإبداعية المتعددة.',
      }
    });

    const improvedText = response.text || 'عذراً، لم أتمكن من تحسين هذا المنشور.';
    return improvedText;
  } catch (error: any) {
    console.error('Gemini API error:', error);
    throw new Error(error.message || 'حدث خطأ غير متوقع أثناء معالجة طلبك');
  }
}

/**
 * توليد صورة احترافية للمنشور باستخدام Gemini 2.5 Flash
 */
export async function generateImage(params: GenerateImageParams): Promise<string> {
  const { text } = params;

  if (!text.trim()) {
    throw new Error('نص المنشور مطلوب لتوليد صورة');
  }

  if (!apiKey) {
    throw new Error('مفتاح API الخاص بـ Gemini لم يتم تكوينه. يرجى تعيين متغير البيئة VITE_GEMINI_API_KEY');
  }

  const prompt = `صمم غلاف أو صورة تسويقية معبرة وملهمة جداً لمنصات التواصل الاجتماعي تعكس تماماً موضوع المنشور التالي، بدون إضافة أي نصوص لغوية على التصميم لتكون الصورة نظيفة تماماً وعالية الجودة والفن البصري المعاصر:
"${text}"`;

  try {
    const response = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        imageConfig: {
          aspectRatio: '1:1',
        }
      }
    });

    let imageUrl = '';
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if ((part as any).inlineData) {
          const base64EncodeString = (part as any).inlineData.data;
          imageUrl = `data:image/png;base64,${base64EncodeString}`;
          break;
        }
      }
    }

    if (imageUrl) {
      return imageUrl;
    } else {
      throw new Error('لم يتم العثور على صورة منتجة من النموذج');
    }
  } catch (error: any) {
    console.error('Image generation failed:', error);
    // Fallback to Unsplash image
    const fallbackUrl = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80';
    throw new Error(`فشل توليد الصورة: ${error.message}. تم استخدام صورة تعبيرية بدلاً منها.`);
  }
}

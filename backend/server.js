import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:8100', '*'],
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());

// Initialize Gemini
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('GEMINI_API_KEY is not set in environment variables');
}

const genAI = new GoogleGenerativeAI(apiKey);

// Endpoint لتحسين المنشورات
app.post('/api/improve-post', async (req, res) => {
  try {
    const { text, platform, tone, lang } = req.body;

    if (!text?.trim()) {
      return res.status(400).json({ error: 'النص الأصلي مطلوب' });
    }

    // Platform Description
    const platformDescMap = {
      instagram: 'إنستغرام (Instagram - ركز على الجذب البصري، خطاف مثير، والرموز التعبيرية والهاشتاجات ذات الصلة)',
      linkedin: 'لينكد إن (LinkedIn - نبرة احترافية، بناء فكري، مقسم لنقاط واضحة لسهولة القراءة)',
      twitter: 'إكس/تويتر (X/Twitter - موجز وقصير، مثير للاهتمام للتفاعل)',
      facebook: 'فيسبوك (Facebook - تفاعلي، دافئ، مناسب للمجتمعات)'
    };

    // Tone Description
    const toneDescMap = {
      professional: 'احترافي ومسؤول (Professional - لغة عمل راقية ومقنعة)',
      funny: 'مرح وساخر خفيف (Funny - لطيف وفيه فكاهة جذابة)',
      inspiring: 'ملهم وحماسي (Inspiring - يحمس القارئ)',
      formal: 'رسمي ومفصل (Formal - لغة فصيحة)',
      marketing: 'تسويقي ومقنع (Marketing - يدفع للشراء)'
    };

    // Language Description
    let langDesc = '';
    if (lang === 'en') {
      langDesc = 'قم بصياغة المنشور باللغة الإنجليزية بالكامل';
    } else if (lang === 'fr') {
      langDesc = 'قم بصياغة المنشور باللغة الفرنسية بالكامل';
    } else if (lang === 'ar_en') {
      langDesc = 'قم بصياغة المنشور باللغة العربية أولاً، ثم ألحقها بترجمة إنجليزية';
    } else {
      langDesc = 'حافظ على اللغة العربية كلغة أساسية';
    }

    const prompt = `أنت خبير تسويق رقمي فذ وصانع محتوى محترف. 
مهمتك هي تحسين وإعادة صياغة المنشور التالي لمنصات التواصل الاجتماعي ليصبح فائق الجاذبية والانتشار.

النص الأصلي للمنشور:
"${text}"

المعايير المحددة للتعديل:
1. المنصة المستهدفة: ${platformDescMap[platform] || 'متعدد'}
2. نبرة الصوت: ${toneDescMap[tone] || 'تفاعلي'}
3. اللغة: ${langDesc}

إرشادات الصياغة الإبداعية:
- اكتب خطافاً (Hook) افتتاحياً رائعاً
- قسّم النص إلى جمل مريحة للعين
- أضف رموزاً تعبيرية منسجمة ومعبرة
- اختم بدعوة صريحة للتفاعل (CTA)
- أضف 5-8 هاشتاجات ذات صلة`;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const response = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    });

    const improvedText = response.response.text() || 'عذراً، لم أتمكن من تحسين هذا المنشور.';
    res.json({ improvedText });

  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ 
      error: error.message || 'حدث خطأ أثناء معالجة الطلب'
    });
  }
});

// Endpoint لتوليد صور
app.post('/api/generate-image', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text?.trim()) {
      return res.status(400).json({ error: 'نص المنشور مطلوب' });
    }

    const prompt = `صمم غلاف أو صورة تسويقية معبرة وملهمة جداً لمنصات التواصل الاجتماعي تعكس تماماً موضوع المنشور التالي:
"${text}"

الصورة يجب أن تكون:
- احترافية وجذابة بصرياً
- نسبة 1:1 (مربعة)
- واضحة وسهلة الفهم`;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const response = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt, inlineData: null }] }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    });

    let imageUrl = '';
    const content = response.response.content();
    
    if (content?.parts) {
      for (const part of content.parts) {
        if (part.inlineData?.data) {
          imageUrl = `data:image/jpeg;base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (imageUrl) {
      res.json({ imageUrl });
    } else {
      throw new Error('لم يتم العثور على صورة منتجة');
    }

  } catch (error) {
    console.error('Image generation error:', error);
    res.status(500).json({ 
      error: error.message || 'فشل توليد الصورة'
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

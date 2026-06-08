export interface ImprovePostParams {
  text: string;
  platform: 'instagram' | 'linkedin' | 'twitter' | 'facebook';
  tone: 'professional' | 'funny' | 'inspiring' | 'formal' | 'marketing';
  lang: 'ar' | 'en' | 'fr' | 'ar_en';
}

export interface GenerateImageParams {
  text: string;
}

// Get backend URL from environment or use default
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

/**
 * تحسين المنشور عبر الخادم الخلفي
 */
export async function improvePost(params: ImprovePostParams): Promise<string> {
  const { text, platform, tone, lang } = params;

  if (!text.trim()) {
    throw new Error('النص الأصلي مطلوب');
  }

  try {
    const response = await fetch(`${BACKEND_URL}/api/improve-post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, platform, tone, lang })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `خطأ ${response.status}: فشل تحسين المنشور`);
    }

    const data = await response.json();
    const improvedText = data.improvedText || 'عذراً، لم أتمكن من تحسين هذا المنشور.';
    return improvedText;

  } catch (error: any) {
    console.error('Post improvement error:', error);
    
    // Check if it's a network error
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new Error('فشل الاتصال بالخادم. تأكد من أن خادم البيانات يعمل بشكل صحيح.');
    }
    
    throw new Error(error.message || 'حدث خطأ غير متوقع أثناء معالجة طلبك');
  }
}

/**
 * توليد صورة احترافية عبر الخادم الخلفي
 */
export async function generateImage(params: GenerateImageParams): Promise<string> {
  const { text } = params;

  if (!text.trim()) {
    throw new Error('نص المنشور مطلوب لتوليد صورة');
  }

  try {
    const response = await fetch(`${BACKEND_URL}/api/generate-image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `خطأ ${response.status}: فشل توليد الصورة`);
    }

    const data = await response.json();
    
    if (data.imageUrl) {
      return data.imageUrl;
    } else {
      throw new Error('لم يتم العثور على صورة منتجة من النموذج');
    }

  } catch (error: any) {
    console.error('Image generation error:', error);
    
    // Check if it's a network error
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new Error('فشل الاتصال بالخادم. تأكد من أن خادم البيانات يعمل بشكل صحيح.');
    }
    
    // Fallback to Unsplash image
    const fallbackUrl = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80';
    throw new Error(`فشل توليد الصورة: ${error.message}. تم استخدام صورة تعبيرية بدلاً منها.`);
  }
}

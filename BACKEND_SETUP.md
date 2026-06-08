## 🔧 تشغيل الخادم الخلفي (Backend)

### المتطلبات المسبقة:
- **Node.js 16+** مثبت على جهازك
- **Google Gemini API Key** - احصل عليه من [Google AI Studio](https://makersuite.google.com/app/apikey)

### خطوات التشغيل:

#### 1. نسخ متغيرات البيئة
```bash
cd backend
cp .env.example .env
```

#### 2. تعديل ملف `.env` وإضافة مفتاح API:
```bash
GEMINI_API_KEY=your_google_gemini_api_key_here
PORT=5000
NODE_ENV=development
```

#### 3. تثبيت المكتبات:
```bash
npm install
```

#### 4. تشغيل الخادم:
```bash
# للتطوير (مع auto-reload)
npm run dev

# للإنتاج
npm start
```

يجب أن تظهر رسالة:
```
🚀 Server is running on http://localhost:5000
```

---

## 🎯 إعداد التطبيق الأمامي (Frontend)

### 1. إنشاء ملف `.env` في جذر المشروع:
```bash
cp .env.example .env
```

### 2. تعديل `.env` بناءً على بيئة التشغيل:

**للتطوير المحلي:**
```
VITE_BACKEND_URL=http://localhost:5000
```

**للتطبيق على الجوال (APK):**
```
VITE_BACKEND_URL=http://your-server-ip:5000
# أو إذا كنت تستخدم Ngrok:
VITE_BACKEND_URL=https://your-ngrok-url.ngrok.io
```

### 3. تثبيت المكتبات والتشغيل:
```bash
npm install
npm run dev
```

---

## 📱 تطبيق الجوال (APK)

### خطوات البناء والتشغيل:

#### 1. تحديث رابط الخادم في `.env`:
أضف رابط الخادم الذي ستنشره (مثل Heroku أو Railway):
```
VITE_BACKEND_URL=https://your-deployed-backend.herokuapp.com
```

#### 2. بناء المشروع للويب:
```bash
npm run build
```

#### 3. مزامنة Capacitor:
```bash
npx cap sync android
```

#### 4. بناء APK:
```bash
cd android
./gradlew assembleDebug
```

#### 5. تثبيت على جهاز الأندرويد:
```bash
adb install app/build/outputs/apk/debug/app-debug.apk
```

---

## 🚀 نشر الخادم (Deployment)

### خيار 1: Heroku (مجاني - بحد معين)

1. **إنشاء حساب Heroku**: https://www.heroku.com
2. **تثبيت Heroku CLI**: https://devcenter.heroku.com/articles/heroku-cli
3. **إنشاء تطبيق:**
```bash
heroku create your-app-name
```

4. **تعيين متغيرات البيئة:**
```bash
heroku config:set GEMINI_API_KEY=your_api_key
heroku config:set NODE_ENV=production
```

5. **نشر التطبيق:**
```bash
git push heroku main
```

### خيار 2: Railway (سهل وموثوق)

1. **اذهب إلى**: https://railway.app
2. **انقر على "Deploy from GitHub"**
3. **اختر المستودع الخاص بك**
4. **أضف متغيرات البيئة:**
   - `GEMINI_API_KEY`: مفتاح Google Gemini API
   - `NODE_ENV`: production

---

## ⚠️ استكشاف الأخطاء

### خطأ: "فشل الاتصال بالخادم"

**السبب**: الخادم غير مشغل أو العنوان غير صحيح

**الحل**:
1. تأكد أن الخادم يعمل: `http://localhost:5000/api/health`
2. تحقق من قيمة `VITE_BACKEND_URL` في ملف `.env`
3. إذا كنت تستخدم APK، تأكد من استخدام IP الخادم الصحيح

### خطأ: "Authentication credentials. Expected OAuth 2 access token"

**السبب**: مفتاح API غير صحيح أو منتهي الصلاحية

**الحل**:
1. أعد توليد مفتاح Google Gemini API
2. حدّث قيمة `GEMINI_API_KEY` في ملف `backend/.env`
3. أعد تشغيل الخادم

### التطبيق يعمل على الويب لكن لا يعمل على APK

**السبب**: مشكلة في الاتصال بالشبكة أو CORS

**الحل**:
1. تأكد أن رابط الخادم صحيح (IP أو Domain)
2. اختبر الاتصال من جهاز الأندرويد
3. استخدم Ngrok للاختبار:
```bash
# في terminal الخادم
ngrok http 5000
# استخدم رابط Ngrok في VITE_BACKEND_URL
```

---

## 📊 هيكل الملفات الجديد

```
social_post_pro/
├── backend/
│   ├── server.js              # الخادم الرئيسي
│   ├── package.json           # مكتبات Backend
│   ├── .env.example           # متغيرات البيئة (نموذج)
│   └── .env                   # متغيرات البيئة الفعلية (لا تضفها لـ git)
├── src/
│   ├── services/
│   │   └── gemini.ts          # تم تحديثه - الآن يتصل بالخادم
│   ├── hooks/
│   ├── components/
│   └── ...
├── .env.example               # متغيرات Frontend
├── .env                       # متغيرات Frontend الفعلية
└── ...
```

---

## ✅ قائمة التحقق

- [ ] تثبيت Node.js
- [ ] الحصول على مفتاح Google Gemini API
- [ ] إنشاء ملفات `.env` في كلا المشروعين
- [ ] تشغيل الخادم الخلفي بنجاح
- [ ] اختبار الخادم من `http://localhost:5000/api/health`
- [ ] تشغيل التطبيق الأمامي وتحسين منشور (على الويب)
- [ ] بناء APK وتثبيته على جهاز الأندرويد
- [ ] اختبار التحسين على APK

---

## 🎉 النتيجة النهائية

الآن التطبيق:
- ✅ آمن (لا يعرض مفتاح API في APK)
- ✅ يعمل على الويب والجوال بدون مشاكل
- ✅ قابل للنشر على أي خادم
- ✅ قابل للتوسع والتحسين

**هل واجهت أي مشكلة؟** اتصل بالمطور على البريد: yqwbalghythy69@gmail.com

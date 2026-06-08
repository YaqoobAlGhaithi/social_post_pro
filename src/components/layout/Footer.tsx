export const Footer = () => {
  return (
    <footer className="max-w-6xl mx-auto w-full px-4 mt-12 text-center border-t-2 border-dashed border-gray-200 pt-8">
      <p className="text-xs font-bold text-gray-500">
        تم التطوير بكل ❤️ بواسطة <span className="text-black underline decoration-[#00FF66] decoration-2 underline-offset-4">يعقوب الغيثي</span> &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
};

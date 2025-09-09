export default function Loader() {
  return (
    <div className="min-h-screen bg-gradient-to-br via-purple-950 from-slate-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-spin mb-4 mx-auto"></div>
        <p className="text-white text-xl">Loading...</p>
      </div>
    </div>
  );
}

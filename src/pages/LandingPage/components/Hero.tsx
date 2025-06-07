export default function Hero() {
  return (
    <section className="opacity-90 gap-y-3 sm:gap-y-5 w-full h-[300px] sm:h-[400px] lg:h-[500px] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <h1
        className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-inter font-stretch-expanded relative overflow-hidden text-center leading-tight"
        style={{ transform: "scaleX(1.1) sm:scaleX(1.2) lg:scaleX(1.3)" }}
      >
        <span
          className="bg-gradient-to-r from-white via-blue-500 to-purple-600 bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradient_5s_ease-in-out_infinite]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #ffffff 0%, #3b82f6 25%, #8b5cf6 50%, #ffffff 75%, #3b82f6 100%)",
            animation: "gradient 5s ease-in-out infinite",
          }}
        >
          Next-gen tickets
        </span>
      </h1>
      <p
        className="text-sm sm:text-lg md:text-xl lg:text-2xl text-[#999999] font-inter font-semibold relative text-center max-w-2xl"
        style={{ transform: "scaleX(1.1) sm:scaleX(1.2) lg:scaleX(1.3)" }}
      >
        <span
          className="bg-gradient-to-r from-[#999999] via-blue-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_100%]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #999999 0%, #60a5fa 25%, #a78bfa 50%, #999999 75%, #60a5fa 100%)",
            animation: "gradient 4s ease-in-out infinite 1s",
          }}
        >
          Own your events with Web3
        </span>
      </p>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `,
        }}
      />
    </section>
  );
}

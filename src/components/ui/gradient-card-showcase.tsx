import React from 'react';

const cards = [
  {
    step: '01',
    title: 'We Audit',
    desc: 'We analyze your current operations and identify the highest-ROI automation opportunities. Takes 30 minutes.',
    gradientFrom: '#ffbc00',
    gradientTo: '#ff0058',
  },
  {
    step: '02',
    title: 'We Build',
    desc: 'We design, build, and integrate your custom AI systems — fully done-for-you. No templates.',
    gradientFrom: '#03a9f4',
    gradientTo: '#ff0058',
  },
  {
    step: '03',
    title: 'You Scale',
    desc: 'Your systems go live. We monitor, optimize, and maintain. You focus on growth.',
    gradientFrom: '#4dff03',
    gradientTo: '#00d0ff',
  },
];

export default function SkewCards() {
  return (
    <>
      <div className="flex justify-center items-center flex-wrap gap-8 py-10 w-full max-w-6xl mx-auto">
        {cards.map(({ step, title, desc, gradientFrom, gradientTo }, idx) => (
          <div
            key={idx}
            className="group relative w-full md:w-[320px] h-auto min-h-[400px] transition-all duration-500"
          >
            {/* Skewed gradient panels */}
            <span
              className="absolute top-0 left-[50px] w-1/2 h-full rounded-2xl transform skew-x-[15deg] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[20px] group-hover:w-[calc(100%-40px)]"
              style={{
                background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})`,
              }}
            />
            <span
              className="absolute top-0 left-[50px] w-1/2 h-full rounded-2xl transform skew-x-[15deg] blur-[30px] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[20px] group-hover:w-[calc(100%-40px)]"
              style={{
                background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})`,
              }}
            />

            {/* Animated blurs */}
            <span className="pointer-events-none absolute inset-0 z-10">
              <span className="absolute top-0 left-0 w-0 h-0 rounded-full opacity-0 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.08)] transition-all duration-100 animate-blob group-hover:top-[-30px] group-hover:left-[30px] group-hover:w-[80px] group-hover:h-[80px] group-hover:opacity-100" />
              <span className="absolute bottom-0 right-0 w-0 h-0 rounded-full opacity-0 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.08)] transition-all duration-500 animate-blob animation-delay-1000 group-hover:bottom-[-30px] group-hover:right-[30px] group-hover:w-[80px] group-hover:h-[80px] group-hover:opacity-100" />
            </span>

            {/* Content */}
            <div className="relative z-20 left-0 h-full p-[40px_30px] bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl rounded-2xl text-white transition-all duration-500 group-hover:left-[-15px] group-hover:p-[50px_30px]">
              <span className="block text-4xl font-bold text-white/20 mb-4">{step}</span>
              <h2 className="text-2xl font-semibold mb-4 text-white">{title}</h2>
              <p className="text-sm leading-relaxed mb-8 text-white/70">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tailwind custom utilities for animation and shadows */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translateY(10px) scale(1); }
          50% { transform: translate(-10px, -10px) scale(1.1); }
        }
        .animate-blob { animation: blob 3s ease-in-out infinite; }
        .animation-delay-1000 { animation-delay: -1.5s; }
      `}</style>
    </>
  );
}

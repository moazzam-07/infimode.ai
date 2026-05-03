"use client";

import { motion } from "framer-motion";
import { Zap, Shield, BarChart3 } from "lucide-react";

const problems = [
  {
    id: "01",
    title: "Leads falling through cracks",
    description: "Your team misses 40% of inbound leads because no one is awake at 2am. Those leads go straight to your competitor while you sleep.",
    icon: Zap,
    color: "from-amber-500/20 to-orange-500/0",
  },
  {
    id: "02",
    title: "Manual processes eating margins",
    description: "You are paying humans to do work a machine should handle. Every manual copy-paste task is pure margin leaving your business.",
    icon: Shield,
    color: "from-blue-500/20 to-indigo-500/0",
  },
  {
    id: "03",
    title: "Scaling means hiring",
    description: "Growing currently means more headcount, more overhead, more management. What if you could 10x output with zero new hires?",
    icon: BarChart3,
    color: "from-rose-500/20 to-red-500/0",
  }
];

export function SplitScrollProblem() {
  return (
    <section className="relative z-20 bg-zinc-950 text-white -mt-8 md:-mt-12 rounded-t-[3rem] md:rounded-t-[4rem] shadow-[0_-20px_50px_rgba(0,0,0,0.05)]">
      {/* 
        On mobile: standard stack.
        On desktop: 50/50 split. 
      */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 md:gap-24 relative items-start">
        
        {/* Left: Sticky Text */}
        <div className="md:sticky md:top-0 md:h-[100dvh] flex flex-col justify-center pt-32 md:pt-0 pb-12 md:pb-0 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="text-red-400 text-[10px] md:text-xs font-semibold uppercase tracking-[0.25em] mb-6">
              The Reality
            </div>
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-white/90">
              Your team is drowning in <br className="hidden md:block"/>
              <span className="font-serif italic text-white">busy work</span>.
            </h2>
            <p className="mt-8 text-white/40 text-[1.1rem] max-w-md leading-relaxed">
              While you focus on operations, revenue is slipping out the back door. Here is where the leaks happen.
            </p>
          </motion.div>
        </div>

        {/* Right: Scrolling Cards */}
        <div className="pb-12 md:pb-[30vh] md:pt-[30vh] z-20">
          {problems.map((problem, idx) => (
            <Card key={problem.id} problem={problem} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ problem, index }: { problem: typeof problems[0], index: number }) {
  const Icon = problem.icon;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index === 0 ? 0.2 : 0 }}
      className={`
        group md:relative md:top-auto
        ${index === 0 ? "sticky top-[10vh] z-10" : ""}
        ${index === 1 ? "sticky top-[12vh] z-20" : ""}
        ${index === 2 ? "sticky top-[14vh] z-30" : ""}
        ${index === problems.length - 1 ? 'mb-12 md:mb-[30vh]' : 'mb-[20vh] md:mb-[30vh]'}
      `}
    >
      {/* Ambient background glow behind the card */}
      <div className={`absolute -inset-4 bg-gradient-to-br ${problem.color} blur-[80px] opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none`} />
      
      <div className="relative p-8 md:p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl transition-transform duration-500 hover:-translate-y-2">
        <div className="flex items-center justify-between mb-10">
          <div className="w-14 h-14 rounded-full bg-white/[0.03] flex items-center justify-center border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
            <Icon className="w-6 h-6 text-white/80" />
          </div>
          <span className="text-white/20 font-mono text-sm tracking-wider">{problem.id}</span>
        </div>
        
        <h3 className="text-2xl md:text-[2rem] font-medium tracking-tight text-white/90 mb-5 leading-tight">
          {problem.title}
        </h3>
        
        <p className="text-white/50 text-base md:text-[1.1rem] leading-relaxed">
          {problem.description}
        </p>
      </div>
    </motion.div>
  );
}

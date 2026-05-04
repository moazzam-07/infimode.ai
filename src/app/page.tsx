"use client";

import { motion, useScroll, useMotionValueEvent, type Variants } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Star, Zap, Shield, BarChart3, Check, ChevronRight, MessageSquare, Bot, Database, Share2 } from "lucide-react";
import { Logos3 } from "@/components/ui/logos3";
import { SplitScrollProblem } from "@/components/ui/split-scroll-problem";
import { FeatureCard } from "@/components/ui/grid-feature-cards";
import SkewCards from "@/components/ui/gradient-card-showcase";
import FeatureSection from "@/components/ui/feature-section";
import ParallaxFooter from "@/components/ui/parallax-footer";
import PremiumOnboarding from "@/components/ui/premium-onboarding";

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Home() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <main className="flex-1 flex flex-col">
      {/* ══════ NAV ══════ */}
      <motion.nav 
        variants={{ visible: { y: 0 }, hidden: { y: "-150%" } }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4"
      >
        <div className="bg-white/80 backdrop-blur-xl border border-black/[0.06] rounded-full px-6 py-3 flex items-center justify-between shadow-soft">
          <span className="text-lg font-semibold tracking-tight">infimode<span className="font-serif italic">.ai</span></span>
          <div className="hidden md:flex items-center gap-7 text-[13px] font-medium text-text-muted">
            <a href="#how" className="hover:text-text transition-colors">How It Works</a>
            <a href="#stack" className="hover:text-text transition-colors">What You Get</a>
            <a href="#faq" className="hover:text-text transition-colors">FAQ</a>
          </div>
          <button onClick={() => setIsOnboardingOpen(true)} className="bg-bg-dark text-text-on-dark px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 active:scale-[0.97] transition-all shadow-[inset_-4px_-6px_25px_0px_rgba(201,201,201,0.08),inset_4px_4px_10px_0px_rgba(29,29,29,0.24)] cursor-pointer">
            Book a Call
          </button>
        </div>
      </motion.nav>

      {/* ══════ HERO ══════ */}
      <section className="relative min-h-[75vh] md:min-h-screen overflow-hidden flex flex-col">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover [transform:scaleY(-1)]">
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260302_085640_276ea93b-d7da-4418-a09b-2aa5b490e838.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[26.416%] from-[rgba(255,255,255,0)] to-[66.943%] to-white" />
        </div>

        <motion.div variants={stagger} initial="hidden" animate="show" className="relative z-10 flex-1 flex flex-col items-center justify-center pt-32 md:pt-40 px-6 pb-12 md:pb-32">
          <div className="max-w-[1200px] w-full flex flex-col items-center gap-8 text-center">
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/[0.04] border border-black/[0.06] text-xs font-medium text-text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Currently accepting 2 new clients
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="font-medium tracking-[-0.04em] text-[clamp(2.5rem,7vw,5rem)] leading-[1.05] text-text">
              Your business on<br />
              <span className="font-serif italic text-[clamp(3rem,8.5vw,6.25rem)] leading-[0.95]">infinite mode</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg text-text-secondary/80 max-w-[554px] leading-relaxed">
              We install AI systems and automation infrastructure that capture leads, close deals, and run operations — 24/7. No retainers. No slide decks. Just systems that print revenue.
            </motion.p>

            <motion.div variants={fadeUp} className="w-full max-w-[520px] mt-2">
              <div className="flex items-center p-1.5 sm:p-2 rounded-[40px] bg-[#fcfcfc] border border-black/[0.06] shadow-soft w-full">
                <input type="email" placeholder="Enter your work email" className="flex-1 min-w-0 bg-transparent px-4 sm:px-5 py-2 sm:py-3 text-sm text-text placeholder:text-text-light outline-none" />
                <button onClick={() => setIsOnboardingOpen(true)} className="flex-shrink-0 flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-bg-dark text-text-on-dark text-sm font-medium hover:opacity-90 active:scale-[0.97] transition-all shadow-[inset_-4px_-6px_25px_0px_rgba(201,201,201,0.08),inset_4px_4px_10px_0px_rgba(29,29,29,0.24)] whitespace-nowrap cursor-pointer group">
                  <span className="hidden sm:inline">Get Free AI Audit</span>
                  <span className="sm:hidden">Get Audit</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
              <div className="flex items-center justify-center gap-3 mt-5">
                <div className="flex -space-x-0.5">{[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />)}</div>
                <span className="text-sm text-text-muted">Trusted by <strong className="text-text font-semibold">40+</strong> companies worldwide</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ══════ TRUSTED BY MARQUEE ══════ */}
      <Logos3 className="relative z-10 bg-white" />

      {/* ══════ PROBLEM AGITATION ══════ */}
      <SplitScrollProblem />

      {/* ══════ SOLUTION ══════ */}
      <section className="relative z-20 py-24 md:py-32 bg-bg-soft rounded-t-[3rem] md:rounded-t-[4rem] -mt-8 md:-mt-12 shadow-[0_-20px_50px_rgba(0,0,0,0.05)] overflow-hidden">
        {/* Splashy Clean Glow Transition */}
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[300px] bg-white rounded-full blur-[80px] pointer-events-none z-0" />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-16">
            <p className="text-xs font-medium text-text-muted uppercase tracking-[0.15em] mb-4">The solution</p>
            <h2 className="font-medium tracking-[-0.03em] text-[clamp(1.75rem,4vw,3rem)] leading-tight">
              This is what we <span className="font-serif italic">install</span>
            </h2>
          </motion.div>
          <AnimatedContainer
            delay={0.2}
            className="grid grid-cols-1 divide-y divide-black/10 divide-dashed border border-black/10 border-dashed sm:grid-cols-2 lg:grid-cols-3 sm:divide-x sm:divide-y-0 [&>*:nth-child(n+4)]:border-t [&>*:nth-child(n+4)]:border-black/10 [&>*:nth-child(n+4)]:border-dashed sm:[&>*:nth-child(4)]:border-l-0 sm:[&>*:nth-child(5)]:border-l sm:[&>*:nth-child(5)]:border-dashed sm:[&>*:nth-child(6)]:border-l sm:[&>*:nth-child(6)]:border-dashed bg-white rounded-3xl overflow-hidden"
          >
            {[
              { icon: MessageSquare, title: "Lead Capture & Response", description: "AI that captures, qualifies, and responds to leads 24/7 — in seconds, not hours." },
              { icon: Zap, title: "Workflow Automation", description: "Eliminates manual processes across your operations — CRM, invoicing, scheduling, follow-ups." },
              { icon: Share2, title: "Social Media Engine", description: "Automated content distribution, engagement monitoring, and lead extraction from social." },
              { icon: Database, title: "Data Intelligence", description: "Scraping, enrichment, and analysis systems that feed your pipeline with qualified prospects." },
              { icon: Bot, title: "Custom AI Agents", description: "Purpose-built AI agents that handle specific business functions autonomously." },
              { icon: Check, title: "Continuous Optimization", description: "Systems that get smarter over time, constantly improving your conversion rates and efficiency." },
            ].map((feature, i) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </AnimatedContainer>
        </div>
      </section>

      {/* ══════ HOW IT WORKS ══════ */}
      <section id="how" className="relative z-20 py-24 md:py-32 bg-zinc-950 text-white rounded-t-[3rem] md:rounded-t-[4rem] -mt-8 md:-mt-12 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-16">
            <p className="text-xs font-medium text-white/50 uppercase tracking-[0.15em] mb-4">How it works</p>
            <h2 className="font-medium tracking-[-0.03em] text-[clamp(1.75rem,4vw,3rem)] leading-tight text-white">
              Three steps to <span className="font-serif italic text-white/90">autopilot</span>
            </h2>
          </motion.div>
          
          <SkewCards />

          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-12 text-sm text-white/50">
            First system live in <strong className="text-white">14 days</strong>. Zero effort from your team.
          </motion.p>
        </div>
      </section>

      {/* ══════ VALUE STACK ══════ */}
      <FeatureSection />

      {/* ══════ GUARANTEE ══════ */}
      <section className="relative z-20 py-24 md:py-32 bg-white rounded-t-[3rem] md:rounded-t-[4rem] -mt-8 md:-mt-12 shadow-[0_-20px_50px_rgba(0,0,0,0.02)] overflow-hidden">
        {/* Soft Emerald Glow Background */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(120% 120% at 50% 0%, #ffffff 50%, rgba(16, 185, 129, 0.15) 100%)`,
            backgroundSize: "100% 100%",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-bg-soft border border-black/[0.04] flex items-center justify-center shadow-card">
              <Shield className="w-7 h-7 text-text" />
            </div>
            <h2 className="font-medium tracking-[-0.03em] text-[clamp(1.75rem,4vw,2.5rem)] leading-tight">
              It works, or you <span className="font-serif italic">don&apos;t pay</span>
            </h2>
            <p className="text-base text-text-secondary max-w-lg leading-relaxed">
              If we don&apos;t deliver the agreed results within 90 days, we keep working — at no additional cost — until we do. We don&apos;t get paid for effort. We get paid for results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════ WHO THIS IS FOR ══════ */}
      <section className="relative z-20 py-24 md:py-32 bg-white rounded-t-[3rem] md:rounded-t-[4rem] -mt-8 md:-mt-12 shadow-[0_-20px_50px_rgba(0,0,0,0.02)] overflow-hidden">
        {/* Splashy Green Glow Transition */}
        <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[400px] bg-[#10b981]/20 rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-14">
            <h2 className="font-medium tracking-[-0.03em] text-[clamp(1.75rem,4vw,2.5rem)] leading-tight">
              Is this <span className="font-serif italic">for you</span>?
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 rounded-2xl bg-white border border-black/[0.04] shadow-card">
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-green-700 mb-5">This is for you if…</p>
              <ul className="flex flex-col gap-3">{["You're doing ₹50L+ / $100K+ in annual revenue", "You have manual processes slowing growth", "You want to scale without adding headcount", "You're ready to invest in infrastructure"].map((t, i) => <li key={i} className="flex gap-2 text-sm text-text-secondary"><Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />{t}</li>)}</ul>
            </div>
            <div className="p-8 rounded-2xl bg-white border border-black/[0.04] shadow-card">
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-red-600 mb-5">Not for you if…</p>
              <ul className="flex flex-col gap-3">{["You're looking for the cheapest option", "You want a chatbot and nothing else", "You're not ready for a strategic engagement", "You expect results without giving access to operations"].map((t, i) => <li key={i} className="flex gap-2 text-sm text-text-secondary"><span className="text-red-500 mt-0.5 flex-shrink-0">✕</span>{t}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ FAQ ══════ */}
      <section id="faq" className="relative z-20 py-24 md:py-32 bg-white rounded-t-[3rem] md:rounded-t-[4rem] -mt-8 md:-mt-12 shadow-[0_-20px_50px_rgba(0,0,0,0.02)] overflow-hidden">
        {/* Soft Indigo Glow Background */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: "radial-gradient(120% 120% at 50% 0%, #ffffff 50%, rgba(99, 102, 241, 0.15) 100%)",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-14">
            <h2 className="font-medium tracking-[-0.03em] text-[clamp(1.75rem,4vw,2.5rem)] leading-tight">
              Common <span className="font-serif italic">questions</span>
            </h2>
          </motion.div>
          <div className="flex flex-col divide-y divide-black/[0.06]">
            {[
              { q: "How much does it cost?", a: "Every system is custom. Book a strategy call and we'll scope your exact needs and pricing." },
              { q: "How long until I see results?", a: "First system live in 14 days. Full deployment in 30–60 days depending on complexity." },
              { q: "What if it doesn't work?", a: "Our guarantee: if we don't deliver agreed results in 90 days, we keep working for free until we do." },
              { q: "Do I need technical knowledge?", a: "Zero. We handle everything end-to-end: architecture, development, deployment, and training." },
              { q: "Do you work with businesses outside India?", a: "Yes. We're based in India, operating globally. We have clients across multiple continents." },
              { q: "What happens after the system is built?", a: "We don't disappear. Every engagement includes monitoring, optimization, and ongoing support." },
            ].map(({ q, a }) => (
              <details key={q} className="group py-5 cursor-pointer">
                <summary className="flex items-center justify-between font-medium text-[15px] list-none select-none">
                  {q}
                  <span className="text-text-light group-open:rotate-45 transition-transform text-xl ml-4">+</span>
                </summary>
                <p className="mt-3 text-sm text-text-muted leading-relaxed max-w-2xl">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ FINAL CTA ══════ */}
      <section id="cta" className="relative z-20 py-24 md:py-32 bg-bg-dark text-text-on-dark rounded-t-[3rem] md:rounded-t-[4rem] -mt-8 md:-mt-12 shadow-[0_-20px_50px_rgba(0,0,0,0.05)] overflow-hidden">
        {/* Splashy Ethereal Glow Transition */}
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[500px] bg-white/10 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="flex flex-col items-center gap-6">
            <h2 className="font-medium tracking-[-0.03em] text-[clamp(1.75rem,4vw,3rem)] leading-tight">
              Ready to switch to<br /><span className="font-serif italic">infinite mode</span>?
            </h2>
            <p className="text-base text-white/60 max-w-lg leading-relaxed">
              Book a free strategy call. We&apos;ll audit your operations and show you exactly where AI can drive revenue. 30 minutes. Zero obligation.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
              <button onClick={() => setIsOnboardingOpen(true)} className="w-full sm:w-auto bg-white text-bg-dark px-8 py-4 rounded-full font-medium text-base hover:opacity-90 active:scale-[0.97] transition-all flex items-center justify-center gap-2 group cursor-pointer">
                Book Your Strategy Call <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button onClick={() => setIsOnboardingOpen(true)} className="w-full sm:w-auto px-8 py-4 rounded-full font-medium text-base text-white/70 hover:text-white border border-white/10 hover:border-white/20 transition-all flex items-center justify-center cursor-pointer">
                Get Free AI Audit
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════ PARALLAX FOOTER (CTA + Links) ══════ */}
      <ParallaxFooter onBookClick={() => setIsOnboardingOpen(true)} />

      <PremiumOnboarding isOpen={isOnboardingOpen} onClose={() => setIsOnboardingOpen(false)} />
    </main>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: React.ComponentProps<typeof motion.div>["className"];
  children: React.ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = false; // Add real hook if needed: const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

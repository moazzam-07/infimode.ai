"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Globe, MessageCircle, Link2, Mail } from "lucide-react";
import { useRef } from "react";

export default function ParallaxFooter({ onBookClick }: { onBookClick?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Background parallax (moves slower than the scroll to create depth)
  const yBg = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-gray-900 rounded-t-[3rem] md:rounded-t-[4rem] -mt-8 md:-mt-12 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] z-20"
    >
      {/* Parallax Background */}
      <motion.div 
        className="absolute inset-0 z-0 origin-bottom"
        style={{ y: yBg }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260430_115327_3f256636-9e63-4885-8d0b-09317dc2b0a5.png&w=1280&q=85')` 
          }}
        />
        {/* Dark overlay to make content readable and fit the premium vibe */}
        <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-[2px]" />
        
        {/* Deep gradient fade at the bottom to ground the section */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-zinc-950 to-transparent" />
      </motion.div>

      {/* Foreground Content Card (Top-Aligned) */}
      <div className="relative z-10 w-full px-4 pt-16 md:pt-32 pb-16 h-full flex flex-col justify-start">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl mx-auto w-full bg-white/95 backdrop-blur-xl shadow-2xl rounded-[2rem] md:rounded-[3rem] overflow-hidden flex flex-col border border-white/20"
        >
          {/* ══════ CTA Section (Top Half - Hormozi Plan) ══════ */}
          <div className="p-10 md:p-16 lg:p-24 text-center flex flex-col items-center">
            <h2 className="font-medium tracking-[-0.03em] text-[clamp(2rem,5vw,4rem)] leading-tight text-gray-900">
              They say infimode<br /><span className="font-serif italic text-gray-500">is the best !!!</span>
            </h2>
            <p className="mt-6 text-lg text-gray-600 max-w-xl leading-relaxed">
              Book a free strategy call. We'll audit your operations and show you exactly where AI can drive revenue. 30 minutes. Zero obligation.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-10 w-full sm:w-auto">
              <button onClick={onBookClick} className="w-full sm:w-auto bg-gray-900 text-white px-8 py-4 rounded-full font-medium text-base hover:bg-gray-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-lg shadow-gray-900/20">
                Book Your Strategy Call <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={onBookClick} className="w-full sm:w-auto px-8 py-4 rounded-full font-medium text-base text-gray-700 hover:bg-gray-100 border border-gray-200 transition-all flex items-center justify-center cursor-pointer">
                Get Free AI Audit
              </button>
            </div>
          </div>

          {/* ══════ Footer Section (Bottom Half) ══════ */}
          <div className="border-t border-gray-100 bg-white/50 p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
              {/* Brand */}
              <div className="col-span-1 md:col-span-2">
                <span className="text-2xl font-semibold tracking-tight text-gray-900">infimode<span className="font-serif italic text-gray-400">.ai</span></span>
                <p className="mt-4 text-sm text-gray-500 max-w-xs leading-relaxed">
                  Based in India. Operating globally.<br />
                  We build the machines that run your business.
                </p>
              </div>

              {/* Links */}
              <div>
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-6">Navigation</h3>
                <ul className="space-y-4">
                  <li><a href="#how" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">How It Works</a></li>
                  <li><a href="#stack" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">What You Get</a></li>
                  <li><a href="#faq" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">FAQ</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-6">Legal</h3>
                <ul className="space-y-4">
                  <li><a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Contact Us</a></li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-sm font-medium text-gray-400">
                © {new Date().getFullYear()} infimode.ai. All Rights Reserved.
              </p>
              <div className="flex items-center gap-3">
                {[Globe, MessageCircle, Link2, Mail].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

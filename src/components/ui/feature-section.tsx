"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Bot,
  Plug,
  BarChart3,
  Users,
  MessageSquare,
  FileBarChart,
} from "lucide-react";

const tasks = [
  {
    title: "Custom AI + Automation System — tailored to your business",
    subtitle: "",
    icon: <Bot className="w-5 h-5 text-gray-500" />,
  },
  {
    title: "Full integration with your existing tools (CRM, WhatsApp, email)",
    subtitle: "",
    icon: <Plug className="w-5 h-5 text-gray-500" />,
  },
  {
    title: "90-day optimization & monitoring",
    subtitle: "",
    icon: <BarChart3 className="w-5 h-5 text-gray-500" />,
  },
  {
    title: "Team training & documentation",
    subtitle: "",
    icon: <Users className="w-5 h-5 text-gray-500" />,
  },
  {
    title: "Dedicated support channel",
    subtitle: "",
    icon: <MessageSquare className="w-5 h-5 text-gray-500" />,
  },
  {
    title: "Monthly performance reports",
    subtitle: "",
    icon: <FileBarChart className="w-5 h-5 text-gray-500" />,
  },
];

export default function FeatureSection() {
  return (
    <section className="relative w-full py-24 md:py-32 px-6 bg-white text-gray-900 rounded-t-[3rem] md:rounded-t-[4rem] -mt-8 md:-mt-12 shadow-[0_-20px_50px_rgba(0,0,0,0.02)] z-20 overflow-hidden">
      {/* Radial Gradient Background from Bottom */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #7c3aed 100%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 items-center gap-16 md:gap-20">
        
        {/* LEFT SIDE - Task Loop with Vertical Bar */}
        <div className="relative w-full max-w-lg mx-auto md:mx-0 order-last md:order-none">
          <Card className="overflow-hidden bg-gray-50 border border-gray-200/60 shadow-xl rounded-[2rem]">
            <CardContent className="relative h-[500px] p-0 overflow-hidden">
              {/* Scrollable Container */}
              <div className="relative h-full overflow-hidden">
                {/* Motion list */}
                <motion.div
                  className="flex flex-col gap-3 absolute w-full"
                  animate={{ y: ["0%", "-50%"] }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 18,
                    ease: "linear",
                  }}
                >
                  {[...tasks, ...tasks].map((task, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-5 px-6 py-5 border-b border-gray-200/50 relative bg-white m-3 rounded-2xl shadow-sm"
                    >
                      {/* Icon + Content */}
                      <div className="flex items-center justify-between flex-1">
                        <div className="flex items-center gap-4">
                          <div className="bg-gray-100 flex items-center justify-center w-12 h-12 rounded-xl shadow-sm border border-gray-200/50">
                            {task.icon}
                          </div>
                          <div className="flex flex-col justify-center">
                            <p className="text-[15px] leading-snug font-semibold text-gray-900 pr-2">{task.title}</p>
                            {task.subtitle && <p className="text-xs text-gray-500 mt-1">{task.subtitle}</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>

                {/* Fade effect only inside card */}
                <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-gray-50 via-gray-50/80 to-transparent pointer-events-none z-10" />
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-gray-50 via-gray-50/80 to-transparent pointer-events-none z-10" />
              </div>
            </CardContent>
          </Card>
          
          {/* Mobile-only Bonuses Included */}
          <div className="md:hidden pt-4">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-[0.15em] mb-4">Bonuses Included</p>
            <div className="flex gap-3 flex-wrap">
              <Badge className="px-4 py-2 text-sm font-medium bg-black text-white hover:bg-black/90 rounded-full">Free Operational Audit</Badge>
              <Badge className="px-4 py-2 text-sm font-medium bg-black text-white hover:bg-black/90 rounded-full">Priority Support — 90 Days</Badge>
              <Badge className="px-4 py-2 text-sm font-medium bg-black text-white hover:bg-black/90 rounded-full">System Expansion Consult</Badge>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Content */}
        <div className="space-y-8">
          <Badge variant="secondary" className="px-4 py-1.5 text-xs font-medium bg-gray-100 text-gray-500 uppercase tracking-[0.15em] rounded-full border-none">
            What you get
          </Badge>
          <h3 className="text-[clamp(1.75rem,4vw,3rem)] font-medium text-gray-900 leading-[1.1] tracking-[-0.03em]">
            The full <span className="font-serif italic text-gray-500">stack.</span> <br />
            <span className="text-xl sm:text-2xl text-gray-500 font-normal mt-4 block leading-relaxed">
              Everything you need to put your business on autopilot. We build, integrate, and optimize your custom AI systems, while training your team and providing dedicated support.
            </span>
          </h3>

          <div className="hidden md:block pt-2">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-[0.15em] mb-4">Bonuses Included</p>
            <div className="flex gap-3 flex-wrap">
              <Badge className="px-4 py-2 text-sm font-medium bg-black text-white hover:bg-black/90 rounded-full">Free Operational Audit</Badge>
              <Badge className="px-4 py-2 text-sm font-medium bg-black text-white hover:bg-black/90 rounded-full">Priority Support — 90 Days</Badge>
              <Badge className="px-4 py-2 text-sm font-medium bg-black text-white hover:bg-black/90 rounded-full">System Expansion Consult</Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

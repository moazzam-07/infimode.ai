"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Bell,
  Zap,
  Users,
  Share2,
  FileBarChart,
} from "lucide-react";

const tasks = [
  {
    title: "AI-powered notifications",
    subtitle: "Smart alerts for critical events",
    icon: <Bell className="w-4 h-4 text-gray-500" />,
  },
  {
    title: "Workflow Automation",
    subtitle: "Error-free process execution",
    icon: <Zap className="w-4 h-4 text-gray-500" />,
  },
  {
    title: "Employee insights",
    subtitle: "Track productivity in real-time",
    icon: <Users className="w-4 h-4 text-gray-500" />,
  },
  {
    title: "Social campaigns",
    subtitle: "AI-curated content suggestions",
    icon: <Share2 className="w-4 h-4 text-gray-500" />,
  },
  {
    title: "AI-driven reports",
    subtitle: "Weekly insights & performance",
    icon: <FileBarChart className="w-4 h-4 text-gray-500" />,
  },
];

export default function FeatureSection() {
  return (
    <section className="relative w-full py-24 md:py-32 px-6 bg-white text-gray-900 rounded-t-[3rem] md:rounded-t-[4rem] -mt-8 md:-mt-12 shadow-[0_-20px_50px_rgba(0,0,0,0.02)] z-20">
      <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 items-center gap-16 md:gap-20">
        
        {/* LEFT SIDE - Task Loop with Vertical Bar */}
        <div className="relative w-full max-w-md mx-auto md:mx-0">
          <Card className="overflow-hidden bg-gray-50 border border-gray-200/60 shadow-xl rounded-2xl">
            <CardContent className="relative h-[360px] p-0 overflow-hidden">
              {/* Scrollable Container */}
              <div className="relative h-full overflow-hidden">
                {/* Motion list */}
                <motion.div
                  className="flex flex-col gap-2 absolute w-full"
                  animate={{ y: ["0%", "-50%"] }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 14,
                    ease: "linear",
                  }}
                >
                  {[...tasks, ...tasks].map((task, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 px-6 py-4 border-b border-gray-200/50 relative bg-white m-2 rounded-xl shadow-sm"
                    >
                      {/* Icon + Content */}
                      <div className="flex items-center justify-between flex-1">
                        <div className="flex items-center gap-3">
                          <div className="bg-gray-100 flex items-center justify-center w-10 h-10 rounded-xl shadow-sm border border-gray-200/50">
                            {task.icon}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{task.title}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{task.subtitle}</p>
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
        </div>

        {/* RIGHT SIDE - Content */}
        <div className="space-y-8">
          <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium bg-gray-100 text-gray-600 rounded-full border-none">
            What you get
          </Badge>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-900 leading-[1.3] tracking-tight">
            Automate repetitive tasks. <br />
            <span className="text-gray-500 font-normal">
              We help you streamline operations with AI-driven automation — from custom workflows and reporting to data tracking and smart notifications. Our solutions reduce human error, save time, and scale effortlessly with your business needs.
            </span>
          </h3>

          <div className="flex gap-3 flex-wrap pt-4">
            <Badge className="px-5 py-2.5 text-sm font-medium bg-black text-white hover:bg-black/90 rounded-full">AI Task Bots</Badge>
            <Badge className="px-5 py-2.5 text-sm font-medium bg-black text-white hover:bg-black/90 rounded-full">Custom Workflows</Badge>
            <Badge className="px-5 py-2.5 text-sm font-medium bg-black text-white hover:bg-black/90 rounded-full">Enterprise Ready</Badge>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, CheckCircle2 } from "lucide-react";

export type OnboardingData = {
  bottleneck: string[];
  revenue: string;
  timeline: string;
  name: string;
  email: string;
};

const REVENUE_OPTIONS_USD = ["Under $10k/mo", "$10k-$50k/mo", "$50k-$150k/mo", "$150k+/mo"];
const REVENUE_OPTIONS_INR = ["Under ₹8 Lakhs/mo", "₹8L - ₹40L/mo", "₹40L - ₹1.2Cr/mo", "₹1.2Cr+/mo"];

const STEPS = [
  {
    id: "bottleneck",
    title: "What are the operational bottlenecks in your business right now?",
    subtitle: "Select all that apply.",
    multiSelect: true,
    options: [
      "Missed Leads & Slow Response Times",
      "Data Chaos (Scattered across spreadsheets & apps)",
      "Repetitive Daily Tasks & Manual Data Entry",
      "Want to scale without hiring more staff"
    ],
  },
  {
    id: "revenue",
    title: "What is your current monthly revenue?",
    dynamicSubtitle: {
      "Missed Leads & Slow Response Times": "AI agents can capture and qualify leads in seconds, 24/7. Let's see if we're a fit...",
      "Data Chaos (Scattered across spreadsheets & apps)": "We can build infrastructure to centralize and sync your data automatically. Let's see if we're a fit...",
      "Repetitive Daily Tasks & Manual Data Entry": "Automation can eliminate that manual work so your team focuses on high-value tasks. Let's see if we're a fit...",
      "Want to scale without hiring more staff": "AI infrastructure scales infinitely without adding to your payroll. Let's see if we're a fit...",
    },
    options: ["Under $10k/mo", "$10k-$50k/mo", "$50k-$150k/mo", "$150k+/mo"],
  },
  {
    id: "timeline",
    title: "If we can solve this, how soon are you ready to deploy capital?",
    options: ["ASAP", "1-3 months", "Just exploring"],
  },
  {
    id: "contact",
    title: "Where should we send your audit results?",
    type: "form",
  },
  {
    id: "success",
    title: "You're qualified.",
    subtitle: "Redirecting to calendar...",
    type: "success",
  }
];

export default function PremiumOnboarding({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isIndian, setIsIndian] = useState(false);
  const [data, setData] = useState<OnboardingData>({
    bottleneck: [],
    revenue: "",
    timeline: "",
    name: "",
    email: "",
  });

  useEffect(() => {
    // Using IP Geolocation to reliably detect country (works on localhost and Vercel)
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data.country_code === "IN") {
          setIsIndian(true);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch IP geo", err);
      });
  }, []);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  const handleOptionSelect = (field: keyof OnboardingData, value: string) => {
    const stepDef = STEPS[currentStep];
    
    if (stepDef.multiSelect) {
      setData((prev) => {
        const currentArr = (prev[field] as string[]) || [];
        if (currentArr.includes(value)) {
          return { ...prev, [field]: currentArr.filter((item) => item !== value) };
        } else {
          return { ...prev, [field]: [...currentArr, value] };
        }
      });
      // Do not auto-advance on multi-select
      return;
    }

    // Single select logic
    setData((prev) => ({ ...prev, [field]: value }));
    setTimeout(() => {
      if (currentStep < STEPS.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }, 400); // 400ms delay for auto-advance UI
  };

  const step = STEPS[currentStep];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/20 backdrop-blur-md p-4"
        >
          <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full bg-black/5 hover:bg-black/10 text-gray-900 transition-all">
            <X className="w-5 h-5" />
          </button>

          <motion.div 
            className="w-full max-w-2xl bg-white/95 shadow-2xl rounded-3xl p-8 md:p-12 border border-black/[0.04] overflow-hidden relative"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col"
              >
                <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-gray-900 mb-2">
                  {step.title}
                </h2>

                {step.id === "revenue" && data.bottleneck.length > 0 && (
                  <p className="text-gray-500 mb-8">
                    {data.bottleneck.length === 1 
                      ? step.dynamicSubtitle?.[data.bottleneck[0] as keyof typeof step.dynamicSubtitle]
                      : "AI infrastructure can eliminate these bottlenecks. Let's see if we're a fit..."}
                  </p>
                )}
                {step.subtitle && <p className="text-gray-500 mb-8">{step.subtitle}</p>}
                {!step.subtitle && step.id !== "revenue" && <div className="h-8" />}

                {step.options && (() => {
                  const currentOptions = step.id === "revenue" 
                    ? (isIndian ? REVENUE_OPTIONS_INR : REVENUE_OPTIONS_USD) 
                    : step.options;
                  
                  return (
                  <div className="flex flex-col gap-3">
                    {currentOptions.map((option, idx) => {
                      const isSelected = step.multiSelect 
                        ? data[step.id as keyof OnboardingData].includes(option)
                        : data[step.id as keyof OnboardingData] === option;

                      return (
                        <button
                          key={option}
                          onClick={() => handleOptionSelect(step.id as keyof OnboardingData, option)}
                          className={`w-full text-left px-6 py-4 rounded-2xl border transition-all duration-200 group flex items-center justify-between
                            ${isSelected 
                              ? 'bg-gray-900 text-white border-gray-900' 
                              : 'bg-white border-gray-200 text-gray-900 hover:border-gray-400 shadow-sm'
                            }
                          `}
                        >
                          <span className="font-medium">{option}</span>
                          <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs
                            ${isSelected
                              ? 'border-white/20 text-white'
                              : 'border-gray-200 text-gray-400 group-hover:border-gray-400'
                            }`}
                          >
                            {step.multiSelect && isSelected ? <CheckCircle2 className="w-4 h-4 text-white" /> : String.fromCharCode(65 + idx)}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  );
                })()}

                {step.multiSelect && (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    disabled={data[step.id as keyof OnboardingData].length === 0}
                    className="w-full mt-6 px-8 py-4 bg-gray-900 text-white rounded-full font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                {step.type === "form" && (
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={data.name}
                      onChange={(e) => setData({ ...data, name: e.target.value })}
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-400 transition-colors"
                    />
                    <input
                      type="email"
                      placeholder="Work Email"
                      value={data.email}
                      onChange={(e) => setData({ ...data, email: e.target.value })}
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-400 transition-colors"
                    />
                    <button
                      onClick={() => setCurrentStep(currentStep + 1)}
                      disabled={!data.name || !data.email}
                      className="w-full mt-2 px-8 py-4 bg-gray-900 text-white rounded-full font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Finish <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {step.type === "success" && (
                  <div className="flex flex-col items-center justify-center py-8">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mb-6 p-4 bg-green-50 rounded-full">
                      <CheckCircle2 className="w-12 h-12 text-green-500" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

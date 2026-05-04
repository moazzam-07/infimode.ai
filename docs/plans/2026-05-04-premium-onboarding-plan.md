# Premium Onboarding Flow Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a sleek, Typeform-style Command Menu modal for high-ticket lead qualification using Framer Motion and Next.js.

**Architecture:** We will create a standalone `PremiumOnboarding` component that manages its own multi-step state, capturing answers and advancing automatically. This component will be mounted in `page.tsx` and triggered via the main CTAs. The styling will be heavily tailored to match the light/premium aesthetic of the site (frosted glass, dark text).

**Tech Stack:** React, Next.js (App Router), Tailwind CSS, Framer Motion, Lucide React.

---

### Task 1: Create the Component Skeleton & Types

**Files:**
- Create: `src/components/ui/premium-onboarding.tsx`

**Step 1: Write minimal implementation**

```tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, CheckCircle2 } from "lucide-react";

export type OnboardingData = {
  bottleneck: string;
  revenue: string;
  timeline: string;
  name: string;
  email: string;
};

export default function PremiumOnboarding({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/20 backdrop-blur-md">
      <div className="bg-white/95 w-full max-w-2xl rounded-3xl p-8">
        Modal Open
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/ui/premium-onboarding.tsx
git commit -m "feat: setup premium onboarding component skeleton"
```

---

### Task 2: Implement the Step Configuration & State Logic

**Files:**
- Modify: `src/components/ui/premium-onboarding.tsx`

**Step 1: Write implementation**

Add the step configuration, state variables, and step advancement logic.

```tsx
// Inside premium-onboarding.tsx, above the component:
const STEPS = [
  {
    id: "bottleneck",
    title: "What's the biggest operational bottleneck in your business right now?",
    options: ["Lead Generation", "Sales/Closing", "Fulfillment", "Admin/Overhead"],
  },
  {
    id: "revenue",
    title: "What is your current monthly revenue?",
    dynamicSubtitle: {
      "Lead Generation": "If leads are slow, AI outbound systems can fix that. Let's see if we're a fit...",
      "Sales/Closing": "If leads fall through the cracks, AI can automate the first 3 touches. Let's see if we're a fit...",
      "Fulfillment": "If fulfillment is breaking, AI can automate the backend. Let's see if we're a fit...",
      "Admin/Overhead": "If overhead is high, AI can replace the manual work. Let's see if we're a fit...",
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

// Inside the component:
const [currentStep, setCurrentStep] = useState(0);
const [data, setData] = useState<OnboardingData>({
  bottleneck: "",
  revenue: "",
  timeline: "",
  name: "",
  email: "",
});

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
  setData((prev) => ({ ...prev, [field]: value }));
  setTimeout(() => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }, 400); // 400ms delay for auto-advance UI
};
```

**Step 2: Commit**

```bash
git add src/components/ui/premium-onboarding.tsx
git commit -m "feat: add onboarding state and step configuration"
```

---

### Task 3: Build the UI Elements & Framer Motion Transitions

**Files:**
- Modify: `src/components/ui/premium-onboarding.tsx`

**Step 1: Write implementation**

Replace the placeholder `Modal Open` with the full UI rendering loop, including options mapped to buttons, the form inputs, and the `AnimatePresence` logic.

```tsx
// Inside the return block of premium-onboarding.tsx:
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

              {step.id === "revenue" && data.bottleneck && (
                <p className="text-gray-500 mb-8">{step.dynamicSubtitle?.[data.bottleneck as keyof typeof step.dynamicSubtitle]}</p>
              )}
              {step.subtitle && <p className="text-gray-500 mb-8">{step.subtitle}</p>}
              {!step.subtitle && step.id !== "revenue" && <div className="h-8" />}

              {step.options && (
                <div className="flex flex-col gap-3">
                  {step.options.map((option, idx) => (
                    <button
                      key={option}
                      onClick={() => handleOptionSelect(step.id as keyof OnboardingData, option)}
                      className={`w-full text-left px-6 py-4 rounded-2xl border transition-all duration-200 group flex items-center justify-between
                        ${data[step.id as keyof OnboardingData] === option 
                          ? 'bg-gray-900 text-white border-gray-900' 
                          : 'bg-white border-gray-200 text-gray-900 hover:border-gray-400 shadow-sm'
                        }
                      `}
                    >
                      <span className="font-medium">{option}</span>
                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs
                        ${data[step.id as keyof OnboardingData] === option
                          ? 'border-white/20 text-white'
                          : 'border-gray-200 text-gray-400 group-hover:border-gray-400'
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </div>
                    </button>
                  ))}
                </div>
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
```

**Step 2: Commit**

```bash
git add src/components/ui/premium-onboarding.tsx
git commit -m "feat: implement animated UI for premium onboarding modal"
```

---

### Task 4: Wire Component into the Layout (page.tsx & parallax-footer.tsx)

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/components/ui/parallax-footer.tsx`

**Step 1: Write implementation**

Update `page.tsx` to include state and pass it down.

```tsx
// src/app/page.tsx
// Add imports:
import PremiumOnboarding from "@/components/ui/premium-onboarding";

// Add state inside Home():
const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

// Update all CTA buttons in page.tsx (Nav, Hero, Bottom CTA) to:
onClick={() => setIsOnboardingOpen(true)}

// Add at the very bottom of the return statement:
<PremiumOnboarding isOpen={isOnboardingOpen} onClose={() => setIsOnboardingOpen(false)} />
```

Update `parallax-footer.tsx` to accept and wire the prop.

```tsx
// src/components/ui/parallax-footer.tsx
export default function ParallaxFooter({ onBookClick }: { onBookClick?: () => void }) {
  // ...
  // Update the two buttons to use onClick={onBookClick}
}
```

And in `page.tsx`:
```tsx
<ParallaxFooter onBookClick={() => setIsOnboardingOpen(true)} />
```

**Step 2: Commit**

```bash
git add src/app/page.tsx src/components/ui/parallax-footer.tsx
git commit -m "feat: wire up premium onboarding modal to all CTAs"
```

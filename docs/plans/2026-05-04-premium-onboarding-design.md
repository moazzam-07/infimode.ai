# Premium Onboarding Flow Design

## Overview
A high-ticket, Hormozi-style onboarding funnel that qualifies leads directly from the landing page. The flow is designed as a "Command Menu / Spotlight" modal that matches the premium, light-themed aesthetic of infimode.ai.

## Visual Aesthetic (The Spotlight Modal)
- **Backdrop:** When triggered, the underlying website dims with a heavy `backdrop-blur-xl`.
- **The Modal:** A sleek, rounded rectangle floating in the center of the screen, mimicking macOS Spotlight or Raycast.
- **Theme:** Frosted white glass (`bg-white/90` or `bg-white/95`) with soft shadows to complement the website's light, airy, and colorful aesthetic. Dark text (`text-gray-900`) for premium contrast.
- **Animations:** Powered by `framer-motion`. Auto-advancing slides with smooth vertical translates and crossfades.

## The "Diagnostic Web" Flow (Hormozi Sales Tech)
The flow prioritizes minimizing friction initially, then extracting qualification data.

1. **Step 1 (The Hook - Diagnosis):** 
   - *Question:* "What's the biggest operational bottleneck in your business right now?"
   - *Options:* Lead Generation, Sales/Closing, Fulfillment, Admin/Overhead.
2. **Step 2 (The Dynamic Insight + Revenue Qualifier):** 
   - *Logic:* Based on their choice in Step 1, display a tailored micro-insight (e.g., "If fulfillment is breaking, AI can automate the backend. Let's see if we're a fit...").
   - *Question:* "What is your current monthly revenue?"
   - *Options:* Under $10k/mo, $10k-$50k/mo, $50k-$150k/mo, $150k+/mo.
3. **Step 3 (Timeline/Urgency):**
   - *Question:* "If we can solve this, how soon are you ready to deploy capital?"
   - *Options:* ASAP, 1-3 months, Just exploring.
4. **Step 4 (Lead Capture):**
   - *Input:* Name and Work Email.
5. **Step 5 (Hand-off/Success):**
   - *Message:* "You're qualified. Redirecting to calendar..."
   - *Action:* Simulates booking or redirects.

## Interaction Model
- **Typeform Style:** Big, gorgeous clickable tiles.
- **Auto-Advance:** The moment a user clicks an option, the current question slides up and fades out, and the next one slides in. No manual "Next" button required for multi-choice questions.

## Data Logic
- **No Hard Reject:** Even if a user selects the lowest revenue tier ("Under $10k/mo"), they are permitted to complete the flow and book a call. 
- **Data Collection:** All answers are aggregated into a state object, ensuring the salesperson is fully prepared and has the lead's profile prior to the call.

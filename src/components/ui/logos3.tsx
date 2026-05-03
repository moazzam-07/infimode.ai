// This template requires the Embla Auto Scroll plugin to be installed:
//
// npm install embla-carousel-auto-scroll

"use client";

import AutoScroll from "embla-carousel-auto-scroll";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Logo {
  id: string;
  description: string;
  image: string;
  className?: string;
}

interface Logos3Props {
  heading?: string;
  logos?: Logo[];
  className?: string;
}

const Logos3 = ({
  heading = "Trusted by world-class teams",
  className,
  logos = [
    {
      id: "logo-1",
      description: "Astro",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/astro-wordmark.svg",
      className: "h-6 md:h-7 w-auto grayscale opacity-40 hover:opacity-100 transition-opacity duration-500",
    },
    {
      id: "logo-2",
      description: "Figma",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/figma-wordmark.svg",
      className: "h-6 md:h-7 w-auto grayscale opacity-40 hover:opacity-100 transition-opacity duration-500",
    },
    {
      id: "logo-3",
      description: "Next.js",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/nextjs-wordmark.svg",
      className: "h-6 md:h-7 w-auto grayscale opacity-40 hover:opacity-100 transition-opacity duration-500",
    },
    {
      id: "logo-4",
      description: "React",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/react-wordmark.svg",
      className: "h-6 md:h-7 w-auto grayscale opacity-40 hover:opacity-100 transition-opacity duration-500",
    },
    {
      id: "logo-5",
      description: "shadcn/ui",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcn-ui-wordmark.svg",
      className: "h-6 md:h-7 w-auto grayscale opacity-40 hover:opacity-100 transition-opacity duration-500",
    },
    {
      id: "logo-6",
      description: "Supabase",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/supabase-wordmark.svg",
      className: "h-6 md:h-7 w-auto grayscale opacity-40 hover:opacity-100 transition-opacity duration-500",
    },
    {
      id: "logo-7",
      description: "Tailwind CSS",
      image: "https://www.shadcnblocks.com/images/block/logos/tailwind.svg",
      className: "h-4 md:h-5 w-auto grayscale opacity-40 hover:opacity-100 transition-opacity duration-500",
    },
    {
      id: "logo-8",
      description: "Vercel",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/vercel-wordmark.svg",
      className: "h-6 md:h-7 w-auto grayscale opacity-40 hover:opacity-100 transition-opacity duration-500",
    },
  ],
}: Logos3Props) => {
  return (
    <section className={`pt-2 pb-32 md:pt-4 md:pb-48 w-full ${className || ""}`}>
      <div className="w-full flex justify-center text-center">
        <h2 className="text-[10px] md:text-xs font-semibold text-black/40 uppercase tracking-[0.25em] mb-8 md:mb-12">
          {heading}
        </h2>
      </div>
      <div className="pt-2 relative">
        <div className="relative mx-auto flex items-center justify-center lg:max-w-[1200px] px-4">
          <Carousel
            opts={{ loop: true, align: "center" }}
            plugins={[AutoScroll({ playOnInit: true, speed: 0.8 })]}
            className="w-full"
          >
            <CarouselContent className="ml-0 items-center justify-around">
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="flex basis-auto justify-center pl-0 mx-8 md:mx-16"
                >
                  <div className="flex shrink-0 items-center justify-center">
                    <img
                      src={logo.image}
                      alt={logo.description}
                      className={logo.className}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          
          {/* Heavy, wide corner blurs for perfect seamless fading */}
          <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10"></div>
          <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10"></div>
        </div>
      </div>
    </section>
  );
};

export { Logos3 };

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Car from "@/components/Car";
import localFont from "next/font/local";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const revealContainerRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  
  const boxesRef = useRef<(HTMLDivElement | null)[]>([]);

  const text = "WELCOME ITZFIZZ";

  useEffect(() => {
    // 1. Initial Load Animations
    const tl = gsap.timeline();
    
    tl.fromTo(
      ".base-text span",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 0.2, duration: 1, stagger: 0.05, ease: "power4.out" }
    ).fromTo(
      boxesRef.current,
      { y: 50, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
      "-=0.5"
    );

    // Car idle animation (bobbing)
    gsap.to(carRef.current, {
      y: "-=8",
      repeat: -1,
      yoyo: true,
      duration: 0.4,
      ease: "sine.inOut"
    });

    // 2. Scroll-Based Core Interaction
    const ctx = gsap.context(() => {
      if (!carRef.current || !revealContainerRef.current) return;
      
      const roadWidth = window.innerWidth;
      const carWidth = 200; 
      const endX = roadWidth - carWidth;

      // The main scroll scrub
      gsap.to(carRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top", 
          scrub: 1, // Add slight delay (1s) to scrub for a buttery smooth lagging effect
          pin: trackRef.current,
        },
        x: endX,
        ease: "none",
        onUpdate: function () {
          const carX = gsap.getProperty(carRef.current, "x") as number;
          const carCenter = carX + carWidth / 2;
          const percentage = (carCenter / roadWidth) * 100;

          // Expand the trail behind the car smoothly
          gsap.set(trailRef.current, { width: `${percentage}%` });

          // Instead of iterating array of letters, we smoothly reveal the text container using clip-path
          gsap.set(revealContainerRef.current, {
            clipPath: `inset(0 ${100 - percentage}% 0 0)`
          });
        },
      });

      // Advanced Parallax for Stat Boxes
      boxesRef.current.forEach((box, i) => {
        if (!box) return;
        const speed = i % 2 === 0 ? 0.8 : 1.5;
        gsap.to(box, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
          y: -150 * speed,
          ease: "none"
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`relative h-[200vh] bg-gradient-to-br from-[#0a0a0a] to-[#121212] w-full ${inter.className}`}>
      <div 
        ref={trackRef} 
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
      >
        {/* Sleek Dark Road Background */}
        <div className="relative w-full h-[280px] bg-[#111111] flex items-center shadow-2xl border-y border-white/5 overflow-hidden">
          
          {/* Animated Glow behind the road */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#def54f]/5 blur-3xl rounded-[100%]" />

          {/* Smooth Gradient Trail Container */}
          <div 
            ref={trailRef}
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-transparent via-[#def54f]/80 to-[#def54f] z-10 w-0 blur-[2px]"
          />

          {/* Car Element */}
          <div 
            ref={carRef}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-[200px]"
          >
            <Car className="w-full h-auto drop-shadow-[0_0_20px_rgba(222,245,79,0.3)]" />
          </div>

          {/* Typeface Base Layer (Dimmed) */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full text-center z-20 flex justify-center gap-2 sm:gap-4 md:gap-6 font-black text-5xl sm:text-7xl md:text-9xl tracking-tighter base-text">
            {text.split("").map((char, index) => (
              <span key={index} className="inline-block whitespace-pre text-white/20 select-none">
                {char}
              </span>
            ))}
          </div>

          {/* Typeface Reveal Layer (Vibrant) */}
          <div 
            ref={revealContainerRef}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-full text-center z-40 flex justify-center gap-2 sm:gap-4 md:gap-6 font-black text-5xl sm:text-7xl md:text-9xl tracking-tighter"
            style={{ clipPath: "inset(0 100% 0 0)" }}
          >
            {text.split("").map((char, index) => (
              <span key={`glow-${index}`} className="inline-block whitespace-pre text-[#111111] select-none text-shadow-sm">
                {char}
              </span>
            ))}
          </div>
        </div>

        {/* Premium Glassmorphic Stat Boxes */}
        <div 
          ref={(el) => { boxesRef.current[0] = el; }}
          className="absolute top-[8%] right-[25%] bg-[#def54f]/90 backdrop-blur-md text-neutral-900 p-8 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-[#def54f] z-50 w-[280px]"
        >
          <div className="text-5xl font-black mb-2 tracking-tight">58%</div>
          <p className="text-sm font-semibold opacity-90 leading-relaxed">Increase in pick up point use</p>
        </div>

        <div 
          ref={(el) => { boxesRef.current[1] = el; }}
          className="absolute bottom-[10%] right-[32%] bg-[#6ac9ff]/20 backdrop-blur-xl text-white p-8 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-[#6ac9ff]/40 z-50 w-[260px]"
        >
          <div className="text-5xl font-black mb-2 tracking-tight text-[#6ac9ff]">23%</div>
          <p className="text-sm font-medium text-neutral-300 leading-relaxed">Decreased in customer phone calls</p>
        </div>

        <div 
          ref={(el) => { boxesRef.current[2] = el; }}
          className="absolute top-[18%] right-[5%] bg-white/5 backdrop-blur-lg text-white p-8 rounded-2xl shadow-xl border border-white/10 z-50 w-[240px]"
        >
          <div className="text-5xl font-black mb-2 tracking-tight">27%</div>
          <p className="text-sm font-medium text-neutral-400 leading-relaxed">Increase in pick up point use</p>
        </div>

        <div 
          ref={(el) => { boxesRef.current[3] = el; }}
          className="absolute bottom-[18%] right-[10%] bg-[#fa7328]/90 backdrop-blur-md text-white p-8 rounded-2xl shadow-[0_20px_40px_rgba(250,115,40,0.2)] border border-[#fa7328] z-50 w-[260px]"
        >
          <div className="text-5xl font-black mb-2 tracking-tight">40%</div>
          <p className="text-sm font-medium opacity-90 leading-relaxed">Decreased in customer phone calls</p>
        </div>

      </div>
    </div>
  );
}

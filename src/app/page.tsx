"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Car from "@/components/Car";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const valueTextRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  
  const boxesRef = useRef<(HTMLDivElement | null)[]>([]);

  const text = "WELCOME ITZFIZZ";
  const letters = text.split("");

  useEffect(() => {
    // Media query to ensure we only run the complex layout on larger screens, 
    // or just run it but ensure maxScroll bounds are safe.
    
    // 1. Initial Load Animation
    const tl = gsap.timeline();
    
    // Animate letters in with a staggered effect
    tl.fromTo(
      lettersRef.current,
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 0.2, // Keep them dim initially
        color: "#ffffff", 
        duration: 0.8, 
        stagger: 0.05, 
        ease: "power2.out" 
      }
    )
    // Then animate the boxes in
    .fromTo(
      boxesRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      "-=0.4"
    );

    // 2. Scroll-based Animation setup
    // We wait for initial render layout
    const ctx = gsap.context(() => {
      if (!carRef.current || !trailRef.current || !valueTextRef.current) return;
      
      const maxScroll = window.innerHeight;
      const roadWidth = window.innerWidth;
      const carWidth = 200; // approximation of the car svg width in landscape
      const endX = roadWidth - carWidth;

      const valueRect = valueTextRef.current.getBoundingClientRect();
      const letterElements = lettersRef.current.filter(l => l !== null) as HTMLSpanElement[];
      
      // Calculate each letter's offset from the start of the container
      const letterOffsets = letterElements.map((letter) => letter.offsetLeft);

      gsap.to(carRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top", 
          scrub: true,
          pin: trackRef.current,
        },
        x: endX,
        ease: "none",
        onUpdate: function () {
          // The car is inside the road, its X is this.targets()[0].getBoundingClientRect?
          // Instead we can just read the inline style or gsap property:
          const carX = gsap.getProperty(carRef.current, "x") as number;
          const carCenter = carX + carWidth / 2;
          
          // Expand the trail behind the car
          gsap.set(trailRef.current, { width: carCenter });

          // check letter intersections
          letterElements.forEach((letter, i) => {
            const letterX = valueRect.left + letterOffsets[i];
            // If car center passed the letter
            if (carCenter >= letterX) {
              gsap.to(letter, {
                opacity: 1,
                color: "#111111",
                duration: 0.1,
                overwrite: "auto"
              });
            } else {
              gsap.to(letter, {
                opacity: 0.2,
                color: "#ffffff",
                duration: 0.1,
                overwrite: "auto"
              });
            }
          });
        },
      });

      // Stats boxes parallax or slight reveals using scroll bounds
      // We already revealed them on load, but we can make them move slightly with scroll
      boxesRef.current.forEach((box, i) => {
        if (!box) return;
        const speed = i % 2 === 0 ? 1.5 : 1.2;
        gsap.to(box, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          y: -100 * speed,
          ease: "none"
        });
      });

    }, containerRef); // Scope to container

    return () => ctx.revert(); // cleanup on unmount
  }, []);

  return (
    <div ref={containerRef} className="relative h-[200vh] bg-neutral-900 w-full">
      <div 
        ref={trackRef} 
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-neutral-800"
      >
        {/* Road Background */}
        <div className="relative w-full h-[250px] bg-neutral-900 flex items-center shadow-2xl">
          
          {/* Green Trail Container */}
          <div 
            ref={trailRef}
            className="absolute left-0 top-0 h-full bg-[#def54f] z-10 w-0"
            style={{ transition: "none" }}
          />

          {/* Car */}
          <div 
            ref={carRef}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-[200px]"
          >
            <Car className="w-full h-auto drop-shadow-2xl" />
          </div>

          {/* Value Text */}
          <div 
            ref={valueTextRef}
            className="absolute left-[5%] top-1/2 -translate-y-[45%] z-30 flex gap-2 sm:gap-4 md:gap-6 lg:gap-8 font-black text-4xl sm:text-6xl md:text-8xl lg:text-9xl tracking-tighter"
          >
            {letters.map((char, index) => (
              <span
                key={index}
                ref={(el) => { lettersRef.current[index] = el; }}
                className="inline-block whitespace-pre"
              >
                {char}
              </span>
            ))}
          </div>

        </div>

        {/* Floating Stat Boxes */}
        <div 
          ref={(el) => { boxesRef.current[0] = el; }}
          className="absolute top-[10%] right-[30%] bg-[#def54f] text-neutral-900 p-6 md:p-8 rounded-xl shadow-lg z-40 max-w-[200px] md:max-w-[260px] opacity-0"
        >
          <div className="text-4xl md:text-5xl font-bold mb-2">58%</div>
          <p className="text-sm md:text-base font-medium">Increase in pick up point use</p>
        </div>

        <div 
          ref={(el) => { boxesRef.current[1] = el; }}
          className="absolute bottom-[10%] right-[35%] bg-[#6ac9ff] text-neutral-900 p-6 md:p-8 rounded-xl shadow-lg z-40 max-w-[200px] md:max-w-[260px] opacity-0"
        >
          <div className="text-4xl md:text-5xl font-bold mb-2">23%</div>
          <p className="text-sm md:text-base font-medium">Decreased in customer phone calls</p>
        </div>

        <div 
          ref={(el) => { boxesRef.current[2] = el; }}
          className="absolute top-[15%] right-[5%] bg-neutral-800 text-white p-6 md:p-8 rounded-xl shadow-lg z-40 max-w-[200px] md:max-w-[260px] opacity-0 border border-neutral-700"
        >
          <div className="text-4xl md:text-5xl font-bold mb-2">27%</div>
          <p className="text-sm md:text-base text-neutral-300">Increase in pick up point use</p>
        </div>

        <div 
          ref={(el) => { boxesRef.current[3] = el; }}
          className="absolute bottom-[15%] right-[10%] bg-[#fa7328] text-neutral-900 p-6 md:p-8 rounded-xl shadow-lg z-40 max-w-[200px] md:max-w-[260px] opacity-0"
        >
          <div className="text-4xl md:text-5xl font-bold mb-2">40%</div>
          <p className="text-sm md:text-base font-medium">Decreased in customer phone calls</p>
        </div>

      </div>
    </div>
  );
}

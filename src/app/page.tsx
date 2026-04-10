"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const valueTextRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  
  const boxesRef = useRef<(HTMLDivElement | null)[]>([]);

  // The original has a space but as an entity, so we can use a literal space
  const textChars = ["W","E","L","C","O","M","E"," ","I","T","Z","F","I","Z","Z"];

  useEffect(() => {
    // Media query / context
    const ctx = gsap.context(() => {
      if (!carRef.current || !trailRef.current || !valueTextRef.current || !sectionRef.current) return;
      
      const maxScroll = window.innerHeight;
      const roadWidth = window.innerWidth;
      const carWidth = 150; 
      const endX = roadWidth - carWidth;

      const valueRect = valueTextRef.current.getBoundingClientRect();
      const letterElements = lettersRef.current.filter(l => l !== null) as HTMLSpanElement[];
      
      const letterOffsets = letterElements.map((letter) => letter.offsetLeft);

      // Car X Animation and Letter Reveal
      gsap.to(carRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top", 
          scrub: true,
          pin: trackRef.current,
        },
        x: endX,
        ease: "none",
        onUpdate: function () {
          const carX = gsap.getProperty(carRef.current, "x") as number;
          const carCenter = carX + carWidth / 2;

          gsap.set(trailRef.current, { width: carCenter });

          // Letter-by-letter exact logic from original
          letterElements.forEach((letter, i) => {
            const letterX = valueRect.left + letterOffsets[i];
            if (carCenter >= letterX) {
              letter.style.opacity = "1";
            } else {
              letter.style.opacity = "0";
            }
          });
        },
      });

      // Box 1
      if (boxesRef.current[0]) {
        gsap.to(boxesRef.current[0], {
          scrollTrigger: { trigger: sectionRef.current, start: "top+=400 top", end: "top+=600 top", scrub: true },
          opacity: 1,
        });
      }
      // Box 2
      if (boxesRef.current[1]) {
        gsap.to(boxesRef.current[1], {
          scrollTrigger: { trigger: sectionRef.current, start: "top+=600 top", end: "top+=800 top", scrub: true },
          opacity: 1,
        });
      }
      // Box 3
      if (boxesRef.current[2]) {
        gsap.to(boxesRef.current[2], {
          scrollTrigger: { trigger: sectionRef.current, start: "top+=800 top", end: "top+=1000 top", scrub: true },
          opacity: 1,
        });
      }
      // Box 4
      if (boxesRef.current[3]) {
        gsap.to(boxesRef.current[3], {
          scrollTrigger: { trigger: sectionRef.current, start: "top+=1000 top", end: "top+=1200 top", scrub: true },
          opacity: 1,
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative h-[200vh] bg-[#121212] w-full font-sans">
      <div 
        ref={trackRef} 
        className="sticky top-0 h-[100vh] w-full flex items-center justify-center bg-[#d1d1d1]"
      >
        {/* Road */}
        <div className="relative w-[100vw] h-[200px] bg-[#1e1e1e] overflow-hidden">
          
          {/* Car */}
          <div 
            ref={carRef}
            className="absolute left-0 top-[0%] z-[10] h-[200px] flex items-center"
          >
            <img src="./car.png" alt="car" className="h-auto w-auto max-w-[400px] drop-shadow-2xl" />
          </div>

          {/* Green Trail Container */}
          <div 
            ref={trailRef}
            className="absolute left-0 top-0 h-[200px] bg-[#45db7d] z-[1] w-0"
          />

          {/* Value Text */}
          <div 
            ref={valueTextRef}
            className="absolute left-[5%] !top-[15%] z-[5] flex gap-[0.3rem] font-bold text-[8rem]"
          >
            {textChars.map((char, index) => (
              <span
                key={index}
                ref={(el) => { lettersRef.current[index] = el; }}
                className="text-[#111] opacity-0"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>

        </div>

        {/* Text Boxes */}
        <div 
          ref={(el) => { boxesRef.current[0] = el; }}
          className="absolute opacity-0 z-[5] flex justify-center items-start flex-col gap-[5px] p-[30px] rounded-[10px] m-[1rem] bg-[#def54f] text-[#111] text-[18px]"
          style={{ top: "5%", right: "30%" }}
        >
          <span className="text-[58px] font-semibold">58%</span> 
          Increase in pick up point use
        </div>

        <div 
          ref={(el) => { boxesRef.current[1] = el; }}
          className="absolute opacity-0 z-[5] flex justify-center items-start flex-col gap-[5px] p-[30px] rounded-[10px] m-[1rem] bg-[#6ac9ff] text-[#111]"
          style={{ bottom: "5%", right: "35%" }}
        >
          <span className="text-[58px] font-semibold">23%</span> 
          Decreased in customer phone calls
        </div>

        <div 
          ref={(el) => { boxesRef.current[2] = el; }}
          className="absolute opacity-0 z-[5] flex justify-center items-start flex-col gap-[5px] p-[30px] rounded-[10px] m-[1rem] bg-[#333] text-[#fff]"
          style={{ top: "5%", right: "10%" }}
        >
          <span className="text-[58px] font-semibold">27%</span> 
          Increase in pick up point use
        </div>

        <div 
          ref={(el) => { boxesRef.current[3] = el; }}
          className="absolute opacity-0 z-[5] flex justify-center items-start flex-col gap-[5px] p-[30px] rounded-[10px] m-[1rem] bg-[#fa7328] text-[#111]"
          style={{ bottom: "5%", right: "12.5%" }}
        >
          <span className="text-[58px] font-semibold">40%</span> 
          Decreased in customer phone calls
        </div>

      </div>
    </div>
  );
}

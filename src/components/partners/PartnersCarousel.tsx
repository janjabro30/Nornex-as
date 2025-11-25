"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Partner } from "@/types";

interface PartnersCarouselProps {
  partners: Partner[];
  speed?: number;
}

export function PartnersCarousel({ partners, speed = 35 }: PartnersCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number | null>(null);
  const positionRef = useRef(0);
  const isPausedRef = useRef(isPaused);

  const activePartners = partners.filter(
    (p) => p.isActive && p.showInCarousel && p.logoUrl
  );

  // Keep ref in sync with state
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const animate = () => {
      if (!containerRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      if (!isPausedRef.current) {
        positionRef.current -= speed / 60;
        
        const singleSetWidth = containerRef.current.scrollWidth / 2;
        
        if (Math.abs(positionRef.current) >= singleSetWidth) {
          positionRef.current = 0;
        }

        containerRef.current.style.transform = `translateX(${positionRef.current}px)`;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [speed]);

  if (activePartners.length === 0) {
    return null;
  }

  const duplicatedPartners = [...activePartners, ...activePartners];

  return (
    <div
      className="partners-carousel-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Partners carousel"
    >
      <div
        ref={containerRef}
        className="partners-carousel-track"
        style={{ willChange: "transform" }}
      >
        {duplicatedPartners.map((partner, index) => (
          <div
            key={`${partner.id}-${index}`}
            className="partner-logo-item"
          >
            <a
              href={partner.websiteUrl || "#"}
              target={partner.websiteUrl ? "_blank" : undefined}
              rel={partner.websiteUrl ? "noopener noreferrer" : undefined}
              className="partner-logo-link"
              aria-label={`Visit ${partner.companyName} website`}
            >
              <div className="partner-logo-wrapper">
                <Image
                  src={partner.logoUrl}
                  alt={partner.companyName}
                  width={150}
                  height={80}
                  className="partner-logo-image"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

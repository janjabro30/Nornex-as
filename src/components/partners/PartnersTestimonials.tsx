"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import type { Partner } from "@/types";
import { cn } from "@/lib/utils";

const TRANSITION_DURATION = 300;

interface PartnersTestimonialsProps {
  partners: Partner[];
  autoAdvanceInterval?: number;
}

export function PartnersTestimonials({
  partners,
  autoAdvanceInterval = 6000,
}: PartnersTestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const testimonialsPartners = partners.filter(
    (p) =>
      p.isActive &&
      p.showTestimonial &&
      p.testimonialText &&
      p.spokespersonName
  );

  const goToNext = useCallback(() => {
    if (testimonialsPartners.length === 0) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) =>
        prev === testimonialsPartners.length - 1 ? 0 : prev + 1
      );
      setIsTransitioning(false);
    }, TRANSITION_DURATION);
  }, [testimonialsPartners.length]);

  const goToPrevious = useCallback(() => {
    if (testimonialsPartners.length === 0) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) =>
        prev === 0 ? testimonialsPartners.length - 1 : prev - 1
      );
      setIsTransitioning(false);
    }, TRANSITION_DURATION);
  }, [testimonialsPartners.length]);

  const goToSlide = useCallback((index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, TRANSITION_DURATION);
  }, []);

  useEffect(() => {
    if (isPaused || testimonialsPartners.length <= 1) return;

    const interval = setInterval(goToNext, autoAdvanceInterval);
    return () => clearInterval(interval);
  }, [isPaused, goToNext, autoAdvanceInterval, testimonialsPartners.length]);

  if (testimonialsPartners.length === 0) {
    return null;
  }

  const currentPartner = testimonialsPartners[currentIndex];

  return (
    <div
      className="testimonials-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Partner testimonials"
      aria-live="polite"
    >
      <div className={cn("testimonial-card", isTransitioning && "opacity-0")}>
        <Quote className="testimonial-quote-icon" />
        
        {currentPartner.logoUrl && (
          <div className="testimonial-logo">
            <Image
              src={currentPartner.logoUrl}
              alt={currentPartner.companyName}
              width={100}
              height={50}
              style={{ objectFit: "contain" }}
            />
          </div>
        )}

        <blockquote className="testimonial-text">
          &ldquo;{currentPartner.testimonialText}&rdquo;
        </blockquote>

        <div className="testimonial-rating">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "w-5 h-5",
                i < currentPartner.starRating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              )}
            />
          ))}
        </div>

        <div className="testimonial-attribution">
          <p className="testimonial-name">{currentPartner.spokespersonName}</p>
          {currentPartner.spokespersonTitle && (
            <p className="testimonial-title">
              {currentPartner.spokespersonTitle}
            </p>
          )}
          <p className="testimonial-company">{currentPartner.companyName}</p>
        </div>
      </div>

      {testimonialsPartners.length > 1 && (
        <>
          <div className="testimonial-navigation">
            <button
              onClick={goToPrevious}
              className="testimonial-nav-button"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="testimonial-nav-button"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="testimonial-dots" role="tablist">
            {testimonialsPartners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "testimonial-dot",
                  index === currentIndex && "testimonial-dot-active"
                )}
                role="tab"
                aria-selected={index === currentIndex}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

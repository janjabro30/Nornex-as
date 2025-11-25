"use client";

import React from "react";
import Link from "next/link";
import { Check, ArrowRight, type LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  learnMoreText?: string;
  learnMoreLink?: string;
  className?: string;
}

export function ServiceCard({
  icon: Icon,
  title,
  tagline,
  description,
  features,
  ctaText,
  ctaLink,
  learnMoreText = "Les mer",
  learnMoreLink,
  className,
}: ServiceCardProps) {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
        className
      )}
    >
      <CardHeader className="space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center group-hover:bg-green-600 transition-colors duration-300">
          <Icon className="w-8 h-8 text-green-600 group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
        </div>
        <div>
          <CardTitle className="text-xl mb-1">{title}</CardTitle>
          <CardDescription className="text-green-600 font-medium">
            {tagline}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
              <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        <div className="flex flex-col gap-2 pt-2">
          <Link href={ctaLink}>
            <Button className="w-full group/btn">
              {ctaText}
              <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
          {learnMoreLink && (
            <Link
              href={learnMoreLink}
              className="text-sm text-green-600 hover:text-green-700 text-center py-2 hover:underline transition-colors"
            >
              {learnMoreText} →
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import React from "react";
import { Check, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Step {
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ServiceStepsProps {
  title?: string;
  steps: Step[];
  currentStep?: number;
  className?: string;
}

export function ServiceSteps({
  title = "Slik fungerer det",
  steps,
  currentStep = 1,
  className,
}: ServiceStepsProps) {
  return (
    <div className={cn("py-8", className)}>
      {title && (
        <h3 className="text-xl font-semibold text-gray-900 mb-8 text-center">
          {title}
        </h3>
      )}
      
      {/* Desktop: Horizontal layout */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-8 left-0 right-0 h-0.5 bg-gray-200" />
          <div
            className="absolute top-8 left-0 h-0.5 bg-green-600 transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
          
          <div className="relative flex justify-between">
            {steps.map((step) => {
              const isCompleted = step.number < currentStep;
              const isActive = step.number === currentStep;
              const StepIcon = step.icon;
              
              return (
                <div
                  key={step.number}
                  className="flex flex-col items-center text-center"
                  style={{ width: `${100 / steps.length}%` }}
                >
                  <div
                    className={cn(
                      "w-16 h-16 rounded-full flex items-center justify-center mb-4 relative z-10 transition-all duration-300",
                      isCompleted
                        ? "bg-green-600 text-white"
                        : isActive
                        ? "bg-green-600 text-white ring-4 ring-green-100"
                        : "bg-gray-200 text-gray-500"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <StepIcon className="w-6 h-6" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mb-2",
                      isCompleted || isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    )}
                  >
                    {step.number}
                  </div>
                  <h4
                    className={cn(
                      "font-semibold mb-1 text-sm",
                      isCompleted || isActive ? "text-gray-900" : "text-gray-500"
                    )}
                  >
                    {step.title}
                  </h4>
                  <p
                    className={cn(
                      "text-xs max-w-[160px]",
                      isCompleted || isActive ? "text-gray-600" : "text-gray-400"
                    )}
                  >
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Mobile: Vertical layout */}
      <div className="md:hidden space-y-6">
        {steps.map((step, index) => {
          const isCompleted = step.number < currentStep;
          const isActive = step.number === currentStep;
          const StepIcon = step.icon;
          const isLast = index === steps.length - 1;
          
          return (
            <div key={step.number} className="relative flex gap-4">
              {/* Vertical line */}
              {!isLast && (
                <div
                  className={cn(
                    "absolute left-6 top-16 w-0.5 h-full -ml-px",
                    isCompleted ? "bg-green-600" : "bg-gray-200"
                  )}
                />
              )}
              
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300",
                  isCompleted
                    ? "bg-green-600 text-white"
                    : isActive
                    ? "bg-green-600 text-white ring-4 ring-green-100"
                    : "bg-gray-200 text-gray-500"
                )}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="font-bold text-sm">{step.number}</span>
                )}
              </div>
              
              <div className="flex-1 pb-6">
                <div className="flex items-center gap-2 mb-1">
                  <StepIcon
                    className={cn(
                      "w-4 h-4",
                      isCompleted || isActive ? "text-green-600" : "text-gray-400"
                    )}
                  />
                  <h4
                    className={cn(
                      "font-semibold",
                      isCompleted || isActive ? "text-gray-900" : "text-gray-500"
                    )}
                  >
                    {step.title}
                  </h4>
                </div>
                <p
                  className={cn(
                    "text-sm",
                    isCompleted || isActive ? "text-gray-600" : "text-gray-400"
                  )}
                >
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Progress bar variant for forms
export interface StepProgressProps {
  steps: { label: string }[];
  currentStep: number;
  className?: string;
}

export function StepProgress({ steps, currentStep, className }: StepProgressProps) {
  return (
    <div className={cn("py-4", className)}>
      <div className="flex items-center justify-between mb-2">
        {steps.map((step, index) => {
          const stepNum = index + 1;
          const isCompleted = stepNum < currentStep;
          const isActive = stepNum === currentStep;
          
          return (
            <React.Fragment key={stepNum}>
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300",
                    isCompleted
                      ? "bg-green-600 text-white"
                      : isActive
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  )}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : stepNum}
                </div>
                <span
                  className={cn(
                    "text-xs mt-1 hidden sm:block",
                    isCompleted || isActive ? "text-green-600 font-medium" : "text-gray-400"
                  )}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-1 mx-2",
                    isCompleted ? "bg-green-600" : "bg-gray-200"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

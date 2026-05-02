import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { label: "Initial Screening", short: "Screen" },
  { label: "Detailed Questions", short: "Details" },
  { label: "Red Flags", short: "Flags" },
  { label: "Summary & Notes", short: "Summary" },
];

export default function ProgressStepper({ currentStep }) {
  return (
    <div className="w-full px-2">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <React.Fragment key={step.label}>
              <div className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300",
                    isCompleted && "bg-primary text-primary-foreground shadow-md",
                    isCurrent && "bg-primary text-primary-foreground shadow-lg ring-4 ring-primary/20",
                    !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
                </div>
                <span
                  className={cn(
                    "text-xs font-medium hidden sm:block",
                    isCurrent ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>
                <span
                  className={cn(
                    "text-xs font-medium sm:hidden",
                    isCurrent ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {step.short}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 mx-2 sm:mx-4 mb-6">
                  <div className="h-0.5 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full bg-primary rounded-full transition-all duration-500",
                        isCompleted ? "w-full" : "w-0"
                      )}
                    />
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

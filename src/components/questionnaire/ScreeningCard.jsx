import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, Activity, HeartPulse, Stethoscope, Bone, Baby, User, Droplets } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const iconMap = {
  Activity, HeartPulse, Stethoscope, Bone, Baby, User, Droplets,
};

export default function ScreeningCard({ treatment, answer, onAnswer, index }) {
  const Icon = iconMap[treatment.icon] || Activity;
  const colorParts = treatment.color.split(" ");
  const textColor = colorParts[0];
  const bgColor = colorParts[1];
  const borderColor = colorParts[2];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
    >
      <Card
        className={cn(
          "transition-all duration-300 border-2 overflow-hidden",
          answer === true && "border-primary/40 shadow-md bg-primary/[0.02]",
          answer === false && "border-border opacity-60",
          answer === undefined && "border-border hover:border-primary/30 hover:shadow-sm"
        )}
      >
        <CardContent className="p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div className={cn("p-2.5 rounded-xl border shrink-0", bgColor, borderColor)}>
              <Icon className={cn("w-5 h-5", textColor)} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm sm:text-base text-foreground mb-1.5">
                {treatment.name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {treatment.screeningQuestion}
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={answer === true ? "default" : "outline"}
                  className={cn(
                    "gap-1.5 transition-all",
                    answer === true && "bg-primary shadow-sm"
                  )}
                  onClick={() => onAnswer(treatment.id, true)}
                >
                  <Check className="w-3.5 h-3.5" />
                  Yes
                </Button>
                <Button
                  size="sm"
                  variant={answer === false ? "default" : "outline"}
                  className={cn(
                    "gap-1.5 transition-all",
                    answer === false && "bg-muted-foreground shadow-sm"
                  )}
                  onClick={() => onAnswer(treatment.id, false)}
                >
                  <X className="w-3.5 h-3.5" />
                  No
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

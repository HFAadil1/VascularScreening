import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { RED_FLAG_QUESTIONS } from "@/lib/screeningData";

export default function RedFlagChecklist({ answers, onAnswer }) {
  const hasRedFlags = Object.values(answers || {}).some((v) => v === true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Card className="border-2 border-destructive/30 overflow-hidden">
        <CardHeader className="pb-3 bg-destructive/5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-destructive/10 border border-destructive/20">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <CardTitle className="text-lg text-destructive">
                Red Flag Screening
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                These should trigger same-day provider review or urgent care
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4 space-y-2">
          {RED_FLAG_QUESTIONS.map((question, qIndex) => {
            const answer = answers?.[qIndex];
            return (
              <motion.div
                key={qIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: qIndex * 0.04 }}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-lg transition-colors",
                  answer === true && "bg-destructive/10 border border-destructive/20",
                  answer === false && "bg-muted/50",
                  answer === undefined && "bg-transparent hover:bg-muted/30"
                )}
              >
                <span className="text-xs font-medium text-muted-foreground mt-1.5 w-5 shrink-0 text-right">
                  {qIndex + 1}.
                </span>
                <p className="flex-1 text-sm leading-relaxed pt-0.5">{question}</p>
                <div className="flex gap-1.5 shrink-0">
                  <Button
                    size="sm"
                    variant={answer === true ? "default" : "outline"}
                    className={cn(
                      "h-7 w-12 text-xs",
                      answer === true && "bg-destructive hover:bg-destructive/90"
                    )}
                    onClick={() => onAnswer(qIndex, true)}
                  >
                    Yes
                  </Button>
                  <Button
                    size="sm"
                    variant={answer === false ? "default" : "outline"}
                    className={cn(
                      "h-7 w-12 text-xs",
                      answer === false && "bg-muted-foreground"
                    )}
                    onClick={() => onAnswer(qIndex, false)}
                  >
                    No
                  </Button>
                </div>
              </motion.div>
            );
          })}

          {hasRedFlags && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 p-4 bg-destructive/10 border border-destructive/30 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-destructive shrink-0" />
                <p className="text-sm font-semibold text-destructive">
                  RED FLAG DETECTED — Notify provider immediately for urgent evaluation.
                </p>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

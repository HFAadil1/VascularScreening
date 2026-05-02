import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, X, Activity, HeartPulse, Stethoscope, Bone, Baby, User, Droplets } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const iconMap = {
  Activity, HeartPulse, Stethoscope, Bone, Baby, User, Droplets,
};

export default function QuestionChecklist({ treatment, answers, onAnswer, notes, onNotesChange }) {
  const Icon = iconMap[treatment.icon] || Activity;
  const colorParts = treatment.color.split(" ");
  const textColor = colorParts[0];
  const bgColor = colorParts[1];
  const borderColor = colorParts[2];

  const answeredCount = treatment.followUpQuestions.filter((q, i) => {
    if (q.type === "text") return !!(answers?.[i]);
    return answers?.[i] !== undefined;
  }).length;
  const totalCount = treatment.followUpQuestions.length;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-2 border-border overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className={cn("p-2.5 rounded-xl border shrink-0", bgColor, borderColor)}>
              <Icon className={cn("w-5 h-5", textColor)} />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg">{treatment.name}</CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                {answeredCount} of {totalCount} answered
              </p>
            </div>
            <div className="text-right">
              <div className="w-12 h-12 relative">
                <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="3"
                    strokeDasharray={`${(answeredCount / totalCount) * 100}, 100`}
                    className="transition-all duration-500"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
                  {Math.round((answeredCount / totalCount) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-2">
          <AnimatePresence>
            {treatment.followUpQuestions.map((question, qIndex) => {
              const answer = answers?.[qIndex];
              const isTextQuestion = question.type === "text";

              return (
                <motion.div
                  key={qIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: qIndex * 0.03 }}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-lg transition-colors",
                    !isTextQuestion && answer === true && "bg-primary/5",
                    !isTextQuestion && answer === false && "bg-muted/50",
                    isTextQuestion && answer && "bg-primary/5",
                    !answer && !isTextQuestion && answer === undefined && "bg-transparent hover:bg-muted/30"
                  )}
                >
                  <span className="text-xs font-medium text-muted-foreground mt-1.5 w-5 shrink-0 text-right">
                    {qIndex + 1}.
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm leading-relaxed mb-2">{question.text}</p>
                    {isTextQuestion ? (
                      <Input
                        placeholder={question.placeholder || "Type your answer..."}
                        value={answer || ""}
                        onChange={(e) => onAnswer(qIndex, e.target.value)}
                        className="text-sm h-8"
                      />
                    ) : (
                      <div className="flex gap-1.5">
                        <Button
                          size="sm"
                          variant={answer === true ? "default" : "outline"}
                          className={cn("h-7 w-12 text-xs", answer === true && "bg-primary")}
                          onClick={() => onAnswer(qIndex, true)}
                        >
                          Yes
                        </Button>
                        <Button
                          size="sm"
                          variant={answer === false ? "default" : "outline"}
                          className={cn("h-7 w-12 text-xs", answer === false && "bg-muted-foreground")}
                          onClick={() => onAnswer(qIndex, false)}
                        >
                          No
                        </Button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          <div className="pt-4 border-t mt-4">
            <label className="text-sm font-medium text-foreground mb-2 block">
              Additional Notes (optional)
            </label>
            <Textarea
              placeholder="Enter any additional observations or patient comments..."
              value={notes || ""}
              onChange={(e) => onNotesChange(e.target.value)}
              className="min-h-[80px] text-sm"
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

import React, { Fragment } from "react";

function renderInline(text) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i} className="font-semibold">{part}</strong> : <Fragment key={i}>{part}</Fragment>
  );
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardList, Copy, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function TreatmentPlanView({ plan, isLoading }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(plan);
    toast.success("Treatment plan copied to clipboard");
  };

  return (
    <Card className="border-2 border-border overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-accent/10 border border-accent/20">
              <ClipboardList className="w-5 h-5 text-accent" />
            </div>
            <CardTitle className="text-lg">Treatment Plan</CardTitle>
          </div>
          {plan && (
            <Button size="sm" variant="outline" className="gap-1.5" onClick={handleCopy}>
              <Copy className="w-3.5 h-3.5" />
              Copy
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto" />
              <p className="text-sm text-muted-foreground">Generating treatment plan...</p>
            </div>
          </div>
        ) : plan ? (
          <div className="space-y-0 font-sans text-sm text-foreground">
            {plan.split(/\n/).map((line, i) => {
              const trimmed = line.trim();
              const headingMatch = trimmed.match(/^\*\*(.+)\*\*$/);
              const isBullet = trimmed.startsWith("- ");
              if (headingMatch) {
                return (
                  <div key={i} className="pt-5 first:pt-0">
                    <p className="text-xs font-bold uppercase tracking-widest text-accent border-b border-accent/20 pb-1 mb-2">
                      {headingMatch[1]}
                    </p>
                  </div>
                );
              }
              if (isBullet) {
                return (
                  <div key={i} className="flex gap-2 pl-1 py-0.5">
                    <span className="text-accent mt-1.5 shrink-0">•</span>
                    <p className="leading-relaxed">{renderInline(trimmed.slice(2))}</p>
                  </div>
                );
              }
              if (trimmed === "") return <div key={i} className="h-1" />;
              return <p key={i} className="leading-relaxed py-0.5">{renderInline(line)}</p>;
            })}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground py-8 text-center">
            Treatment plan will appear here after generation.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

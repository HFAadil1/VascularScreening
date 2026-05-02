import React, { useState } from "react";
import { Mic, MicOff, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function TranscriptionRecorder({
  isRecording,
  transcript,
  isSupported,
  onStart,
  onStop,
  onClear,
}) {
  const [expanded, setExpanded] = useState(false);

  if (!isSupported) return null;

  return (
    <div
      className={cn(
        "rounded-xl border transition-all duration-200",
        isRecording
          ? "border-red-300 bg-red-50/60"
          : "border-border bg-card"
      )}
    >
      {/* Header row */}
      <div className="flex items-center gap-3 px-4 py-3">
        <button
          onClick={isRecording ? onStop : onStart}
          className={cn(
            "flex items-center gap-2 text-sm font-medium rounded-lg px-3 py-1.5 transition-colors",
            isRecording
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          {isRecording ? (
            <>
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <MicOff className="w-3.5 h-3.5" />
              Stop Recording
            </>
          ) : (
            <>
              <Mic className="w-3.5 h-3.5" />
              Record Conversation
            </>
          )}
        </button>

        <span className="text-xs text-muted-foreground flex-1">
          {isRecording
            ? "Listening — speak freely with the patient"
            : transcript
            ? "Recording paused"
            : "Optionally record the verbal conversation for inclusion in notes"}
        </span>

        {transcript && (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
              onClick={onClear}
              title="Clear transcript"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 text-muted-foreground"
              onClick={() => setExpanded((e) => !e)}
              title={expanded ? "Collapse" : "Expand"}
            >
              {expanded ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Transcript preview */}
      {transcript && expanded && (
        <div className="px-4 pb-4">
          <div className="bg-muted/50 rounded-lg p-3 max-h-48 overflow-y-auto">
            <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {transcript}
            </p>
          </div>
        </div>
      )}

      {transcript && !expanded && (
        <div
          className="px-4 pb-3 cursor-pointer"
          onClick={() => setExpanded(true)}
        >
          <p className="text-xs text-muted-foreground truncate italic">
            "{transcript.trim().slice(0, 120)}
            {transcript.length > 120 ? "…" : ""}"
          </p>
        </div>
      )}
    </div>
  );
}

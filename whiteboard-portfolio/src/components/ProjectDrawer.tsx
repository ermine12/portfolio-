"use client";

import { useEffect, useCallback } from "react";
import type { Project } from "@/data/portfolioData";
import { cn } from "@/lib/utils";
import { X, ExternalLink } from "lucide-react";

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

// ─── Architecture Diagram ───
function ArchitectureDiagram({ flow }: { flow: Project["architectureFlow"] }) {
  return (
    <div className="flex items-center flex-wrap gap-y-3 justify-center py-4">
      {flow.map((step, i) => (
        <div key={step.id} className="flex items-center">
          {/* Node */}
          <div className="bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-2.5 text-center min-w-[120px] shadow-lg">
            <span className="mono-text text-emerald-400 text-xs">{step.label}</span>
          </div>
          {/* Arrow */}
          {i < flow.length - 1 && (
            <svg
              width="40"
              height="20"
              viewBox="0 0 40 20"
              fill="none"
              className="mx-1 shrink-0"
            >
              <path
                d="M2 10 L30 10"
                stroke="#555"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M26 6 L32 10 L26 14"
                stroke="#555"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Main Drawer ───
export default function ProjectDrawer({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (project) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [project, handleEsc]);

  if (!project) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Slide-over drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-full max-w-lg",
          "bg-neutral-900 border-l border-neutral-700 shadow-2xl",
          "overflow-y-auto",
          "animate-in slide-in-from-right duration-300"
        )}
        style={{
          animation: "slideInRight 0.3s ease-out forwards",
        }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-neutral-900/95 backdrop-blur-md border-b border-neutral-800 p-5 flex items-start justify-between">
          <div>
            <h2 className="marker-text text-xl text-white font-bold">
              {project.title}
            </h2>
            <p className="text-sm text-neutral-400 mt-0.5">{project.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-neutral-800 transition-colors text-neutral-400 hover:text-white cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Tech Stack */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-neutral-500 mb-2 font-sans">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="mono-text bg-neutral-800 text-emerald-400 px-3 py-1 rounded-full text-xs border border-neutral-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Architecture Diagram */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-neutral-500 mb-2 font-sans">
              System Architecture
            </h3>
            <div className="bg-neutral-800/50 rounded-xl border border-neutral-700 p-4">
              <ArchitectureDiagram flow={project.architectureFlow} />
            </div>
          </div>

          {/* Problem */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-red-400 mb-2 font-sans">
              Problem
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {project.problem}
            </p>
          </div>

          {/* Solution */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-emerald-400 mb-2 font-sans">
              Engineering Solution
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {project.solution}
            </p>
          </div>

          {/* Impact */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-amber-400 mb-2 font-sans">
              Impact
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {project.impact}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2.5 rounded-lg text-sm font-sans transition-colors border border-neutral-700"
            >
              <GithubIcon size={16} />
              View Source on GitHub
              <ExternalLink size={12} className="opacity-50" />
            </a>
          </div>
        </div>
      </div>

      {/* Keyframe animation */}
      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}

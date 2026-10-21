"use client";

import Image from "next/image";
import { projects, profile, experience, hobbies } from "@/data/portfolioData";
import type { Project } from "@/data/portfolioData";
import { cn } from "@/lib/utils";
import {
  Mail,
  FileDown,
  ExternalLink,
  MapPin,
  GraduationCap,
} from "lucide-react";

// Brand icons (not in lucide-react)
function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
import { useState, useRef } from "react";
import ProjectDrawer from "./ProjectDrawer";

// ─── Flow Arrow SVG (hand-drawn style) ───
function FlowArrow() {
  return (
    <svg
      width="28"
      height="16"
      viewBox="0 0 28 16"
      fill="none"
      className="mx-1 shrink-0 opacity-60"
    >
      <path
        d="M2 8 C6 6, 10 10, 14 8 C18 6, 22 10, 24 8"
        stroke="#888"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M22 4 L26 8 L22 12" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

// ─── Zone Connector Arrow (between zones) ───
function ZoneConnector({ direction = "right" }: { direction?: "right" | "down" | "left" }) {
  if (direction === "down") {
    return (
      <svg width="24" height="40" viewBox="0 0 24 40" fill="none" className="opacity-40">
        <path d="M12 2 C10 10, 14 20, 12 30" stroke="#999" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round" fill="none" />
        <path d="M8 26 L12 34 L16 26" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    );
  }
  if (direction === "left") {
    return (
      <svg width="40" height="24" viewBox="0 0 40 24" fill="none" className="opacity-40">
        <path d="M38 12 C30 10, 20 14, 10 12" stroke="#999" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round" fill="none" />
        <path d="M14 8 L6 12 L14 16" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    );
  }
  return (
    <svg width="40" height="24" viewBox="0 0 40 24" fill="none" className="opacity-40">
      <path d="M2 12 C10 10, 20 14, 30 12" stroke="#999" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round" fill="none" />
      <path d="M26 8 L34 12 L26 16" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

// ─── Project Card ───
function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "project-card pushpin relative text-left",
        "bg-white/95 border border-neutral-300 rounded-md p-3 w-full",
        "shadow-md hover:shadow-lg transition-all"
      )}
    >
      <h4 className="marker-text-dark text-sm font-bold leading-tight mb-1 pr-4">
        {project.title}
      </h4>
      <p className="text-[0.6rem] text-neutral-500 mb-2 leading-snug">
        {project.subtitle}
      </p>
      {/* Mini architecture flow */}
      <div className="flex items-center flex-wrap gap-y-1 mb-2">
        {project.architectureFlow.map((step, i) => (
          <span key={step.id} className="flex items-center">
            <span className="mono-text bg-neutral-100 border border-neutral-300 text-neutral-700 px-1.5 py-0.5 rounded text-[0.55rem] whitespace-nowrap">
              {step.label}
            </span>
            {i < project.architectureFlow.length - 1 && <FlowArrow />}
          </span>
        ))}
      </div>
      {/* Tech stack */}
      <div className="flex flex-wrap gap-1">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="mono-text bg-neutral-800 text-emerald-400 px-1.5 py-0.5 rounded-full text-[0.5rem] border border-neutral-700"
          >
            {tech}
          </span>
        ))}
      </div>
      {/* Click hint */}
      <div className="absolute top-2 right-2 text-neutral-400">
        <ExternalLink size={10} />
      </div>
    </button>
  );
}

// ─── Experience Pipeline Node ───
function ExperienceNode({
  exp,
  isLast,
}: {
  exp: (typeof experience)[0];
  isLast: boolean;
}) {
  return (
    <div className="flex items-start gap-2">
      {/* Timeline dot & line */}
      <div className="flex flex-col items-center shrink-0 pt-1">
        <div className="w-2.5 h-2.5 rounded-full bg-[#c8321e] border-2 border-white shadow-sm" />
        {!isLast && <div className="w-0.5 h-full min-h-[40px] bg-neutral-300 mt-0.5" />}
      </div>
      {/* Content */}
      <div className="pb-3">
        <p className="marker-text-dark text-[0.7rem] font-bold leading-tight">
          {exp.organization}
        </p>
        <p className="text-[0.55rem] text-neutral-500 mb-0.5">
          {exp.role} • {exp.period}
        </p>
        <p className="text-[0.5rem] text-neutral-600 leading-snug">
          {exp.impact}
        </p>
      </div>
    </div>
  );
}

// ─── Sticky Note ───
function StickyNote({
  hobby,
  rotation,
}: {
  hobby: (typeof hobbies)[0];
  rotation: string;
}) {
  return (
    <div
      className={cn(
        "sticky-note rounded-sm p-3 w-full",
        rotation
      )}
    >
      <h4 className="text-sm font-bold leading-tight text-neutral-800 mb-0.5">
        {hobby.title}
      </h4>
      <p className="text-[0.55rem] text-neutral-600 font-sans mb-1">
        {hobby.subtitle}
      </p>
      <p className="text-[0.5rem] text-neutral-700 font-sans leading-snug">
        {hobby.description}
      </p>
      {hobby.highlight && (
        <span className="inline-block mt-1 mono-text bg-amber-600 text-white px-1.5 py-0.5 rounded text-[0.45rem]">
          {hobby.highlight}
        </span>
      )}
    </div>
  );
}

// ─── Main Component ───
export default function WhiteboardPortfolio() {
  const scrollContainerRef = useRef<HTMLElement>(null);
  const cameraWorldRef = useRef<HTMLDivElement>(null);
  const foregroundAvatarRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const stickyRotations = ["-rotate-1", "rotate-2", "-rotate-2", "rotate-1"];

  return (
    <>
      {/* ─── Scroll Wrapper (650vh tall) ─── */}
      <section
        ref={scrollContainerRef}
        className="relative h-[650vh] w-full bg-[#070707]"
      >
        {/* ─── Pinned Camera Viewport ─── */}
        <div className="sticky top-0 h-screen w-screen overflow-hidden">
          {/* ─── Foreground Avatar (z-20, Task 4 will animate) ─── */}
          <div
            ref={foregroundAvatarRef}
            className="absolute inset-0 z-20 flex items-end justify-center pointer-events-none"
          >
            <Image
              src={profile.avatarSrc}
              alt={profile.name}
              width={600}
              height={900}
              className="h-[62vh] md:h-[70vh] w-auto object-contain origin-bottom drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)]"
              priority
            />
          </div>

          {/* ─── Camera World Container ─── */}
          <div
            ref={cameraWorldRef}
            className="relative h-full w-full origin-center will-change-transform"
          >
            {/* Background Room Image */}
            <Image
              src={profile.roomBackgroundSrc}
              alt="Studio workspace"
              fill
              className="h-full w-full object-cover select-none pointer-events-none"
              priority
              quality={90}
            />

            {/* ─── Whiteboard Coordinate Overlay ─── */}
            <div
              className="absolute top-[26.5%] left-[1.5%] w-[97%] h-[46.5%] whiteboard-surface rounded-sm overflow-hidden"
            >
              {/* ─── 12-Column Grid Layout ─── */}
              <div className="relative w-full h-full grid grid-cols-12 grid-rows-[1fr_auto] gap-1 p-3">

                {/* ════════════════════════════════════════════════
                    ZONE B — LEFT WING (cols 1–4): Featured Projects
                    ════════════════════════════════════════════════ */}
                <div className="col-span-4 row-span-2 flex flex-col gap-2 overflow-hidden pr-1">
                  <h3 className="marker-text-dark text-base font-bold flex items-center gap-1.5 shrink-0">
                    <span className="text-[#c8321e]">✦</span> FEATURED PROJECTS
                    <span className="text-[0.5rem] text-neutral-500 font-sans font-normal ml-1">
                      (Click any system node)
                    </span>
                  </h3>
                  <div className="flex flex-col gap-2.5 overflow-y-auto pr-1 flex-1 scrollbar-thin">
                    {projects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        onClick={() => setSelectedProject(project)}
                      />
                    ))}
                  </div>
                </div>

                {/* Zone connector: Left → Center */}
                <div className="col-span-1 row-span-1 flex items-center justify-center">
                  <ZoneConnector direction="right" />
                </div>

                {/* ════════════════════════════════════════════════
                    ZONE A — CENTER (cols 5–8): Intro & Avatar
                    ════════════════════════════════════════════════ */}
                <div className="col-span-3 row-span-1 flex items-center gap-3 px-2">
                  {/* Left half: Name & Info */}
                  <div className="flex-1 min-w-0">
                    {/* Hand-drawn border box */}
                    <div className="border-2 border-dashed border-neutral-400 rounded-lg p-3 bg-white/40">
                      <h1 className="marker-text-dark text-xl md:text-2xl font-bold leading-tight tracking-tight">
                        ERMIAS SIMEGNE
                      </h1>
                      <p className="text-[0.6rem] text-neutral-600 font-sans mt-1 leading-snug tracking-wide uppercase">
                        Software Engineer
                        <span className="text-neutral-400 mx-1">•</span>
                        Backend
                        <span className="text-neutral-400 mx-1">•</span>
                        AI
                        <span className="text-neutral-400 mx-1">•</span>
                        Full-Stack
                      </p>
                      {/* Proof pills */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        <span className="mono-text bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-[0.5rem] border border-emerald-200">
                          A2SV Trainee
                        </span>
                        <span className="mono-text bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-[0.5rem] border border-amber-200">
                          10 Academy Distinction
                        </span>
                        <span className="mono-text bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full text-[0.5rem] border border-sky-200">
                          GPA {profile.education.gpa}
                        </span>
                      </div>
                      {/* Education & Location */}
                      <div className="mt-2 space-y-0.5">
                        <p className="text-[0.5rem] text-neutral-500 font-sans flex items-center gap-1">
                          <GraduationCap size={9} />
                          {profile.education.degree} — {profile.education.university}
                        </p>
                        <p className="text-[0.5rem] text-neutral-500 font-sans flex items-center gap-1">
                          <MapPin size={9} />
                          {profile.location}
                        </p>
                      </div>
                    </div>
                    {/* Marker arrow pointing right to avatar */}
                    <div className="flex justify-end mt-1 pr-1">
                      <svg width="50" height="20" viewBox="0 0 50 20" fill="none" className="opacity-50">
                        <path d="M2 15 C10 5, 25 12, 40 10" stroke="#555" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                        <path d="M36 6 L42 10 L36 14" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      </svg>
                    </div>
                  </div>
                  {/* Right half: On-board avatar */}
                  <div className="shrink-0 relative">
                    <Image
                      src={profile.avatarSrc}
                      alt={profile.name}
                      width={200}
                      height={300}
                      className="h-[120px] md:h-[160px] w-auto object-contain drop-shadow-lg"
                    />
                  </div>
                </div>

                {/* Zone connector: Center → Right */}
                <div className="col-span-1 row-span-1 flex items-center justify-center">
                  <ZoneConnector direction="right" />
                </div>

                {/* ════════════════════════════════════════════════
                    ZONE C — RIGHT WING (cols 9–12): Work & Hobbies
                    ════════════════════════════════════════════════ */}
                <div className="col-span-3 row-span-2 flex flex-col gap-2 overflow-hidden pl-1">
                  {/* Top-Right: Work Experience */}
                  <div className="flex-1 min-h-0 overflow-y-auto">
                    <h3 className="marker-text-dark text-base font-bold flex items-center gap-1.5 mb-2 shrink-0">
                      <span className="text-[#c8321e]">✦</span> WORK EXPERIENCE
                    </h3>
                    <div className="pl-1">
                      {experience.map((exp, i) => (
                        <ExperienceNode
                          key={exp.id}
                          exp={exp}
                          isLast={i === experience.length - 1}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Bottom-Right: Hobbies & Elite Training */}
                  <div>
                    <h3 className="marker-text-dark text-xs font-bold flex items-center gap-1 mb-1.5 shrink-0">
                      <span className="text-amber-500">✦</span> HOBBIES & ELITE TRAINING
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {hobbies.map((hobby, i) => (
                        <StickyNote
                          key={hobby.id}
                          hobby={hobby}
                          rotation={stickyRotations[i]}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* ════════════════════════════════════════════════
                    ZONE D — BOTTOM CENTER (cols 5–8): Links & Contact
                    ════════════════════════════════════════════════ */}
                <div className="col-start-5 col-span-4 flex items-center justify-center gap-3 py-2">
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-neutral-800 hover:bg-neutral-700 text-white px-3 py-1.5 rounded-full text-[0.6rem] font-sans transition-colors shadow-md border border-neutral-600"
                  >
                    <GithubIcon size={12} />
                    GitHub
                  </a>
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-[#0a66c2] hover:bg-[#004182] text-white px-3 py-1.5 rounded-full text-[0.6rem] font-sans transition-colors shadow-md"
                  >
                    <LinkedinIcon size={12} />
                    LinkedIn
                  </a>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(profile.email);
                    }}
                    className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-full text-[0.6rem] font-sans transition-colors shadow-md cursor-pointer"
                  >
                    <Mail size={12} />
                    Copy Email
                  </button>
                  <a
                    href={profile.cvPath}
                    download
                    className="flex items-center gap-1.5 bg-amber-700 hover:bg-amber-600 text-white px-3 py-1.5 rounded-full text-[0.6rem] font-sans transition-colors shadow-md"
                  >
                    <FileDown size={12} />
                    Download CV
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Project Drawer ─── */}
      <ProjectDrawer
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}

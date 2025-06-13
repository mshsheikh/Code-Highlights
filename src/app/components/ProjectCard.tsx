"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import type { Project } from "../data/projects";

// Map language keywords to badge background colors
const LANGUAGE_COLOR: Record<string, string> = {
  "TypeScript": "bg-blue-500",
  "JavaScript": "bg-yellow-400",
  "Next.js": "bg-black",
  "CSS": "bg-purple-600",
  "HTML": "bg-orange-500",
};

export function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const closeBtn = useRef<HTMLButtonElement>(null);

  // Trap focus on close button when modal opens
  useEffect(() => {
    if (open && closeBtn.current) {
      closeBtn.current.focus();
    }
  }, [open]);

  // derive language key
  const langKey = project.language.replace(/^[^\s]+\s/, "");

  return (
    <>
      <div
        className="relative rounded-lg overflow-hidden bg-white text-black shadow transition-shadow hover:shadow-xl"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative h-48 w-full">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            style={{ objectFit: "cover" }}
          />
          <div
            className={`absolute inset-0 flex items-center justify-center gap-4 transition-opacity 
              ${hovered ? 'bg-black bg-opacity-40 opacity-100' : 'bg-opacity-0 opacity-0'}`}
          >
            <button
              onClick={() => setOpen(true)}
              className="bg-white text-sm font-medium px-4 py-2 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              View
            </button>
            <Link
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 text-white text-sm font-medium px-4 py-2 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Visit
            </Link>
          </div>
        </div>

        <div className="p-4 flex flex-col gap-2">
          <h3 className="text-lg font-semibold">{project.title}</h3>
          <p className="text-sm text-gray-500">
            {new Date(project.date).toLocaleDateString()} • By {project.author}
          </p>
          <div className="mt-2 flex justify-between items-center">
            {/* Rating badge */}
            <span className="inline-flex items-center bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
              ★<span className="ml-1">{project.rating.toFixed(1)}</span>
            </span>
            {/* Language badge */}
            <span
              className={`inline-flex items-center text-xs px-2 py-1 rounded-full \
                ${langKey === 'JavaScript' ? 'text-black' : 'text-white'} \
                ${LANGUAGE_COLOR[langKey] || 'bg-gray-400'}`}
            >
              {langKey}
            </span>
          </div>
        </div>
      </div>

      {/* Modal preview */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="relative"
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.7 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                ref={closeBtn}
                onClick={() => setOpen(false)}
                className="absolute -top-4 -right-4 text-white bg-red-600 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Close preview"
              >
                <FaTimes size={20} />
              </button>
              <Image
                src={project.imageUrl}
                alt={project.title}
                width={800}
                height={600}
                style={{ objectFit: "contain" }}
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

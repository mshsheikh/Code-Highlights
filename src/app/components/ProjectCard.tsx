"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import type { Project } from "../data/projects";

export function ProjectCard({ project }: { project: Project }) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <>
      {/* Card */}
      <div
        className="relative block rounded-lg overflow-hidden bg-white shadow transition hover:shadow-xl"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image container */}
        <div className="relative h-48 w-full">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            style={{ objectFit: "cover" }}
            className="transition-transform duration-200"
          />

          {/* Hover buttons */}
          {hovered && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-4 transition">
              <button
                onClick={() => setPreviewOpen(true)}
                className="bg-white text-sm font-medium px-4 py-2 rounded-full shadow hover:bg-gray-100 transition"
              >
                View
              </button>
              <Link
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-600 text-white text-sm font-medium px-4 py-2 rounded-full shadow hover:bg-purple-700 transition"
              >
                Visit
              </Link>
            </div>
          )}
        </div>

        {/* Text content */}
        <div className="p-4 flex flex-col gap-2">
          <h3 className="text-lg font-semibold">{project.title}</h3>
          <p className="text-sm text-gray-500">
            {new Date(project.date).toLocaleDateString()} • By {project.author}
          </p>
          <div className="mt-2 flex justify-between items-center">
            <span className="flex items-center text-sm text-gray-700">
              <span className="mr-1">⭐</span>
              {project.rating}
            </span>
            <span className="text-sm text-gray-700">{project.language}</span>
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {previewOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewOpen(false)}
          >
            <motion.div
              className="relative"
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.7 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <div
                className="absolute -top-4 -right-4 text-white bg-red-600 rounded-full p-2 cursor-pointer"
                onClick={() => setPreviewOpen(false)}
              >
                <FaTimes size={20} />
              </div>

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

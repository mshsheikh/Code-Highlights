"use client";

import {
  FaFacebook,
  FaLinkedin,
  FaDiscord,
  FaYoutube,
  FaGithub,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { ProjectCard } from "./components/ProjectCard";
import { projects as allProjects, Project } from "./data/projects";

const sortOptions = [
  { label: "Ratings", value: "rating" },
  { label: "Date Ascending", value: "dateAsc" },
  { label: "Date Descending", value: "dateDesc" },
  { label: "On top (TypeScript)", value: "lang_TypeScript" },
  { label: "On top (JavaScript)", value: "lang_JavaScript" },
  { label: "On top (Next.js)", value: "lang_Next.js" },
  { label: "On top (CSS)", value: "lang_CSS" },
  { label: "On top (HTML)", value: "lang_HTML" },
];

export default function HomePage() {
  const [sortKey, setSortKey] = useState<string>(sortOptions[0].value);

  const sortedProjects = useMemo(() => {
    const copy = [...allProjects];
    switch (sortKey) {
      case "rating":
        return copy.sort((a, b) => b.rating - a.rating);
      case "dateAsc":
        return copy.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      case "dateDesc":
        return copy.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      default:
        if (sortKey.startsWith("lang_")) {
          const lang = sortKey.split("_")[1];
          const top = copy.filter((p) => p.language.includes(lang));
          const rest = copy.filter((p) => !p.language.includes(lang));
          return [...top, ...rest];
        }
        return copy;
    }
  }, [sortKey]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#171236] to-[#962b2b] flex flex-col items-center py-16 px-4">
      {/* Hero Section */}
      <section className="text-center mb-4 max-w-xl">
        <h1 className="text-white text-5xl font-extrabold drop-shadow-lg mb-2">
          Code Highlights
        </h1>
        <p className="text-white text-lg opacity-90">
          An expertly crafted collection of my most recent projects.
        </p>
      </section>

      {/* Sort Dropdown */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-6xl mb-8 flex items-center justify-end px-4"
      >
        <label htmlFor="sort-projects" className="text-white font-medium mr-2">
          Sort:
        </label>
        <select
          id="sort-projects"
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          className="bg-white text-gray-800 px-3 py-1 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Projects Grid */}
      <section
        aria-label="Projects Grid"
        className="w-full max-w-6xl grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
      >
        {sortedProjects.map((proj: Project) => (
          <motion.div
            key={proj.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <ProjectCard project={proj} />
          </motion.div>
        ))}
      </section>

      {/* Footer */}
      <footer className="w-full mt-16 pt-12 pb-6">
        <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-6">
          {/* Social Icons */}
          <nav aria-label="Social Media" className="flex gap-6">
            {[
              {
                icon: <FaFacebook />,
                href: "https://www.facebook.com/magiciansheikh",
                label: "Facebook",
              },
              {
                icon: <FaLinkedin />,
                href: "https://www.linkedin.com/in/mshsheikh",
                label: "LinkedIn",
              },
              {
                icon: <FaDiscord />,
                href: "https://discordapp.com/users/1228891042787627070",
                label: "Discord",
              },
              {
                icon: <FaYoutube />,
                href: "https://www.youtube.com/c/@SalmanSheikhOfficial",
                label: "YouTube",
              },
              {
                icon: <FaGithub />,
                href: "https://github.com/mshsheikh",
                label: "GitHub",
              },
            ].map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-white hover:opacity-80 transition-opacity"
              >
                <span className="text-2xl md:text-3xl">{icon}</span>
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-center text-white text-sm opacity-90">
            &copy; {new Date().getFullYear()}{" "}
            <strong>Code Highlights</strong> by Muhammad Salman Hussain.
            <br />
            All Rights Reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

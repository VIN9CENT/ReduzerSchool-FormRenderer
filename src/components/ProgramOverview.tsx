'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Clock,
  MapPin,
  Calendar,
  MonitorPlay,
  BookOpen,
  Download,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';

export default function ProgramOverview() {
  const [skillsOpen, setSkillsOpen] = useState(false);

  const skills = [
    'Build and deploy full-stack web applications from scratch.',
    'Work in teams using industry tools and workflows.',
    'Solve problems like an engineer, not just copy code.',
    'Write clean, maintainable, professional code.',
    'Use React, JavaScript, TypeScript, and Node.js confidently.',
    'Present your work in interviews and client meetings.',
    'Learn independently and continuously grow.',
    'Collaborate effectively with strong communication and teamwork skills.',
  ];

  return (
    <section id="program" className="bg-white w-full py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-black text-center px-4 py-16 rounded-2xl mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-red-600">
            Reduzer Software Engineering <br /> School
          </h2>

          <p className="text-white text-sm md:text-base max-w-xl mx-auto">
            A one-year immersive program that takes you from foundational
            concepts to a job-ready softaware developer through hands-on
            training, mentorship, and real-world projects. Designed for
            ambitious learners seeking practical skills and structured growth.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-red-600 rounded-xl p-6 flex flex-col items-center text-center">
            <Clock className="text-white w-7 h-7 mb-2" />

            <p className="text-white text-xs font-medium uppercase tracking-wide mb-1">
              Course Duration
            </p>

            <p className="text-white text-xl font-bold">52 Weeks</p>
          </div>

          <div className="bg-red-600 rounded-xl p-6 flex flex-col items-center text-center">
            <Clock className="text-white w-7 h-7 mb-2" />

            <p className="text-white text-xs font-medium uppercase tracking-wide mb-1">
              Schedule
            </p>

            <p className="text-white text-xl font-bold">Mon-Fri 8am-5pm</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-red-600 rounded-xl p-6 flex flex-col items-center text-center">
            <MapPin className="text-white w-7 h-7 mb-2" />

            <p className="text-white text-xs font-medium uppercase tracking-wide mb-1">
              Location
            </p>

            <p className="text-white text-xl font-bold">Kisii, Kenya</p>
          </div>

          <div className="bg-red-600 rounded-xl p-6 flex flex-col items-center text-center">
            <Calendar className="text-white w-7 h-7 mb-2" />

            <p className="text-white text-xs font-medium uppercase tracking-wide mb-1">
              Start Date
            </p>

            <p className="text-white text-xl font-bold">September 1st 2026</p>
          </div>
        </div>

        <div className="bg-red-600 rounded-xl p-6 flex flex-col items-center text-center mb-10">
          <MonitorPlay className="text-white w-7 h-7 mb-2" />

          <p className="text-white text-xs font-medium uppercase tracking-wide mb-1">
            Mode of Learning
          </p>

          <p className="text-white text-xl font-bold">100% Physical Classes</p>
        </div>

        <div className="bg-white  rounded-2xl p-8 mb-8 shadow-sm overflow-hidden">
          <button
            onClick={() => setSkillsOpen(!skillsOpen)}
            className="w-full flex items-center justify-between px-8 py-5 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="bg-red-600 rounded-full p-2 flex items-center justify-center">
                <BookOpen className="text-white w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-black">
                Skills You Will Gain
              </h3>
            </div>
            <ChevronDown
              className={`text-black w-5 h-5 transition-transform duration-300 ${
                skillsOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {skillsOpen && (
            <ul className="px-8 pb-6 space-y-2 border-t border-gray-100 pt-4">
              {skills.map((skill, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-black font-medium text-sm md:text-base"
                >
                  <span className="text-red-600 font-bold mt-0.5 shrink-0">
                    •
                  </span>
                  {skill}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div id="curriculum" className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">
              Curriculum Deep Dive
            </p>

            <p className="text-white font-semibold text-sm md:text-base">
              Full program breakdown.
            </p>
          </div>

          <a
            href="/curriculum.pdf"
            download
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 transition-colors duration-200 text-white font-semibold text-sm px-6 py-3 rounded-full whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            Download Here
          </a>
        </div>

        <div className="flex justify-center">
          <Link href="#apply" className="flex items-center gap-2 bg-red-600 transition-colors duration-200 text-white font-bold text-base px-10 py-4 rounded-full">
            Apply Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

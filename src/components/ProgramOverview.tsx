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
  CalendarDays,
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
    <section
      id="program"
      className="bg-white w-full py-20 px-6 md:px-16 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        <div className="bg-black text-center px-8 py-20 rounded-3xl mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#FF002E] leading-tight mb-6">
            Reduzer Software Engineering <br /> School Program
          </h2>
          <p className="text-gray-300 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            A one-year immersive program that takes you from foundational
            concepts to a job-ready software developer through hands-on
            training, mentorship, and real-world projects. Designed for
            ambitious learners seeking practical skills and structured growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#FF002E] rounded-2xl p-10 flex flex-col items-center text-center ">
            <Clock className="text-white w-10 h-10 mb-4" />
            <p className="text-white text-xl font-bold uppercase tracking-widest mb-2">
              Course Duration
            </p>
            <p className="text-white text-sm font-medium">52 Weeks</p>
          </div>

          <div className="bg-[#FF002E] rounded-2xl p-10 flex flex-col items-center text-center ">
            <CalendarDays className="text-white w-10 h-10 mb-4" />
            <p className="text-white text-xl font-bold uppercase tracking-widest mb-2">
              Schedule
            </p>
            <p className="text-white text-sm font-medium">Mon-Fri • 8am-5pm</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#FF002E] rounded-2xl p-10 flex flex-col items-center text-center ">
            <MapPin className="text-white w-10 h-10 mb-4" />
            <p className="text-white text-xl font-bold uppercase tracking-widest mb-2">
              Location
            </p>
            <p className="text-white text-sm font-medium">Kisii, Kenya</p>
          </div>

          <div className="bg-[#FF002E] rounded-2xl p-10 flex flex-col items-center text-center">
            <Calendar className="text-white w-10 h-10 mb-4" />
            <p className="text-white text-xl font-bold uppercase tracking-widest mb-2">
              Start Date
            </p>
            <p className="text-white text-sm font-medium">
              September 1st 2026
            </p>
          </div>
        </div>

        <div className="bg-[#FF002E] rounded-2xl p-10 flex flex-col items-center text-center mb-12 ">
          <MonitorPlay className="text-white w-10 h-10 mb-4" />
          <p className="text-white text-xl font-bold uppercase tracking-widest mb-2">
            Mode of Learning
          </p>
          <p className="text-white text-sm font-medium">
            100% Physical Classes
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl mb-8 shadow-md overflow-hidden">
          <button
            onClick={() => setSkillsOpen(!skillsOpen)}
            className="w-full flex items-center justify-between px-10 py-7 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex items-center gap-4">
              <div className="bg-[#FF002E] rounded-full p-3 flex items-center justify-center">
                <BookOpen className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-black">
                Skills You Will Gain
              </h3>
            </div>
            <ChevronDown
              className={`text-black w-6 h-6 transition-transform duration-300 ${
                skillsOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {skillsOpen && (
            <ul className="px-10 pb-8 space-y-3 border-t border-gray-100 pt-6">
              {skills.map((skill, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-gray-800 font-medium text-base"
                >
                  <span className="text-[#FF002E] font-bold mt-0.5 shrink-0 text-lg">
                    •
                  </span>
                  {skill}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div
          id="curriculum"
          className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div>
            <p className="text-[#FF002E] text-xs font-semibold uppercase tracking-widest mb-2">
              Curriculum Deep Dive
            </p>
            <p className="text-white font-bold text-xl mb-1">
              Full Program Breakdown
            </p>
            <p className="text-gray-400 text-sm">
              Phases, tools, outcomes &amp; schedule; everything you need to
              know.
            </p>
          </div>
          <a
            href="/curriculum.pdf"
            download
            className="flex items-center gap-3 bg-[#FF002E] transition-colors duration-200 text-white font-bold text-base px-8 py-4 rounded-full whitespace-nowrap"
          >
            <Download className="w-5 h-5" />
            Download Here
          </a>
        </div>

        <div className="flex justify-center">
          <Link
            href="#apply"
            className="flex items-center gap-3 bg-[#FF002E] hover:bg-black transition-colors duration-200 text-white font-bold text-lg px-14 py-5 rounded-full"
          >
            Apply Now
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </section>
  );
}

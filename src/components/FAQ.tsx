import {ChevronDown } from "lucide-react"

const faqs = [
  {
    id: 0,
    question: "What is Reduzer School?",
    answer: "Reduzer School is a rigorous, one-year, fully in-person software engineering bootcamp based in Kisii, Kenya. We train ambitious Kenyans from complete beginners to career changers in Frontend, Backend, and Fullstack software development using industry-standard technologies. Our program is built and run by the same team behind Reduzer Technologies, a company already placing Kenyan engineers with global companies."
  },
  {
    id: 1,
    question: "What makes Reduzer School different from other programs?",
    answer: "We are fully in-person, not online or hybrid. We run for a full 52 weeks. We are based in Kisii. We include real client project work not just classroom exercises. We are built by a company already operating at the standard we train you to reach."
  },
  {
    id: 2,
    question: "Is the program online, hybrid, or in-person?",
    answer: "The program is a face - to - face training(onsite) based in Kisii, Kenya. "
  },
  {
    id: 3,
    question: "What technologies will I learn?",
    answer: "JavaScript, TypeScript, React, and Node.js  frontend, backend, and full-stack engineering using the exact tools global companies are actively hiring for right now. You will also learn Git and version control, database management, REST API development, application deployment, and cloud basics."
  },

  {
    id: 4,
    question: "Will I work on real projects?",
    answer: "Yes, and this is one of the things that sets Reduzer apart. In months nine to eleven, you will work on real projects with real Reduzer partner clients. Real briefs, real deadlines, real engineering experience before you graduate."
  },
  {
    id: 5,
    question: "Will I get a job after graduating?",
    answer: "We provide structured career support, portfolio review, CV and LinkedIn optimization, technical interview preparation, and access to opportunities through the Reduzer Technologies network. What we promise is that if you commit fully to the year, you will graduate as a real engineer with a real portfolio. That is what employers are looking for."
  },
  {
    id: 6,
    question: "Can I work remotely with global companies after graduating?",
    answer: "Yes, that is the standard we are training you to reach. Reduzer Technologies already places Kenyan engineers with companies in Europe. The curriculum and project work at Reduzer School are designed to produce engineers who can compete at that level."
  },
  {
    id: 7,
    question: "What are the requirements to join?",
    answer: "Applicants may be high school graduates, university students, dropouts, or graduates who    are serious about building a career in software engineering. Students should have confident   English communication skills, basic computer literacy, a reliable personal laptop, the ability to commit 40 hours per week for 12 months, financial readiness for the Ksh 240,000 annual fee, and a strong personal motivation to pursue tech."
  }

]
export default function FAQ() {
  return (
    <div className="flex flex-col gap-4 bg-background opacity-95 text-black p-3">
      <h1 className="text-center font-extrabold text-4xl">FAQ</h1>
     {faqs.map((faq) => (
      <div key={faq.id} className="border-1 border-red-500 rounded-md bg-background">
        <div className="flex justify-between p-4">
        <h2 className="font-bold text-[20px]">{faq.question}</h2>
        <ChevronDown />
        </div>
        <p className="text-sm mx-6">{faq.answer}</p>
      </div>
     ))}
    </div>
  );
}

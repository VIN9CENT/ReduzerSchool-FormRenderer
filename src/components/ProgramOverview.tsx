'use client';

const qualityBars = [
  {
    title: 'Products start before code.',
    body: 'Students learn to define the user, map the journey, write user stories, plan the data model, choose KPIs, and set up analytics so the build has a reason to exist.',
  },
  {
    title: 'Code is treated like team work.',
    body: 'Work happens in Git, through branches, pull requests, reviews, fixes, tests, documentation, and clear status updates. The habits matter as much as the syntax.',
  },
  {
    title: 'Deployment is treated seriously.',
    body: 'Students carry work past a local demo into staging environments, environment variables, security checks, logs, migrations, deployment notes, and handover discipline.',
  },
];

const phaseBlocks = [
  {
    title: 'Orientation and Computing History',
    phases: 'Phase 0',
    body: 'Students begin with the story behind computing: what created the need for computers, how the field escalated from calculation into networks, products, automation, AI, and global infrastructure, and where moral lines appear when software affects people.',
    standard:
      'They should understand why the programme is demanding, what responsible technologists must take seriously, and how to stay mentally steady when the work becomes difficult.',
  },
  {
    title: 'Foundation Before Frameworks',
    phases: 'Phases 1–4',
    body: 'Students start below the framework by learning how modern computers actually work: how code runs, how memory and files are handled, how operating systems organise work, and how the terminal gives them control. From there, they move into Linux, Bash, relational databases, SQL, Git, GitHub, and pull requests.',
    standard:
      'They should be able to model data, write useful queries, automate simple work, use Git clearly, and explain how their code and data are organised.',
  },
  {
    title: 'Programming Discipline',
    phases: 'Phases 5–8',
    body: 'Each student goes deep in one track: JavaScript, Python, Java, PHP, C#, or Ruby. They move from variables and control flow into OOP, files, data structures, algorithms, debugging, clean code, SOLID, tests, documentation, and communication.',
    standard:
      'The work should handle input, store data, fail safely, use the right structures, include tests where they matter, and be readable enough for another engineer to continue.',
  },
  {
    title: 'Back-End Engineering',
    phases: 'Phases 9–11 + Single Sprint Residency I',
    body: 'Students build server-side systems with REST, ORM, OpenAPI, authentication, OWASP checks, validation, caching, rate limiting, logging, WebSockets, queues, OAuth 2.0, Docker, EC2, NGINX, Terraform, migrations, indexing, sharding, and replication.',
    standard:
      'A back-end submission is expected to have clear API docs, database decisions, auth and validation, security checks, logs, deployment setup, and enough structure for review and handover.',
  },
  {
    title: 'Product Interfaces',
    phases: 'Phases 12–13 + Single Sprint Residency II',
    body: 'Students learn front-end as the part of the product people actually use. They study HCI: the psychology of how humans understand, trust, and move through software. From there, they work through personas, user journeys, wireframes, semantic HTML, accessibility, colour, typography, forms, responsive CSS, React, routing, state, API data, Tailwind, testing, performance, analytics, and deployment.',
    standard:
      'An interface should connect to real data, support real user flows, work across screens, expose useful analytics events, and make clear UX decisions a product team can discuss.',
  },
  {
    title: 'Product Delivery and Capstone',
    phases: 'Phases 14–15',
    body: 'The final stretch is where students prove they can carry a product from idea to handover. They bring together requirements, user stories, ERD diagrams, KPIs, analytics setup, sprint planning, CI/CD, documentation, demos, and a full-stack capstone while also clarifying the kind of tech role they are ready to pursue next.',
    standard:
      'The capstone should show a working product, clear product decisions, solid engineering workflow, deployment discipline, documentation, presentation skill, and a realistic next step for the student.',
  },
];

export default function ProgramOverview() {
  return (
    <section
      id="program"
      className="bg-white w-full py-20 px-6 md:px-16 lg:px-24"
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <p className="mb-4 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-red">
            The programme
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-black mb-5">
            Students learn software the way real product work is done.
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            From day one, students are held to the same habits Reduzer expects
            from its engineers: understand the user, make the work visible,
            write code another engineer can inspect, check security, deploy
            seriously, and explain the decisions behind the product.
          </p>
        </div>

        <div className="mb-10 grid gap-4 md:grid-cols-3">
          {qualityBars.map((bar) => (
            <div
              key={bar.title}
              className="rounded-xl border border-gray-200 bg-gray-50 p-5"
            >
              <h3 className="mb-3 text-base font-bold text-gray-950">
                {bar.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                {bar.body}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          {phaseBlocks.map((block) => (
            <div
              key={block.title}
              className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm"
            >
              <div className="mb-3">
                <span className="rounded-full bg-red/5 px-3 py-1 text-sm font-semibold text-red">
                  {block.phases}
                </span>
              </div>

              <h3 className="mb-3 text-xl md:text-2xl font-bold text-black">
                {block.title}
              </h3>

              <p className="mb-5 leading-relaxed text-gray-600">{block.body}</p>

              <p className="text-sm md:text-base font-medium text-gray-900">
                <span className="font-bold text-red">Quality bar: </span>
                {block.standard}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

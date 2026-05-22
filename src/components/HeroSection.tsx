import Link from 'next/link';
import {
  Code2,
  GraduationCap,
  Briefcase,
  Clock,
  ArrowRight,
} from 'lucide-react';

const features = [
  { icon: Code2, label: 'Hands-on learning' },
  { icon: GraduationCap, label: 'Industry Expert Mentors' },
  { icon: Briefcase, label: 'Career support & placement' },
  { icon: Clock, label: 'Full time Learning' },
];

export default function HeroSection() {
  return (
    <section>
      <div>
        <div>
          <h1>
            Launch Your <span>Career</span> in Tech With Our Intensive 12-Month
            Bootcamp
          </h1>

          <p>
            Hands-on training, mentorship, and real-world projects built for
            ambitious learners ready to break into tech.
          </p>

          <p>Apply for September Intake</p>

          <div>
            <Link href="#apply">
              Apply Now
              <ArrowRight size={16} />
            </Link>

            <Link href="#curriculum">View Curriculum</Link>
          </div>

          <div>
            <div>
              {features.map(({ icon: Icon, label }) => (
                <div key={label}>
                  <div>
                    <Icon size={20} />
                  </div>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

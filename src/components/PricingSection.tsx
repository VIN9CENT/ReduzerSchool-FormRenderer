import Link from 'next/link';

export default function PricingSection() {
  return (
    <section>
      {/* Banner */}
      <div>
        <span>
          Limited Spots · Enroll Now
        </span>
      </div>

      {/* Main Wrapper */}
      <div>
        <div>
          
          {/* card Headline */}
          <div>
            <h2>
              Investment in Your{" "}
              <span>Software Engineering</span> Career
            </h2>
          </div>

          {/* subheadline */}
          <div>
            <p>
              This program is designed as a serious, structured pathway into
              software engineering, with practical training, mentorship, and
              career support over 12 months.
            </p>
          </div>

          {/* Pricing cards */}
          <div>
            <span>Best Plan</span>

            <h3>Monthly Plan</h3>

            <p>
              KSh <strong>20,000</strong> / MONTH
            </p>
          </div>

          {/* Total Cost per year */}
          <div>
            <p>
              KSh <strong>240,000</strong> total covers the full 12-month
              program.
            </p>
          </div>

          {/* Features,in mind i have to keep this as constants*/}
          <div>
            <h4>This Covers:</h4>

            <ol>
              <li>Full 12-month training program</li>
              <li>Instructor-led sessions</li>
              <li>Hands-on project work</li>
              <li>Mentorship and guidance</li>
              <li>Career preparation support</li>
              <li>Portfolio development</li>
            </ol>
          </div>

          {/* CTA card*/}
          <div>
            <Link href="#apply">
              Apply Now
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
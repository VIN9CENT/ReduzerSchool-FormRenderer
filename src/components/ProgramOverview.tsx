import { Clock, MapPin, Calendar, MonitorPlay} from 'lucide-react';



const overviewCards =[
  {
    icon: <Clock/>,
    title: "Course Duration",
    text: "52 Weeks",
  },
  {
    icon: <Calendar/>,
    title: "Schedule",
    text: "Mon - Fri 8am - 5pm",
  },
  {
    icon: <MapPin/>,
    title: "Location",
    text: "Kisii, Kenya",
  },
  {
    icon: <MonitorPlay/>,
    title:"Mode of Learning",
    text: "100% physical Clases"
  },
  
];
export default function ProgramOverview() {
  return (
    <section className="program-overview-section">
      <div className="program-overview-container">
        <div className="program-overview-content">
          <div className="block">
            <h2 className="title">Reduzer Software Engineering School</h2>
            <p className="description">
              A one-year immersive program that takes you from foundational
              concepts to a job-ready softaware developer through hands-on
              training, mentorship, and real-world projects. Designed for
              ambitious learners seeking practical skills and structured growth.
            </p>
          </div>

          <div className="cards">
            {overviewCards.map((card, index) => (
              <div key={index} className="info-card">
                <span className="card-icon">{card.icon}</span>

                <p className="card-title">{card.title}</p>

                <p className="card-text">{card.text}</p>
              </div>
            ))}
          </div>
          <div className="Skills-section">
            <div className="skills-icon"></div>
            <h3 className="skills-title">Skills You Will Gain</h3>
            <ul className="skills-list">
              <li>Build and deploy full-stack web applications.</li>
              <li>Work in teams using industry tools and workflows.</li>
              <li>Solve problems like an engineer, not just copy code.</li>
              <li> Write clean, maintainable, professional code. </li>
              <li>
                Use React, JavaScript, TypeScript, and Node.js confidently.{' '}
              </li>
              <li>Present your work in interviews and client meetings.</li>
              <li> Learn independently and continuously grow. </li>
              <li>
                Collaborate effectively with strong communication and teamwork
                skills.
              </li>
            </ul>
          </div>

          <div className="apply-block">
            <button className="apply-btn">Apply Now</button>
          </div>
        </div>
      </div>
    </section>
  );
}

import "./styles/Education.css";

const education = [
  {
    degree: "Bachelor of Science in Computer Science and Engineering",
    institution: "United International University",
    url: "https://www.uiu.ac.bd",
    period: "Fall 2022 - Summer 2026",
    result: "CGPA 3.55 out of 4.00",
  },
  {
    degree: "Higher Secondary Certificate",
    institution: "BAF Shaheen College Dhaka",
    url: "https://bafsd.edu.bd",
    period: "Academic Year: 2018-2020",
    result: "GPA 5.00 out of 5.00",
  },
  {
    degree: "Secondary School Certificate",
    institution: "Motijheel Govt. Boys’ High School",
    url: "https://www.mgbhs.edu.bd",
    period: "Academic Year: 2016-2018",
    result: "GPA 5.00 out of 5.00",
  },
];

const Education = () => {
  return (
    <section className="education-section section-container" id="education">
      <div className="education-container">
        <h2>
          Educational <span>qualification</span>
        </h2>
        <div className="education-list">
          {education.map((item) => (
            <article className="education-card" key={item.degree}>
              <div className="education-card-heading">
                <h3>{item.degree}</h3>
                <p className="education-period">{item.period}</p>
              </div>
              <a
                className="education-institution"
                href={item.url}
                target="_blank"
                rel="noreferrer"
              >
                {item.institution}
              </a>
              <p className="education-result">{item.result}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;

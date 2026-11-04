import {
  SiC,
  SiCplusplus,
  SiGit,
  SiGithub,
  SiJavascript,
  SiJira,
  SiLaravel,
  SiMysql,
  SiNextdotjs,
  SiPhp,
  SiPlaywright,
  SiPostman,
  SiPython,
  SiReact,
  SiVercel,
} from "react-icons/si";
import type { IconType } from "react-icons";
import "./styles/TechStack.css";

type Technology = {
  name: string;
  icon: IconType;
  color: string;
};

const skillGroups: {
  name: string;
  description?: string;
  technologies?: Technology[];
  skills?: string[];
  className?: string;
}[] = [
  {
    name: "Software Quality Assurance",
    className: "techstack-group-wide",
    skills: [
      "Manual Testing",
      "Automation Testing",
      "Test Case Design",
      "Test Scenario Design",
      "Bug Reporting",
      "Functional Testing",
      "Regression Testing",
      "Smoke Testing",
      "Sanity Testing",
      "SDLC",
      "STLC",
      "Defect Life Cycle",
      "Agile / Scrum",
    ],
  },
  {
    name: "Testing & Bug Tracking",
    description: "Testing tools and issue management",
    technologies: [
      { name: "Jira", icon: SiJira, color: "#2684ff" },
      { name: "Postman", icon: SiPostman, color: "#ff6c37" },
      { name: "Playwright", icon: SiPlaywright, color: "#45ba4b" },
    ],
    skills: ["API Testing"],
  },
  {
    name: "Programming Languages",
    description: "Languages for development and problem solving",
    technologies: [
      { name: "Python", icon: SiPython, color: "#3776ab" },
      { name: "PHP", icon: SiPhp, color: "#777bb4" },
      { name: "JavaScript", icon: SiJavascript, color: "#f0db4f" },
      { name: "C", icon: SiC, color: "#a8b9cc" },
      { name: "C++", icon: SiCplusplus, color: "#649ad2" },
    ],
  },
  {
    name: "Database",
    description: "Working with structured data",
    technologies: [{ name: "MySQL", icon: SiMysql, color: "#4479a1" }],
    skills: ["SQL"],
  },
  {
    name: "Tools & Platforms",
    description: "Development workflow and deployment",
    technologies: [
      { name: "Git", icon: SiGit, color: "#f05032" },
      { name: "GitHub", icon: SiGithub, color: "#f0f0f0" },
      { name: "Laravel", icon: SiLaravel, color: "#ff2d20" },
      { name: "React", icon: SiReact, color: "#61dafb" },
      { name: "Next.js", icon: SiNextdotjs, color: "#f0f0f0" },
      { name: "Vercel", icon: SiVercel, color: "#f0f0f0" },
    ],
  },
  {
    name: "Communication",
    skills: [
      "Effective Communication",
      "Technical Documentation",
      "Team Collaboration",
    ],
  },
  {
    name: "Problem Solving",
    skills: [
      "Analytical Thinking",
      "Debugging",
      "Root Cause Analysis",
      "Critical Thinking",
    ],
  },
  {
    name: "Professional Skills",
    skills: [
      "Time Management",
      "Attention to Detail",
      "Adaptability",
      "Organization",
      "Teamwork",
    ],
  },
];

const TechStack = () => {
  return (
    <section className="techstack" aria-labelledby="techstack-title">
      <header className="techstack-heading">
        <p className="techstack-eyebrow">MY CAPABILITIES</p>
        <h2 id="techstack-title">TECHNICAL AND SOFT SKILLS</h2>
        <p className="techstack-description">
          A balanced toolkit of quality assurance, development, and professional
          skills.
        </p>
      </header>

      <div className="techstack-groups">
        {skillGroups.map((group) => (
          <section
            className={`techstack-group ${group.className ?? ""}`}
            key={group.name}
          >
            <header className="techstack-group-heading">
              <h3>{group.name}</h3>
              {group.description && <p>{group.description}</p>}
            </header>

            {group.technologies && (
              <div className="techstack-logos">
                {group.technologies.map(({ name, icon: Icon, color }) => (
                  <div className="techstack-logo-item" key={name}>
                    <div className="techstack-logo-circle">
                      <Icon aria-hidden="true" color={color} />
                    </div>
                    <span>{name}</span>
                  </div>
                ))}
              </div>
            )}

            {group.skills && (
              <ul className="techstack-skills">
                {group.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </section>
  );
};

export default TechStack;

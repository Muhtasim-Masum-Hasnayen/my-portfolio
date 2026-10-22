import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
  let translateX: number = 0;

  function setTranslateX() {
    const box = document.getElementsByClassName("work-box");
    const rectLeft = document
      .querySelector(".work-container")!
      .getBoundingClientRect().left;
    const rect = box[0].getBoundingClientRect();
    const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
    let padding: number =
      parseInt(window.getComputedStyle(box[0]).padding) / 2;
    translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
  }

  setTranslateX();

  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".work-section",
      start: "top top",
      end: `+=${translateX}`, // Use actual scroll width
      scrub: true,
      pin: true,
      id: "work",
    },
  });

  timeline.to(".work-flex", {
    x: -translateX,
    ease: "none",
  });

  // Clean up (optional, good practice)
  return () => {
    timeline.kill();
    ScrollTrigger.getById("work")?.kill();
  };
}, []);
  return (
   <div className="work-section" id="work">
  <div className="work-container section-container">
    <h2>
      My <span>Work</span>
    </h2>

    <div className="work-flex">

      {/* Project 01: CoverCraft */}
      <div className="work-box" key="covercraft">
        <div className="work-info">
          <div className="work-title">
            <h3>01</h3>
            <div>
              <h4>CoverCraft</h4>
              <p>Document Generation Platform</p>
            </div>
          </div>

          <h4>Tools and Features</h4>
          <p>Next.js, FastAPI, Python, Vercel, Render</p>

          <p>
            A web-based platform that helps students generate
            professional academic cover pages and export documents.
          </p>

          <div className="project-links">
            <a
              href="https://cover-craft-chi.vercel.app/"
              target="_blank"
              rel="noreferrer"
            >
              Live Demo ↗
            </a>

            <a
              href="https://github.com/Muhtasim-Masum-Hasnayen/CoverCraft"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
          </div>
        </div>

        <WorkImage image="1.jpeg" alt="CoverCraft Project" />
      </div>

      {/* Project 02: LegitiScan AI */}
      <div className="work-box" key="legitiscan">
        <div className="work-info">
          <div className="work-title">
            <h3>02</h3>
            <div>
              <h4>LegitiScan AI</h4>
              <p>Product Authenticity Analysis</p>
            </div>
          </div>

          <h4>Tools and Features</h4>
          <p>Python, ResNet50, EasyOCR, Sentence-BERT</p>

          <p>
            An ongoing AI research project combining computer vision,
            OCR, and semantic text similarity to analyze cosmetic
            product authenticity.
          </p>

          <p>Prototype: 78–81% accuracy on the evaluated dataset.</p>
          <p>Fake-product recall: 100% on the evaluated dataset.</p>

          <WorkImage image="2.jpeg" alt="LegitiScan AI Project" />
        </div>
      </div>

      {/* Project 03: Automation Testing */}
      <div className="work-box" key="automation-testing">
        <div className="work-info">
          <div className="work-title">
            <h3>03</h3>
            <div>
              <h4>E-commerce & HR Automation</h4>
              <p>Software Quality Assurance</p>
            </div>
          </div>

          <h4>Tools and Features</h4>
          <p>Playwright, JavaScript, Page Object Model</p>

          <p>
            Automated end-to-end browser workflows for shopping
            and employee management, including form validation
            and key user journeys.
          </p>

          <div className="project-links">
            <a
              href="https://github.com/Muhtasim-Masum-Hasnayen/OrangeHRM-Playwright-POM-Automation"
              target="_blank"
              rel="noreferrer"
            >
              GitHub Profile ↗
            </a>
          </div>
        </div>

        <WorkImage image="3.jpeg" alt="Automation Testing Project" />
      </div>

    </div>
  </div>
</div>
  );
};

export default Work;

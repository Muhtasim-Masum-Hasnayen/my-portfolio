import "./styles/Work.css";
import WorkImage from "./WorkImage";

const Work = () => {
  return (
    <section className="work-section" id="work" aria-labelledby="work-title">
      <div className="work-container section-container">
        <header className="work-heading">
          <div>
            <p className="work-eyebrow">SELECTED PROJECTS</p>
            <h2 id="work-title">
              My <span>Work</span>
            </h2>
          </div>
          <p className="work-intro">
            A selection of products and testing projects I have worked on.
          </p>
        </header>

        <div className="work-grid">
          <article className="work-card">
            <WorkImage image="1.jpeg" alt="CoverCraft project preview" />
            <div className="work-info">
              <div className="work-title">
                <span className="work-number">01</span>
                <div>
                  <h3>CoverCraft</h3>
                  <p className="work-subtitle">Document Generation Platform</p>
                </div>
              </div>
              <p className="work-description">
                A web-based platform that helps students generate professional
                academic cover pages and export documents.
              </p>
              <ul className="work-tools" aria-label="Technologies used">
                <li>Next.js</li>
                <li>FastAPI</li>
                <li>Python</li>
                <li>Vercel</li>
                <li>Render</li>
              </ul>
              <div className="project-links">
                <a
                  href="https://cover-craft-chi.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Demo <span aria-hidden="true">↗</span>
                </a>
                <a
                  href="https://github.com/Muhtasim-Masum-Hasnayen/CoverCraft"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </article>

          <article className="work-card">
            <WorkImage image="2.jpeg" alt="LegitiScan AI project preview" />
            <div className="work-info">
              <div className="work-title">
                <span className="work-number">02</span>
                <div>
                  <h3>LegitiScan AI</h3>
                  <p className="work-subtitle">Product Authenticity Analysis</p>
                </div>
              </div>
              <p className="work-description">
                An ongoing AI research project combining computer vision, OCR,
                and semantic text similarity to analyze cosmetic product
                authenticity.
              </p>
              <ul className="work-tools" aria-label="Technologies used">
                <li>Python</li>
                <li>ResNet50</li>
                <li>EasyOCR</li>
                <li>Sentence-BERT</li>
              </ul>
              <p className="work-result">
                Prototype: 78–81% accuracy on the evaluated dataset; 100% fake
                product recall.
              </p>
            </div>
          </article>

          <article className="work-card">
            <WorkImage
              image="3.jpeg"
              alt="E-commerce and HR automation project preview"
            />
            <div className="work-info">
              <div className="work-title">
                <span className="work-number">03</span>
                <div>
                  <h3>E-commerce &amp; HR Automation</h3>
                  <p className="work-subtitle">Software Quality Assurance</p>
                </div>
              </div>
              <p className="work-description">
                Automated end-to-end browser workflows for shopping and
                employee management, including form validation and key user
                journeys.
              </p>
              <ul className="work-tools" aria-label="Technologies used">
                <li>Playwright</li>
                <li>JavaScript</li>
                <li>Page Object Model</li>
              </ul>
              <div className="project-links">
                <a
                  href="https://github.com/Muhtasim-Masum-Hasnayen/OrangeHRM-Playwright-POM-Automation"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Work;

import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Trainee SQA Engineer</h4>
                <h5>Center for Development of IT Professionals</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Executed manual & automation testing, test cases, and defect reporting following STLC.
Managed JIRA defects and performed API & database testing using Postman and MySQL.
Used AI-assisted testing to generate scenarios and improve test coverage
            </p>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Career;

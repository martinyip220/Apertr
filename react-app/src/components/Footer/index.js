import github from "../../assets/github-icon.png";
import linkedin from "../../assets/linkedin-icon.png";
import "./index.css";

function Footer() {
  return (
    <div className="footer-wrapper">
      <div className="footer-tech-stack">
        <div>Tech Stack:</div>
        <div>Javascript</div>
        <div>Python</div>
        <div>HTML5</div>
        <div>CSS3</div>
        <div>React</div>
        <div>Redux</div>
        <div>Flask</div>
        <div>Flask SQL Alchemy</div>
        <div>Flask Alembic</div>
        <div>PostgresSQL</div>
        <div>
          Clickr is a full-stack application clone of{" "}
          <a
            href="https://www.flickr.com/"
            target="_blank"
            className="flickr-link"
            rel="noreferrer"
          >
            flickr.com
          </a>{" "}
          developed by Martin Yip
        </div>
        <div>Connect with me:</div>
        <div className="about-links-icons">
          <a
            href="https://github.com/martinyip220"
            target="_blank"
            rel="noreferrer"
          >
            <img src={github} alt="github" className="about-icons"></img>
          </a>
          <a
            href="https://www.linkedin.com/in/martin-yip-889a9b261/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={linkedin} alt="linkedin" className="about-icons"></img>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;

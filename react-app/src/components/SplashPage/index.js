import { NavLink } from "react-router-dom";
import "./index.css";

function SplashPage() {
  return (
    <div className="splash-page-whole">
      <div className="splash-page-background">
        <div className="splash-page-text-container">
          <div className="splash-title">Find your inspiration.</div>
          <div className="splash-text">
            Join the Clickr community, home to tens of billions of
          </div>
          <div className="splash-text">photos and 2 million groups.</div>
          <NavLink to="/login" className="get-started-btn">
            Start for free
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default SplashPage;

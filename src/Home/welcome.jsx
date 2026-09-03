import { useNavigate } from "react-router-dom";
import "./welcome.css";

const WelcomeBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="welcome-section">
      {/* Background glow */}
      <div className="welcome-glow welcome-glow-one"></div>
      <div className="welcome-glow welcome-glow-two"></div>

      <div className="welcome-container">
        {/* ================= LEFT CONTENT ================= */}
        <div className="welcome-content">
          <div className="welcome-badge">
            <span>✦</span>
            Welcome to SkillSwap
          </div>

          <h1>
            Your profile is ready,
            <br />
            let's start <span>exchanging!</span>
          </h1>

          <p>
            You're all set! Discover people, exchange your skills and learn
            something new from the community.
          </p>

          <div className="welcome-actions">
            <button
              className="welcome-primary"
              onClick={() => navigate("/findMatch")}
            >
              Find My Match
              <span>→</span>
            </button>

            <button
              className="welcome-secondary"
              onClick={() => navigate("/skills")}
            >
              Explore Skills
              <span>↗</span>
            </button>
          </div>
        </div>
        <div className="welcome-visual">
          <div className="orbit orbit-one"></div>
          <div className="orbit orbit-two"></div>
          <div className="welcome-center">
            <div className="center-icon">✦</div>

            <strong>Skill</strong>
            <span>Exchange</span>
          </div>

          <div className="floating-skill skill-one">
            <div className="skill-icon">💻</div>
            <div>
              <strong>Programming</strong>
              <small>Teach</small>
            </div>
          </div>

          <div className="floating-skill skill-two">
            <div className="skill-icon">🎨</div>
            <div>
              <strong>UI Design</strong>
              <small>Learn</small>
            </div>
          </div>

          <div className="floating-skill skill-three">
            <div className="skill-icon">🎸</div>
            <div>
              <strong>Guitar</strong>
              <small>Exchange</small>
            </div>
          </div>

          <div className="floating-skill skill-four">
            <div className="skill-icon">🗣️</div>
            <div>
              <strong>Communication</strong>
              <small>Learn</small>
            </div>
          </div>
        </div>
      </div>
      <div className="quick-actions">
        <div className="quick-card" onClick={() => navigate("/find-match")}>
          <div className="quick-icon purple">👥</div>

          <div className="quick-text">
            <h3>Find Your Match</h3>
            <p>Discover people with matching skills.</p>
          </div>

          <span className="quick-arrow">→</span>
        </div>

        <div className="quick-card" onClick={() => navigate("/skills")}>
          <div className="quick-icon blue">◈</div>

          <div className="quick-text">
            <h3>Explore Skills</h3>
            <p>Discover skills you want to learn.</p>
          </div>

          <span className="quick-arrow">→</span>
        </div>

        <div className="quick-card" onClick={() => navigate("/requests")}>
          <div className="quick-icon green">💬</div>

          <div className="quick-text">
            <h3>Your Requests</h3>
            <p>Check your exchange requests.</p>
          </div>

          <span className="quick-arrow">→</span>
        </div>

        <div className="quick-card" onClick={() => navigate("/profile")}>
          <div className="quick-icon orange">👤</div>

          <div className="quick-text">
            <h3>Edit Profile</h3>
            <p>Update your skills anytime.</p>
          </div>

          <span className="quick-arrow">→</span>
        </div>
      </div>
      <div className="welcome-tip">
        <span>✦</span>
        <strong>Tip:</strong>
        The more skills you share, the better your matches will be!
      </div>
    </section>
  );
};

export default WelcomeBanner;

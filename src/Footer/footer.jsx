import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-glow footer-glow-1"></div>
      <div className="footer-glow footer-glow-2"></div>

      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <span>✦</span> SkillSwap
          </div>

          <p>
            Exchange what you know.
            <br />
            Learn what inspires you.
          </p>

          <div className="footer-status">
            <span className="status-dot"></span>
            Community is active
          </div>
        </div>

        {/* Platform */}
        <div className="footer-column">
          <h3>Platform</h3>

          <a href="#skills">Explore Skills</a>
          <a href="#matches">Find a Match</a>
          <a href="#community">Community</a>
          <a href="#how-it-works">How It Works</a>
        </div>

        {/* Community */}
        <div className="footer-column">
          <h3>Community</h3>

          <a href="#members">Members</a>
          <a href="#exchanges">Skill Exchanges</a>
          <a href="#success">Success Stories</a>
          <a href="#events">Events</a>
        </div>

        {/* Support */}
        <div className="footer-column">
          <h3>Support</h3>

          <a href="#help">Help Center</a>
          <a href="https://www.linkedin.com/in/gunjan-gaira-371ba1213/?isSelfProfile=false">
            Contact Us
          </a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms</a>
        </div>
      </div>

      {/* Bottom section */}
      <div className="footer-bottom">
        <p>© 2026 SkillSwap. Built for people who love to learn.</p>

        <div className="footer-socials">
          <a href="#github" aria-label="GitHub">
            ⌘
          </a>
          <a
            href="https://www.linkedin.com/in/gunjan-gaira-371ba1213/?isSelfProfile=false"
            aria-label="LinkedIn"
          >
            in
          </a>
          <a href="#discord" aria-label="Discord">
            ◈
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

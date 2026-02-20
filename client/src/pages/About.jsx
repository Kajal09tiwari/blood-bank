import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="page-container">
      {/* Navbar - Consistent with other pages */}
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <span className="logo-icon">🩸</span>
            <span>BloodConnect</span>
          </Link>
          <div className="navbar-links">
            <Link to="/" className="navbar-link">Home</Link>
            <Link to="/about" className="navbar-link active">About</Link>
                      <Link to="/register/donor" className="navbar-link"> Find Donor</Link>     
            <Link to="/faq" className="navbar-link">FAQ</Link>
            <Link to="/contact" className="navbar-link">Contact</Link>
            <Link to="/login" className="btn login-btn">Login</Link>
          </div>
        </div>
      </nav>

      {/* About Page Content */}
      <main className="about-page">
        <section className="hero-section">
          <div className="hero-content">
            <h1>Our Mission to Save Lives</h1>
            <p>Connecting blood donors with recipients in need across the nation</p>
          </div>
        </section>

        <section className="about-content">
          <div className="container">
            <div className="about-grid">
              <div className="about-text">
                <h2>Who We Are</h2>
                <p>
                  BloodConnect is a non-profit organization founded in 2020 with a simple mission: 
                  to ensure no one dies waiting for blood. We've created a nationwide network that 
                  connects voluntary blood donors with patients in need.
                </p>
                <p>
                  Our platform has facilitated over 50,000 successful blood donations and has 
                  partnered with 200+ hospitals across the country. We believe every drop counts 
                  and every donor is a lifesaver.
                </p>
              </div>
              <div className="about-image">
                <img src="https://illustrations.popsy.co/amber/team-work.svg" alt="Team working together" />
              </div>
            </div>

            <div className="stats-section">
              <h2>Our Impact in Numbers</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-number">50,000+</div>
                  <div className="stat-label">Lives Saved</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">200+</div>
                  <div className="stat-label">Partner Hospitals</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">10,000+</div>
                  <div className="stat-label">Active Donors</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">100+</div>
                  <div className="stat-label">Cities Covered</div>
                </div>
              </div>
            </div>

            <div className="team-section">
              <h2>Meet Our Team</h2>
              <div className="team-grid">
                <div className="team-member">
                  <div className="member-avatar">JD</div>
                  <h3>John Doe</h3>
                  <p>Founder & CEO</p>
                </div>
                <div className="team-member">
                  <div className="member-avatar">AS</div>
                  <h3>Alice Smith</h3>
                  <p>Medical Director</p>
                </div>
                <div className="team-member">
                  <div className="member-avatar">RJ</div>
                  <h3>Robert Johnson</h3>
                  <p>Tech Lead</p>
                </div>
                <div className="team-member">
                  <div className="member-avatar">MB</div>
                  <h3>Maria Brown</h3>
                  <p>Community Manager</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container">
            <h2>Ready to Make a Difference?</h2>
            <p>Join our community of lifesavers today</p>
            <div className="cta-buttons">
              <Link to="/register/donor" className="btn primary-btn">Become a Donor</Link>
              <Link to="/contact" className="btn outline-btn">Contact Us</Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Consistent with other pages */}
      <footer className="footer">
        <div className="footer-container">
          {/* ... (same footer as your other pages) ... */}
        </div>
      </footer>

      <style jsx>{`
        /* Base styles from your design system */
        :root {
          --primary: #ff4757;
          --primary-dark: #e84118;
          --secondary: #2f3542;
          --light: #f1f2f6;
          --dark: #1e272e;
          --gray: #a4b0be;
          --white: #ffffff;
        }

        /* About Page Specific Styles */
        .about-page {
          min-height: 100vh;
        }

        .hero-section {
          background: linear-gradient(135deg, rgba(255,71,87,0.1) 0%, rgba(255,255,255,1) 100%);
          padding: 5rem 2rem;
          text-align: center;
        }

        .hero-content h1 {
          font-size: 2.5rem;
          color: var(--primary);
          margin-bottom: 1rem;
        }

        .hero-content p {
          font-size: 1.2rem;
          color: var(--secondary);
          max-width: 600px;
          margin: 0 auto;
        }

        .about-content {
          padding: 4rem 0;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
          margin-bottom: 4rem;
        }

        .about-text h2 {
          font-size: 2rem;
          color: var(--secondary);
          margin-bottom: 1.5rem;
        }

        .about-text p {
          margin-bottom: 1.5rem;
          line-height: 1.6;
          color: var(--dark);
        }

        .about-image img {
          width: 100%;
          max-width: 500px;
          border-radius: 10px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .stats-section {
          margin: 4rem 0;
          text-align: center;
        }

        .stats-section h2 {
          font-size: 2rem;
          color: var(--secondary);
          margin-bottom: 3rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }

        .stat-card {
          background-color: var(--white);
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 1.1rem;
          color: var(--secondary);
        }

        .team-section {
          margin: 4rem 0;
          text-align: center;
        }

        .team-section h2 {
          font-size: 2rem;
          color: var(--secondary);
          margin-bottom: 3rem;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }

        .team-member {
          background-color: var(--white);
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }

        .member-avatar {
          width: 80px;
          height: 80px;
          background-color: var(--primary);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0 auto 1rem;
        }

        .team-member h3 {
          color: var(--secondary);
          margin-bottom: 0.5rem;
        }

        .team-member p {
          color: var(--gray);
        }

        .cta-section {
          background-color: var(--primary);
          color: var(--white);
          padding: 4rem 0;
          text-align: center;
        }

        .cta-section h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .cta-section p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }

        .outline-btn {
          background-color: transparent;
          color: var(--white);
          border: 2px solid var(--white);
        }

        .outline-btn:hover {
          background-color: var(--white);
          color: var(--primary);
        }

        /* Responsive Styles */
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr;
          }
          
          .hero-content h1 {
            font-size: 2rem;
          }
          
          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

export default About;
import React, { useState } from "react";
import { Link } from "react-router-dom";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "Who can donate blood?",
      answer: "Most people can donate blood if they are in good health, weigh at least 50kg (110 lbs), and are between 18-65 years old (age limits may vary by country). You'll need to pass a health screening on donation day."
    },
    {
      question: "How often can I donate blood?",
      answer: "You can donate whole blood every 56 days (8 weeks). Platelet donations can be made more frequently, up to 24 times per year."
    },
    {
      question: "Is blood donation safe?",
      answer: "Yes, donating blood is safe. New, sterile disposable equipment is used for each donor, so there's no risk of contracting a bloodborne infection."
    },
    {
      question: "How long does the donation process take?",
      answer: "The entire process takes about an hour. The actual blood donation only takes 8-10 minutes, but you should allow time for registration, a health screening, and refreshments afterward."
    },
    {
      question: "What should I do before donating blood?",
      answer: "Eat a healthy meal before your donation, drink plenty of fluids (especially water), and get a good night's sleep. Avoid fatty foods before donating as they can affect tests done on your blood."
    },
    {
      question: "Can I donate if I have a tattoo or piercing?",
      answer: "In most cases, yes, but there may be a waiting period (typically 3-12 months depending on your location and whether sterile procedures were followed)."
    }
  ];

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
            <Link to="/about" className="navbar-link">About</Link>
                      <Link to="/register/donor" className="navbar-link"> Find Donor</Link>     
            <Link to="/faq" className="navbar-link active">FAQ</Link>
            <Link to="/contact" className="navbar-link">Contact</Link>
            <Link to="/login" className="btn login-btn">Login</Link>
          </div>
        </div>
      </nav>

      {/* FAQ Page Content */}
      <main className="faq-page">
        <section className="hero-section">
          <div className="hero-content">
            <h1>Frequently Asked Questions</h1>
            <p>Find answers to common questions about blood donation</p>
          </div>
        </section>

        <section className="faq-content">
          <div className="container">
            <div className="faq-grid">
              <div className="faq-list">
                <h2>General Questions</h2>
                {faqItems.map((item, index) => (
                  <div 
                    key={index} 
                    className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                  >
                    <div 
                      className="faq-question"
                      onClick={() => toggleAccordion(index)}
                    >
                      <h3>{item.question}</h3>
                      <span className="toggle-icon">
                        {activeIndex === index ? '−' : '+'}
                      </span>
                    </div>
                    {activeIndex === index && (
                      <div className="faq-answer">
                        <p>{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="faq-sidebar">
                <div className="sidebar-card">
                  <h3>Quick Links</h3>
                  <ul>
                    <li><Link to="/donors">Find a Donation Center</Link></li>
                    <li><Link to="/register/donor">Become a Donor</Link></li>
                    <li><Link to="/about">About BloodConnect</Link></li>
                    <li><Link to="/contact">Contact Our Team</Link></li>
                  </ul>
                </div>

                <div className="sidebar-card">
                  <h3>Didn't find your answer?</h3>
                  <p>Our support team is ready to help you with any questions.</p>
                  <Link to="/contact" className="btn primary-btn">Contact Us</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container">
            <h2>Ready to Donate Blood?</h2>
            <p>Your donation can save up to 3 lives</p>
            <Link to="/register/donor" className="btn primary-btn large-btn">Register as Donor</Link>
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
        /* FAQ Page Specific Styles */
        .faq-page {
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

        .faq-content {
          padding: 4rem 0;
        }

        .faq-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 3rem;
        }

        .faq-list h2 {
          font-size: 2rem;
          color: var(--secondary);
          margin-bottom: 2rem;
        }

        .faq-item {
          border: 1px solid var(--light);
          border-radius: 8px;
          margin-bottom: 1rem;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .faq-item.active {
          border-color: var(--primary);
          box-shadow: 0 5px 15px rgba(255,71,87,0.1);
        }

        .faq-question {
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          background-color: var(--white);
        }

        .faq-question h3 {
          font-size: 1.1rem;
          color: var(--secondary);
          margin: 0;
          flex: 1;
        }

        .toggle-icon {
          font-size: 1.5rem;
          font-weight: bold;
          color: var(--primary);
          margin-left: 1rem;
        }

        .faq-answer {
          padding: 0 1.5rem 1.5rem;
          background-color: var(--white);
        }

        .faq-answer p {
          color: var(--dark);
          line-height: 1.6;
        }

        .faq-sidebar {
          position: sticky;
          top: 2rem;
        }

        .sidebar-card {
          background-color: var(--white);
          border-radius: 8px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }

        .sidebar-card h3 {
          color: var(--secondary);
          margin-bottom: 1rem;
        }

        .sidebar-card ul {
          list-style: none;
          padding: 0;
        }

        .sidebar-card li {
          margin-bottom: 0.75rem;
        }

        .sidebar-card a {
          color: var(--primary);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .sidebar-card a:hover {
          color: var(--primary-dark);
          text-decoration: underline;
        }

        .sidebar-card .btn {
          margin-top: 1rem;
          width: 100%;
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

        .large-btn {
          padding: 1rem 2.5rem;
          font-size: 1.1rem;
        }

        /* Responsive Styles */
        @media (max-width: 768px) {
          .faq-grid {
            grid-template-columns: 1fr;
          }
          
          .hero-content h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default FAQ;
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      setSubmitMessage("Thank you for your message! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    }, 1500);
  };

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
            <Link to="/faq" className="navbar-link">FAQ</Link>
            <Link to="/contact" className="navbar-link active">Contact</Link>
            <Link to="/login" className="btn login-btn">Login</Link>
          </div>
        </div>
      </nav>

      {/* Contact Page Content */}
      <main className="contact-page">
        <section className="hero-section">
          <div className="hero-content">
            <h1>Contact Us</h1>
            <p>We're here to help and answer any questions you might have</p>
          </div>
        </section>

        <section className="contact-content">
          <div className="container">
            <div className="contact-grid">
              <div className="contact-form">
                <h2>Send Us a Message</h2>
                {submitMessage ? (
                  <div className="success-message">
                    <p>{submitMessage}</p>
                    <button 
                      className="btn primary-btn"
                      onClick={() => setSubmitMessage("")}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="name">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="subject">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="message">Your Message</label>
                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                    
                    <button 
                      type="submit" 
                      className="btn primary-btn full-width-btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                )}
              </div>

              <div className="contact-info">
                <h2>Contact Information</h2>
                <div className="info-card">
                  <div className="info-item">
                    <div className="info-icon">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div className="info-content">
                      <h3>Address</h3>
                      <p>123 Health Street, Medical City, 10001</p>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-icon">
                      <i className="fas fa-phone"></i>
                    </div>
                    <div className="info-content">
                      <h3>Phone</h3>
                      <p>+1 (234) 567-8900</p>
                      <p>Mon-Fri: 9am-5pm</p>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-icon">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div className="info-content">
                      <h3>Email</h3>
                      <p>info@bloodconnect.org</p>
                      <p>support@bloodconnect.org</p>
                    </div>
                  </div>
                </div>

                <div className="social-card">
                  <h3>Follow Us</h3>
                  <div className="social-links">
                    <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                    <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                    <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="map-section">
          <div className="container">
            <div className="map-container">
              {/* Replace with your actual map embed code */}
              <div className="map-placeholder">
                <h3>Our Location</h3>
                <p>Map would be displayed here</p>
              </div>
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
        /* Contact Page Specific Styles */
        .contact-page {
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

        .contact-content {
          padding: 4rem 0;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
        }

        .contact-form h2,
        .contact-info h2 {
          font-size: 2rem;
          color: var(--secondary);
          margin-bottom: 2rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: var(--secondary);
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid var(--light-gray);
          border-radius: 6px;
          font-size: 1rem;
          transition: all 0.2s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(255,71,87,0.2);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .full-width-btn {
          width: 100%;
          padding: 0.75rem;
          font-size: 1rem;
        }

        .success-message {
          background-color: rgba(42, 157, 143, 0.1);
          border-left: 4px solid var(--success);
          padding: 1.5rem;
          margin-bottom: 2rem;
          border-radius: 0 6px 6px 0;
        }

        .success-message p {
          color: var(--success);
          margin-bottom: 1rem;
          font-weight: 500;
        }

        .info-card {
          background-color: var(--white);
          border-radius: 8px;
          padding: 2rem;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          margin-bottom: 2rem;
        }

        .info-item {
          display: flex;
          margin-bottom: 1.5rem;
        }

        .info-item:last-child {
          margin-bottom: 0;
        }

        .info-icon {
          width: 50px;
          height: 50px;
          background-color: rgba(255,71,87,0.1);
          color: var(--primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          margin-right: 1.5rem;
          flex-shrink: 0;
        }

        .info-content h3 {
          color: var(--secondary);
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
        }

        .info-content p {
          color: var(--gray);
          margin-bottom: 0.25rem;
        }

        .social-card {
          background-color: var(--white);
          border-radius: 8px;
          padding: 2rem;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }

        .social-card h3 {
          color: var(--secondary);
          margin-bottom: 1.5rem;
          font-size: 1.1rem;
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-links a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background-color: rgba(255,71,87,0.1);
          color: var(--primary);
          border-radius: 50%;
          transition: all 0.2s ease;
        }

        .social-links a:hover {
          background-color: var(--primary);
          color: var(--white);
          transform: translateY(-2px);
        }

        .map-section {
          padding-bottom: 4rem;
        }

        .map-container {
          height: 400px;
          background-color: var(--light);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }

        .map-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          background-color: var(--light-gray);
          color: var(--gray);
        }

        .map-placeholder h3 {
          color: var(--secondary);
          margin-bottom: 0.5rem;
        }

        /* Responsive Styles */
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
          
          .hero-content h1 {
            font-size: 2rem;
          }
          
          .info-item {
            flex-direction: column;
          }
          
          .info-icon {
            margin-right: 0;
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;

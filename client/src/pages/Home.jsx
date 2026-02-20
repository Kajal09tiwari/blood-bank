import React from "react";
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div className="home-container">
      {/* Modern Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <span className="logo-icon">🩸</span>
            <span>BloodConnect</span>
          </Link>
          <div className="navbar-links">
            <Link to="/" className="navbar-link active">Home</Link>
            <Link to="/about" className="navbar-link">About</Link>
            <Link to="/register/donor" className="navbar-link"> Find Donor</Link>     
                   <Link to="/FAQ" className="navbar-link">FAQ</Link>
            <Link to="/contact" className="navbar-link">Contact</Link>
            <Link to="/login" className="btn login-btn">Login</Link>
            <Link to="/hospital/login">Hospitals</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section with Gradient Background */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Donate Blood, Save Lives</h1>
          <p className="hero-text">
            Join thousands of donors and recipients in our mission to make blood available for everyone, everywhere.
          </p>
          
          <div className="hero-buttons">
            <Link to="/register/donor" className="btn primary-btn">
              Become a Donor
            </Link>
            <Link to="/register/recipient" className="btn outline-btn">
              Need Blood?
            </Link>
          </div>
        </div>
        
        <div className="hero-image">
          <img src="2..png" alt="Blood donation illustration" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-number">10,000+</div>
            <div className="stat-label">Lives Saved</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">5,000+</div>
            <div className="stat-label">Active Donors</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">200+</div>
            <div className="stat-label">Partner Hospitals</div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2 className="section-title">How BloodConnect Works</h2>
        <p className="section-subtitle">Three simple steps to save lives</p>
        
        <div className="steps-container">
          <div className="step">
            <div className="step-icon">1</div>
            <h3 className="step-title">Register</h3>
            <p className="step-description">Create your account as donor or recipient</p>
          </div>
          <div className="step">
            <div className="step-icon">2</div>
            <h3 className="step-title">Find Match</h3>
            <p className="step-description">Our smart system connects donors with recipients</p>
          </div>
          <div className="step">
            <div className="step-icon">3</div>
            <h3 className="step-title">Save Lives</h3>
            <p className="step-description">Complete the donation at a nearby center</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Ready to Make a Difference?</h2>
        <p>Join our community of lifesavers today</p>
        <Link to="/register/donor" className="btn primary-btn large-btn">
          Register Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-icon">🩸</span>
              <span>BloodConnect</span>
            </div>
            <p className="footer-motto">Connecting donors with those in need</p>
            <div className="social-links">
  <a href="#" className="facebook"><i className="fab fa-facebook"></i></a>
  <a href="#" className="twitter"><i className="fab fa-twitter"></i></a>
  <a href="#" className="instagram"><i className="fab fa-instagram"></i></a>
</div>

          </div>
          
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <Link to="/register/donor" className="navbar-link"> Find Donor</Link>     


            <li><Link to="/hospitals">Hospitals</Link></li>
            <li><Link to="/hospital/login" className="btn login-btn">Hospital Login</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/hospital/register" className="btn login-btn">Hospital </Link>
            </li>
          </ul>
          </div>
          
          <div className="footer-contact">
  <h3>Contact Us</h3>
  <p>
    <i className="fas fa-envelope"></i>{" "}
    <a href="mailto:info@bloodconnect.com">info@bloodconnect.com</a>
  </p>
  <p>
    <i className="fas fa-phone"></i>{" "}
    <a href="tel:+1234567890">+1 234 567 890</a>
  </p>
  <p>
    <i className="fas fa-map-marker-alt"></i>{" "}
    <a
      href="https://maps.google.com/?q=123+Health+St,+Medical+City"
      target="_blank"
      rel="noopener noreferrer"
    >
      123 Health St, Medical City
    </a>
  </p>
</div>

        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} BloodConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

// CSS Styles
const styles = `
  /* Base Styles */
  :root {
    --primary: #ff4757;
    --primary-dark: #e84118;
    --secondary: #2f3542;
    --light: #f1f2f6;
    --dark: #1e272e;
    --gray: #a4b0be;
    --white: #ffffff;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }
  
  .home-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
  }
      .logo-text {
           color:rgb(180, 47, 13); ;
}
  
  /* Navbar Styles */
  .navbar {
    background-color: var(--white);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 1rem 5%;
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  .navbar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1400px;
    margin: 0 auto;
  }
  
  .navbar-logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary);
    color:rgb(203, 60, 60);
  }
  
  .logo-icon {
    margin-right: 0.5rem;
    font-size: 1.8rem;
  }
  
  .navbar-links {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
  
  .navbar-link {
    color: var(--secondary);
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
    position: relative;
    padding: 0.5rem 0;
  }
  
  .navbar-link:hover {
    color: var(--primary);
  }
  
  .navbar-link.active {
    color: var(--primary);
    font-weight: 600;
  }
  
  .navbar-link.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: var(--primary);
    border-radius: 3px;
  }
  
  /* Button Styles */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    border-radius: 50px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
    border: none;
    outline: none;
  }
  
  .primary-btn {
    background-color: var(--primary);
    color: var(--white);
    box-shadow: 0 4px 15px rgba(255, 71, 87, 0.3);
  }
  
  .primary-btn:hover {
    background-color: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 71, 87, 0.4);
  }
  
  .outline-btn {
    background-color: transparent;
    color: var(--primary);
    border: 2px solid var(--primary);
  }
  
  .outline-btn:hover {
    background-color: var(--primary);
    color: var(--white);
  }
  
  .large-btn {
    padding: 1rem 2.5rem;
    font-size: 1.1rem;
  }
  
  .login-btn {
    background-color: var(--primary);
    color: var(--white);
    padding: 0.5rem 1.5rem;
  }
  
  /* Hero Section */
  .hero-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5rem 5%;
    background: linear-gradient(135deg, #fff5f5 0%, #fff 100%);
  }
  
  .hero-content {
    max-width: 600px;
  }
  
  .hero-section h1 {
    font-size: 3rem;
    font-weight: 700;
    color: var(--dark);
    margin-bottom: 1.5rem;
    line-height: 1.2;
  }
  
  .hero-text {
    font-size: 1.2rem;
    color: var(--secondary);
    margin-bottom: 2.5rem;
    line-height: 1.6;
  }
  
  .hero-buttons {
    display: flex;
    gap: 1rem;
  }
  
  .hero-image {
    max-width: 500px;
  }
  
  .hero-image img {
    width: 100%;
    height: auto;
    animation: float 3s ease-in-out infinite;
  }
  
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
    100% { transform: translateY(0px); }
  }
  
  /* Stats Section */
  .stats-section {
    background-color: var(--white);
    padding: 4rem 5%;
  }
  
  .stats-container {
    display: flex;
    justify-content: space-around;
    max-width: 1200px;
    margin: 0 auto;
    flex-wrap: wrap;
    gap: 2rem;
  }
  
  .stat-card {
    text-align: center;
    padding: 2rem;
    border-radius: 10px;
    background-color: var(--light);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease;
    flex: 1;
    min-width: 200px;
  }
  
  .stat-card:hover {
    transform: translateY(-10px);
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
    font-weight: 500;
  }
  
  /* How It Works Section */
  .how-it-works {
    padding: 5rem 5%;
    background-color: var(--light);
    text-align: center;
  }
  
  .section-title {
    font-size: 2.5rem;
    color: var(--dark);
    margin-bottom: 1rem;
  }
  
  .section-subtitle {
    font-size: 1.2rem;
    color: var(--gray);
    margin-bottom: 3rem;
  }
  
  .steps-container {
    display: flex;
    justify-content: center;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    flex-wrap: wrap;
  }
  
  .step {
    flex: 1;
    min-width: 250px;
    max-width: 300px;
    padding: 2rem;
    background-color: var(--white);
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease;
  }
  
  .step:hover {
    transform: translateY(-10px);
  }
  
  .step-icon {
    width: 60px;
    height: 60px;
    background-color: var(--primary);
    color: var(--white);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 auto 1.5rem;
  }
  
  .step-title {
    font-size: 1.5rem;
    color: var(--dark);
    margin-bottom: 1rem;
  }
  
  .step-description {
    color: var(--gray);
    line-height: 1.6;
  }
  
  /* CTA Section */
  .cta-section {
    padding: 5rem 5%;
    text-align: center;
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
    color: var(--white);
  }
  
  .cta-section h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .cta-section p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    opacity: 0.9;
  }
  
  /* Footer */
  .footer {
    background-color: var(--secondary);
    color: var(--white);
    padding: 4rem 5% 2rem;
  }
  
  .footer-container {
    display: flex;
    justify-content: space-between;
    max-width: 1400px;
    margin: 0 auto;
    flex-wrap: wrap;
    gap: 3rem;
  }
  
  .footer-brand {
    flex: 1;
    min-width: 250px;
  }
  
  .footer-logo {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--white);
    margin-bottom: 1rem;
  }
  
  .footer-motto {
    color: var(--gray);
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }
  
  .social-links {
    display: flex;
    gap: 1rem;
  }
  
  .social-links a {
    color: var(--white);
    font-size: 1.2rem;
    transition: color 0.3s ease;
  }
  
  .social-links a:hover {
    color: var(--primary);
  }
  
  .footer-links {
    flex: 1;
    min-width: 150px;
  }
  
  .footer-links h3 {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    position: relative;
    padding-bottom: 0.5rem;
  }
  
  .footer-links h3::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 2px;
    background-color: var(--primary);
  }
  
  .footer-links ul {
    list-style: none;
  }
  
  .footer-links li {
    margin-bottom: 0.8rem;
  }
  
  .footer-links a {
    color: var(--gray);
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  .footer-links a:hover {
    color: var(--primary);
  }
  
  .footer-contact {
    flex: 1;
    min-width: 250px;
  }
  
  .footer-contact h3 {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    position: relative;
    padding-bottom: 0.5rem;
  }
  
  .footer-contact h3::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 2px;
    background-color: var(--primary);
  }
  
  .footer-contact p {
    display: flex;
    align-items: center;
    color: var(--gray);
    margin-bottom: 1rem;
  }
  
  .footer-contact i {
    margin-right: 0.8rem;
    color: var(--primary);
    width: 20px;
    text-align: center;
  }
  
  .footer-bottom {
    text-align: center;
    padding-top: 2rem;
    margin-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    color: var(--gray);
    font-size: 0.9rem;
  }
  
  /* Responsive Styles */
  @media (max-width: 992px) {
    .hero-section {
      flex-direction: column;
      text-align: center;
    }
    
    .hero-content {
      margin-bottom: 3rem;
    }
    
    .hero-buttons {
      justify-content: center;
    }
  }
  
  @media (max-width: 768px) {
    .navbar-container {
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .navbar-links {
      width: 100%;
      flex-direction: column;
      gap: 1rem;
    }
    
    .navbar-link {
      padding: 0.5rem 1rem;
    }
    
    .navbar-link.active::after {
      display: none;
    }
    
    .hero-section h1 {
      font-size: 2.5rem;
    }
    
    .section-title {
      font-size: 2rem;
    }
  }
  
  @media (max-width: 576px) {
    .hero-buttons {
      flex-direction: column;
    }
    
    .btn {
      width: 100%;
    }
  }
`;

// Add styles to the document
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);



// import React from "react";
// import { Link } from "react-router-dom";
// import "./Home.css";

// const Home = () => {
//   return (
//     <div className="home-container">
//       <h1>Welcome to BloodConnect</h1>
//       <p>Your help can save lives. Register now as a Donor or Recipient!</p>
//       <div className="buttons">
//         <Link to="/register/donor" className="btn">Register as Donor</Link>
//         <Link to="/register/recipient" className="btn">Register as Recipient</Link>
//         <Link to="/login" className="btn secondary">Login</Link>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterRecipient() {
  const [formData, setFormData] = useState({
    name: "",
    role: "recipient",
    age: "",
    gender: "",
    bloodType: "",
    rhFactor: "",
    urgencyLevel: "",
    diabetes: false,
    infections: false,
    hivStatus: "",
    hemoglobinLevel: "",
    organIssues: "",
    medications: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/recipient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Recipient Register Response:", data);

      if (res.ok) {
        localStorage.setItem("recipientId", data._id);
        alert("Recipient profile created successfully!");
        navigate("/DashboardRecipient");
      } else {
        alert(data.error || "Something went wrong.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Failed to submit form.");
    }
  };

  return (
    <div className="register-container">
      {/* Navbar */}
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
            <Link to="/FAQ" className="navbar-link">FAQ</Link>
            <Link to="/contact" className="navbar-link">Contact</Link>
            <Link to="/login" className="btn login-btn">Login</Link>
          </div>
        </div>
      </nav>

      {/* Main Form Content */}
      <div className="form-wrapper">
        <div className="form-container">
          <div className="form-header">
            <h2>Recipient Registration</h2>
            <p>Complete your profile to find compatible blood donors</p>
          </div>

          <form onSubmit={handleSubmit} className="recipient-form">
            <div className="form-grid">
              {/* Personal Information Section */}
              <div className="form-section">
                <h3 className="section-title">Personal Information</h3>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input
                      id="age"
                      name="age"
                      type="number"
                      min="1"
                      max="120"
                      placeholder="25"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select
                      id="gender"
                      name="gender"
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Blood Information Section */}
              <div className="form-section">
                <h3 className="section-title">Blood Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="bloodType">Blood Type</label>
                    <select
                      id="bloodType"
                      name="bloodType"
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Blood Type</option>
                      <option value="A+">A+</option>
                      <option value="A-">A−</option>
                      <option value="B+">B+</option>
                      <option value="B-">B−</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB−</option>
                      <option value="O+">O+</option>
                      <option value="O-">O−</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="rhFactor">RH Factor</label>
                    <select
                      id="rhFactor"
                      name="rhFactor"
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select RH Factor</option>
                      <option value="Positive">Positive</option>
                      <option value="Negative">Negative</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="hemoglobinLevel">Hemoglobin Level (g/dL)</label>
                  <input
                    id="hemoglobinLevel"
                    name="hemoglobinLevel"
                    type="number"
                    step="0.1"
                    min="0"
                    max="20"
                    placeholder="12.5"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Medical Information Section */}
              <div className="form-section">
                <h3 className="section-title">Medical Information</h3>
                <div className="form-group">
                  <label htmlFor="urgencyLevel">Urgency Level</label>
                  <select
                    id="urgencyLevel"
                    name="urgencyLevel"
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Urgency Level</option>
                    <option value="Emergency">Emergency</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="diabetes"
                      onChange={handleChange}
                    />
                    <span className="checkbox-custom"></span>
                    Diabetes
                  </label>

                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="infections"
                      onChange={handleChange}
                    />
                    <span className="checkbox-custom"></span>
                    Infections
                  </label>
                </div>

                <div className="form-group">
                  <label htmlFor="hivStatus">HIV Status</label>
                  <select
                    id="hivStatus"
                    name="hivStatus"
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select HIV Status</option>
                    <option value="Negative">Negative</option>
                    <option value="Positive">Positive</option>
                    <option value="Unknown">Unknown</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="organIssues">Organ Issues (if any)</label>
                  <input
                    id="organIssues"
                    name="organIssues"
                    type="text"
                    placeholder="e.g., Kidney disease, Liver issues"
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="medications">Current Medications (if any)</label>
                  <input
                    id="medications"
                    name="medications"
                    type="text"
                    placeholder="e.g., Warfarin, Insulin"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn primary-btn">
                Submit Profile
              </button>
            </div>
          </form>
        </div>
      </div>

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
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
          
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
            <Link to="/register/donor" className="navbar-link"> Find Donor</Link>     
              <li><Link to="/FAQ">FAQ</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-contact">
            <h3>Contact Us</h3>
            <p><i className="fas fa-envelope"></i> info@bloodconnect.com</p>
            <p><i className="fas fa-phone"></i> +1 234 567 890</p>
            <p><i className="fas fa-map-marker-alt"></i> 123 Health St, Medical City</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} BloodConnect. All rights reserved.</p>
        </div>
      </footer>

      {/* CSS Styles */}
      <style jsx>{`
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
        
        .register-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: #f8f9fa;
        }
        
        /* Form Wrapper */
        .form-wrapper {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem 5%;
        }
        
        .form-container {
          width: 100%;
          max-width: 900px;
          background-color: var(--white);
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }
        
        .form-header {
          padding: 2rem;
          text-align: center;
          background: linear-gradient(135deg, #fff5f5 0%, #fff 100%);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }
        
        .form-header h2 {
          font-size: 2rem;
          color: var(--dark);
          margin-bottom: 0.5rem;
        }
        
        .form-header p {
          color: var(--gray);
        }
        
        /* Form Styles */
        .recipient-form {
          padding: 2rem;
        }
        
        .form-grid {
          display: grid;
          gap: 2rem;
        }
        
        .form-section {
          background-color: var(--white);
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
        }
        
        .section-title {
          font-size: 1.2rem;
          color: var(--primary);
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--light);
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: var(--secondary);
          font-size: 0.9rem;
        }
        
        input, select {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        
        input:focus, select:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(255, 71, 87, 0.2);
        }
        
        /* Checkbox Styles */
        .checkbox-group {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }
        
        .checkbox-label {
          display: flex;
          align-items: center;
          cursor: pointer;
          position: relative;
          padding-left: 2rem;
          user-select: none;
        }
        
        .checkbox-label input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }
        
        .checkbox-custom {
          position: absolute;
          top: 0;
          left: 0;
          height: 1.25rem;
          width: 1.25rem;
          background-color: var(--white);
          border: 1px solid #ddd;
          border-radius: 4px;
          transition: all 0.3s ease;
        }
        
        .checkbox-label:hover .checkbox-custom {
          background-color: #f8f9fa;
        }
        
        .checkbox-label input:checked ~ .checkbox-custom {
          background-color: var(--primary);
          border-color: var(--primary);
        }
        
        .checkbox-custom:after {
          content: "";
          position: absolute;
          display: none;
        }
        
        .checkbox-label input:checked ~ .checkbox-custom:after {
          display: block;
        }
        
        .checkbox-label .checkbox-custom:after {
          left: 7px;
          top: 3px;
          width: 5px;
          height: 10px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
        
        /* Form Actions */
        .form-actions {
          display: flex;
          justify-content: center;
          margin-top: 2rem;
        }
        
        .form-actions .btn {
          padding: 1rem 2rem;
          font-size: 1.1rem;
        }
        
        /* Responsive Styles */
        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }
          
          .form-header h2 {
            font-size: 1.8rem;
          }
          
          .checkbox-group {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
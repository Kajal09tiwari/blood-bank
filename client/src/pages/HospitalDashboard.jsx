import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Hospital.css";

const DashboardHospital = () => {
  const [donors, setDonors] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("https://blood-bank-1-7t8o.onrender.com")
      .then((res) => res.json())
      .then((data) => {
        setDonors(data.donors || []);
        setRecipients(data.recipients || []);
      });
  }, []);

  const approveDonor = async (donorId) => {
    setLoading(true);
    try {
      const response = await fetch(`https://blood-bank-1-7t8o.onrender.com`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Error: ${text}`);
      }

      const data = await response.json();
      alert("Donor approved!");

      setDonors((prevDonors) =>
        prevDonors.map((donor) =>
          donor._id === donorId ? { ...donor, approvedByHospital: true } : donor
        )
      );
    } catch (err) {
      console.error("Error approving donor:", err);
      alert("Server error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getCompatibleRecipients = (donorBloodType) => {
    return recipients.filter((recipient) => recipient.bloodType === donorBloodType);
  };

  const getCompatibleDonors = (recipientBloodType) => {
    const compatibility = {
      "A+": ["A+", "A-", "O+", "O-"],
      "A-": ["A-", "O-"],
      "B+": ["B+", "B-", "O+", "O-"],
      "B-": ["B-", "O-"],
      "AB+": ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      "AB-": ["A-", "B-", "AB-", "O-"],
      "O+": ["O+", "O-"],
      "O-": ["O-"],
    };

    return donors.filter((donor) =>
      compatibility[recipientBloodType]?.includes(donor.bloodType)
    );
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <span className="logo-icon">🩸</span>
            <span>BloodConnect</span>
          </Link>
          <div className="navbar-links">
            <Link to="/" className="navbar-link">Home</Link>
            <Link to="/about" className="navbar-link">About</Link>
            <Link to="/dashboard" className="navbar-link active">Dashboard</Link>
            <Link to="/contact" className="navbar-link">Contact</Link>
          </div>
        </div>
      </nav>

      <main className="dashboard-content">
        <div className="dashboard-header">
          <h2>Hospital Dashboard</h2>
          <p>Manage donor approvals</p>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h3>Donors</h3>
            <p>View and approve registered donors</p>
          </div>

          <div className="matches-section">
            <h4>Donors:</h4>
            <div className="matches-grid">
              {donors.map((donor, index) => (
                <div key={index} className="match-card">
                  <div className="match-card-header">
                    <span className="donor-badge">Donor</span>
                    <span className="compatibility-score">
                      {donor.approvedByHospital ? "Approved" : "Pending"}
                    </span>
                  </div>
                  <div className="match-card-body">
                    <h5>{donor.name}</h5>
                    <div className="match-details">
                      <div className="detail-item">
                        <span className="detail-label">Blood Type:</span>
                        <span className="detail-value">{donor.bloodType}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Location:</span>
                        <span className="detail-value">{donor.location || 'Not specified'}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Last Donation:</span>
                        <span className="detail-value">{donor.lastDonationDate || 'Not specified'}</span>
                      </div>
                    </div>
                  </div>

                  {/* <div className="match-compatibility">
                    <h6>Compatible Recipients:</h6>
                    {getCompatibleRecipients(donor.bloodType).length === 0 ? (
                      <p>No match found</p>
                    ) : (
                      getCompatibleRecipients(donor.bloodType).map((recipient, i) => (
                        <div key={i} className="recipient-match">
                          <p><strong>Name:</strong> {recipient.name}</p>
                          <p><strong>Blood Type:</strong> {recipient.bloodType}</p>
                          <p><strong>Location:</strong> {recipient.location || 'Not specified'}</p>
                        </div>
                      ))
                    )}
                  </div> */}

                  <div className="match-card-footer">
                    {donor.approvedByHospital ? (
                      <button className="btn outline-btn small-btn" disabled>
                        Approved
                      </button>
                    ) : (
                      <button
                        className="btn primary-btn small-btn"
                        onClick={() => approveDonor(donor._id)}
                        disabled={loading}
                      >
                        {loading ? "Processing..." : "Approve"}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RECIPIENTS SECTION */}
          <div className="card-header">
            <h3>Recipients</h3>
            <p>View all registered recipients</p>
          </div>

          <div className="matches-section">
            <h4>Recipients:</h4>
            <div className="matches-grid">
              {recipients.map((recipient, index) => (
                <div key={index} className="match-card">
                  <div className="match-card-header">
                    <span className="donor-badge">Recipient</span>
                  </div>
                  <div className="match-card-body">
                    <h5>{recipient.name}</h5>
                    <div className="match-details">
                      <div className="detail-item">
                        <span className="detail-label">Blood Type:</span>
                        <span className="detail-value">{recipient.bloodType}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Location:</span>
                        <span className="detail-value">{recipient.location || 'Not specified'}</span>
                      </div>
                    </div>

                    <div className="match-compatibility">
                      <h6>Compatible Donors:</h6>
                      {getCompatibleDonors(recipient.bloodType).length === 0 ? (
                        <p>No compatible donors found</p>
                      ) : (
                        getCompatibleDonors(recipient.bloodType).map((donor, i) => (
                          <div key={i} className="recipient-match">
                            <p><strong>Name:</strong> {donor.name}</p>
                            <p><strong>Blood Type:</strong> {donor.bloodType}</p>
                            <p><strong>Location:</strong> {donor.location || 'Not specified'}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="match-card-footer">
                    <button className="btn outline-btn small-btn">Contact</button>
                    <button className="btn primary-btn small-btn">Request</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

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
    </div>
  );
};

export default DashboardHospital;

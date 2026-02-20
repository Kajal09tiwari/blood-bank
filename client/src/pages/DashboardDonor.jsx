import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DashboardDonor = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const storedProfile = localStorage.getItem("donorProfile");

    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    } else {
      // fallback API fetch if localStorage empty
      const fetchProfile = async () => {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/donor-profile/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setProfile(data);
      };

      fetchProfile();
    }
  }, []);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="dashboard-container">
      {/* Navbar - Same as Home component */}
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
            <Link to="/dashboard" className="navbar-link active">Dashboard</Link>
          </div>
        </div>
      </nav>

      {/* Dashboard Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-header">
          <h1>Donor Dashboard</h1>
          <p>Welcome back to your donation hub</p>
        </div>

        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            <div className="profile-info">
              <h2>{profile.name}</h2>
              <p className="blood-type">{profile.bloodType}</p>
            </div>
          </div>

          <div className="profile-details">
            <div className="detail-row">
              <span className="detail-label">Age</span>
              <span className="detail-value">{profile.age}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Gender</span>
              <span className="detail-value">{profile.gender}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Weight</span>
              <span className="detail-value">{profile.weight} kg</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Hemoglobin Level</span>
              <span className="detail-value">{profile.hemoglobin} g/dL</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Last Donation</span>
              <span className="detail-value">
                {profile.lastDonation || "Not available"}
              </span>
            </div>
          </div>

          <div className="profile-actions">
            <button className="btn primary-btn">Update Profile</button>
            <button className="btn outline-btn">Donation History</button>
          </div>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Total Donations</h3>
            <p className="stat-number">5</p>
            <p className="stat-description">times donated</p>
          </div>
          <div className="stat-card">
            <h3>Last Donation</h3>
            <p className="stat-number">3</p>
            <p className="stat-description">months ago</p>
          </div>
          <div className="stat-card highlight">
            <h3>Next Eligible</h3>
            <p className="stat-number">Now</p>
            <p className="stat-description">ready to donate</p>
          </div>
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button className="action-btn">
              <span className="action-icon">📅</span>
              <span>Schedule Donation</span>
            </button>
            <button className="action-btn">
              <span className="action-icon">🏥</span>
              <span>Find Centers</span>
            </button>
            <button className="action-btn">
              <span className="action-icon">💬</span>
              <span>Get Help</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer - Same as Home component */}
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
              <li><Link to="/register/donor">Find Donors</Link></li>
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
        /* Dashboard Specific Styles */
        .dashboard-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: #f8f9fa;
        }
        
        .dashboard-main {
          flex: 1;
          padding: 2rem 5%;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
        }
        
        .dashboard-header {
          margin-bottom: 2.5rem;
          text-align: center;
        }
        
        .dashboard-header h1 {
          font-size: 2.5rem;
          color: var(--dark);
          margin-bottom: 0.5rem;
        }
        
        .dashboard-header p {
          color: var(--gray);
          font-size: 1.1rem;
        }
        
        /* Profile Card */
        .profile-card {
          background-color: var(--white);
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          padding: 2rem;
          margin-bottom: 2rem;
        }
        
        .profile-header {
          display: flex;
          align-items: center;
          margin-bottom: 2rem;
        }
        
        .profile-avatar {
          width: 80px;
          height: 80px;
          background-color: var(--primary);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: bold;
          margin-right: 1.5rem;
        }
        
        .profile-info h2 {
          font-size: 1.8rem;
          color: var(--dark);
          margin-bottom: 0.5rem;
        }
        
        .blood-type {
          background-color: #ffecec;
          color: var(--primary);
          padding: 0.3rem 1rem;
          border-radius: 50px;
          font-weight: 600;
          display: inline-block;
        }
        
        .profile-details {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .detail-row {
          background-color: var(--light);
          padding: 1rem;
          border-radius: 8px;
        }
        
        .detail-label {
          display: block;
          color: var(--gray);
          font-size: 0.9rem;
          margin-bottom: 0.3rem;
        }
        
        .detail-value {
          font-weight: 600;
          color: var(--dark);
        }
        
        .profile-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1.5rem;
        }
        
        /* Stats Section */
        .dashboard-stats {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .stat-card {
          background-color: var(--white);
          border-radius: 15px;
          padding: 1.5rem;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          text-align: center;
        }
        
        .stat-card.highlight {
          background-color: var(--primary);
          color: white;
        }
        
        .stat-card.highlight h3,
        .stat-card.highlight .stat-number,
        .stat-card.highlight .stat-description {
          color: white;
        }
        
        .stat-card h3 {
          font-size: 1.1rem;
          color: var(--gray);
          margin-bottom: 0.5rem;
        }
        
        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 0.3rem;
        }
        
        .stat-description {
          font-size: 0.9rem;
          color: var(--gray);
        }
        
        /* Quick Actions */
        .quick-actions {
          margin-top: 3rem;
        }
        
        .quick-actions h2 {
          font-size: 1.8rem;
          color: var(--dark);
          margin-bottom: 1.5rem;
          text-align: center;
        }
        
        .action-buttons {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
        }
        
        .action-btn {
          background-color: var(--white);
          border: none;
          border-radius: 15px;
          padding: 2rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }
        
        .action-btn:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .action-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        
        /* Responsive Styles */
        @media (max-width: 768px) {
          .profile-header {
            flex-direction: column;
            text-align: center;
          }
          
          .profile-avatar {
            margin-right: 0;
            margin-bottom: 1rem;
          }
          
          .profile-actions {
            flex-direction: column;
          }
          
          .btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardDonor;
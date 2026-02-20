// import React, { useState, useEffect } from "react";

// const DashboardRecipient = () => {
//   const [recipientId, setRecipientId] = useState(""); // get this from login or localStorage
//   const [matches, setMatches] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const storedId = localStorage.getItem("recipientId"); // set this during login/register
//     if (storedId) setRecipientId(storedId);
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!recipientId) {
//       alert("Recipient ID not found");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch("http://localhost:5000/api/compatibility/match", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ recipientId }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setMatches(data);
//       } else {
//         alert(data.error || "Failed to fetch matches");
//       }
//     } catch (err) {
//       console.error("Error fetching matches:", err);
//       alert("Server error while fetching matches");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Recipient Dashboard</h2>
//       <button onClick={handleSubmit}>Check Compatibility Matches</button>

//       {loading && <p>Loading matches...</p>}

//       {matches.length > 0 && (
//         <div className="matches">
//           <h3>Matched Donors:</h3>
//           <ul>
//             {matches.map((item, index) => (
//               <li key={index}>
//                 <strong>{item.donor.name}</strong> - Blood Type: {item.donor.bloodType}, 
//                 Score: {item.compatibility}%
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {!loading && matches.length === 0 && (
//         <p>No compatible donors found yet. Try again later.</p>
//       )}
//     </div>
//   );
// };

// export default DashboardRecipient;



import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const DashboardRecipient = () => {
  const [recipientId, setRecipientId] = useState("");
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedId = localStorage.getItem("recipientId");
    if (storedId) setRecipientId(storedId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recipientId) {
      alert("Recipient ID not found");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/compatibility/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipientId }),
      });

      const data = await response.json();
      if (response.ok) {
        setMatches(data);
      } else {
        alert(data.error || "Failed to fetch matches");
      }
    } catch (err) {
      console.error("Error fetching matches:", err);
      alert("Server error while fetching matches");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
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
            <Link to="/dashboard" className="navbar-link active">Dashboard</Link>
          </div>
        </div>
      </nav>

      {/* Main Dashboard Content */}
      <main className="dashboard-content">
        <div className="dashboard-header">
          <h2>Recipient Dashboard</h2>
          <p>View your compatible blood donors and manage your requests</p>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h3>Find Compatible Donors</h3>
            <p>Click below to check for donors matching your blood type</p>
          </div>
          
          <button 
            onClick={handleSubmit} 
            className="btn primary-btn"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Check Compatibility Matches'}
          </button>

          {loading && (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Searching for compatible donors...</p>
            </div>
          )}

          {matches.length > 0 && (
            <div className="matches-section">
              <h4>Matched Donors:</h4>
              <div className="matches-grid">
                {matches.map((item, index) => (
                  <div key={index} className="match-card">
                    <div className="match-card-header">
                      <span className="donor-badge">Donor</span>
                      <span className="compatibility-score">{item.compatibility}% Match</span>
                    </div>
                    <div className="match-card-body">
                      <h5>{item.donor.name}</h5>
                      <div className="match-details">
                        <div className="detail-item">
                          <span className="detail-label">Blood Type:</span>
                          <span className="detail-value">{item.donor.bloodType}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Location:</span>
                          <span className="detail-value">{item.donor.location || 'Not specified'}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Last Donation:</span>
                          <span className="detail-value">{item.donor.lastDonation || 'Unknown'}</span>
                        </div>
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
          )}

          {!loading && matches.length === 0 && (
            <div className="no-matches">
<img src="img.png
          " />              <p>No compatible donors found yet. Please try again later.</p>
            </div>
          )}
        </div>
      </main>

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

      {/* Styles */}
      <style jsx>{`
        /* Dashboard Container */
        .dashboard-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: #f8f9fa;
        }
        
        /* Dashboard Content */
        .dashboard-content {
          flex: 1;
          padding: 2rem 5%;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
        }
        
        .dashboard-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .dashboard-header h2 {
          font-size: 2.5rem;
          color: var(--dark);
          margin-bottom: 0.5rem;
        }
        
        .dashboard-header p {
          color: var(--gray);
          font-size: 1.1rem;
        }
        
        /* Dashboard Card */
        .dashboard-card {
          background-color: var(--white);
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          padding: 2rem;
          margin-bottom: 3rem;
        }
        
        .card-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .card-header h3 {
          font-size: 1.8rem;
          color: var(--dark);
          margin-bottom: 0.5rem;
        }
        
        .card-header p {
          color: var(--gray);
        }
        
        /* Matches Section */
        .matches-section {
          margin-top: 3rem;
        }
        
        .matches-section h4 {
          font-size: 1.5rem;
          color: var(--dark);
          margin-bottom: 1.5rem;
          text-align: center;
        }
        
        .matches-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        
        .match-card {
          background-color: var(--white);
          border-radius: 8px;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          border: 1px solid #eee;
          transition: transform 0.3s ease;
        }
        
        .match-card:hover {
          transform: translateY(-5px);
        }
        
        .match-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1.25rem;
          background-color: var(--light);
          border-bottom: 1px solid #eee;
        }
        
        .donor-badge {
          background-color: var(--primary);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        
        .compatibility-score {
          font-weight: 600;
          color: var(--primary);
        }
        
        .match-card-body {
          padding: 1.25rem;
        }
        
        .match-card-body h5 {
          font-size: 1.25rem;
          margin-bottom: 1rem;
          color: var(--dark);
        }
        
        .match-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }
        
        .detail-item {
          display: flex;
          flex-direction: column;
        }
        
        .detail-label {
          font-size: 0.8rem;
          color: var(--gray);
        }
        
        .detail-value {
          font-weight: 500;
          color: var(--dark);
        }
        
        .match-card-footer {
          display: flex;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          border-top: 1px solid #eee;
        }
        
        .small-btn {
          padding: 0.5rem 1rem;
          font-size: 0.9rem;
        }
        
        /* No Matches */
        .no-matches {
          text-align: center;
          padding: 2rem;
        }
        
        .no-matches img {
          max-width: 200px;
          margin-bottom: 1.5rem;
        }
        
        .no-matches p {
          color: var(--gray);
          font-size: 1.1rem;
        }
        
        /* Loading Spinner */
        .loading-spinner {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(255, 71, 87, 0.2);
          border-radius: 50%;
          border-top-color: var(--primary);
          animation: spin 1s ease-in-out infinite;
          margin-bottom: 1rem;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        /* Shared Variables */
        :root {
          --primary: #ff4757;
          --primary-dark: #e84118;
          --secondary: #2f3542;
          --light: #f1f2f6;
          --dark: #1e272e;
          --gray: #a4b0be;
          --white: #ffffff;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .dashboard-header h2 {
            font-size: 2rem;
          }
          
          .matches-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardRecipient;
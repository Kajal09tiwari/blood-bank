import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./DonorForm.css";

export default function DonorForm() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    location: "", 
    bloodType: "",
    weight: "",
    hemoglobinLevel: "",
    bloodPressure: "",
    diabetes: false,
    infections: false,
    hiv: false,
    lastDonationDate: "",
    smoker: false,
    alcoholUse: false,
    medications: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (formData.lastDonationDate) {
      const lastDate = new Date(formData.lastDonationDate);
      const today = new Date();
      const diff = (today - lastDate) / (1000 * 60 * 60 * 24);
      if (diff < 90) {
        alert('⚠ You can donate blood only after 3 months from your last donation.');
        return;
      }
    }
    
    if (formData.age < 18) {
      alert("Age must be 18 or older.");
      return;
    }

    if (parseFloat(formData.hemoglobinLevel) < 12.5) {
      alert("Hemoglobin level must be at least 12.5 g/dL.");
      return;
    }

    try {
      const userId = localStorage.getItem("userId");
      const finalFormData = {
        ...formData,
        medications: formData.medications.trim() === "" ? "None" : formData.medications.trim(),
        userId,
      };

      const res = await fetch("https://blood-bank-1-7t8o.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(finalFormData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Donor profile submitted successfully!");
        navigate("/dashboard/donor");
      } else {
        alert(data.error || "Error submitting form");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Server error");
    }
  };

  return (
    <div className="donor-form-container">
      {/* Navbar */}
      <nav className="donor-form-navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            BloodConnect
          </Link>
          <ul className="nav-menu">
            <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
            <li className="nav-item"><Link to="/register/donor" className="navbar-link">Find Donor</Link></li>
            <li className="nav-item"><Link to="/FAQ" className="nav-link">FAQ</Link></li>
            <li className="nav-item"><Link to="/about" className="nav-link">About</Link></li>
            <li className="nav-item"><Link to="/contact" className="nav-link">Contact</Link></li>
          </ul>
        </div>
      </nav>

      {/* Form Content */}
      <div className="form-wrapper">
        <form className="donor-form" onSubmit={handleSubmit}>
          <h2 className="form-title">Donor Registration</h2>
          <p className="form-subtitle">Help save lives by completing your donor profile</p>

          <div className="form-grid">
            {/* Personal Information */}
            <div className="form-section">
              <h3 className="section-title">Personal Information</h3>
              <div className="input-group">
                <label>Full Name</label>
                <input name="name" placeholder="John Doe" onChange={handleChange} required />
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label>Age</label>
                  <input name="age" type="number" placeholder="18+" onChange={handleChange} required />
                </div>

                <div className="input-group">
                  <label>Gender</label>
                  <select name="gender" onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="location-group">
  <label>Location</label>
  <select name="location" onChange={handleChange} required>
    <option value="">Select Location</option>
    <option value="Jaipur">Jaipur</option>
    <option value="Delhi">Delhi</option>
    <option value="Mumbai">Mumbai</option>
    <option value="Kolkata">Kolkata</option>
    {/* Add more cities/locations as needed */}
  </select>
</div>
            </div>

            {/* Health Information */}
            <div className="form-section">
              <h3 className="section-title">Health Information</h3>
              <div className="input-row">
                <div className="input-group">
                  <label>Blood Type</label>
                  <select name="bloodType" onChange={handleChange} required>
                    <option value="">Select</option>
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

                <div className="input-group">
                  <label>Weight (kg)</label>
                  <input name="weight" type="number" placeholder="50+" onChange={handleChange} required />
                </div>
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label>Hemoglobin (g/dL)</label>
                  <input name="hemoglobinLevel" type="number" step="0.1" placeholder="12.5+" onChange={handleChange} required />
                </div>

                <div className="input-group">
                  <label>Blood Pressure</label>
                  <select name="bloodPressure" onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Medical History */}
            <div className="form-section">
              <h3 className="section-title">Medical History</h3>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input type="checkbox" name="diabetes" onChange={handleChange} />
                  <span className="checkmark"></span> Diabetes
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" name="infections" onChange={handleChange} />
                  <span className="checkmark"></span> Infections
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" name="hiv" onChange={handleChange} />
                  <span className="checkmark"></span> HIV Positive
                </label>
              </div>

              <div className="checkbox-group">
  <label className="checkbox-label">
    <input type="checkbox" name="donateAfter3Months" onChange={handleChange} />
    <span className="checkmark"></span> Eligible to donate after 3 months
  </label>
</div>
            </div>

            {/* Lifestyle */}
            <div className="form-section">
              <h3 className="section-title">Lifestyle</h3>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input type="checkbox" name="smoker" onChange={handleChange} />
                  <span className="checkmark"></span> Smoker
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" name="alcoholUse" onChange={handleChange} />
                  <span className="checkmark"></span> Alcohol Use
                </label>
              </div>

              <div className="input-group">
                <label>Current Medications</label>
                <input
                  name="medications"
                  placeholder="List any medications you're taking"
                  value={formData.medications}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Submit Donor Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}




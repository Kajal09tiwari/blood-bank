# 🩸 Blood Bank API - Quick Reference Guide

## Table of Contents
1. [Getting Started](#getting-started)
2. [Authentication](#authentication)
3. [Common Patterns](#common-patterns)
4. [API Functions](#api-functions)
5. [Error Handling](#error-handling)

---

## Getting Started

### Import API Services
```javascript
import { 
  authAPIs, 
  donorAPIs, 
  recipientAPIs, 
  bloodRequestAPIs, 
  compatibilityAPIs 
} from "../services/api";
```

### API Base URL
```
https://blood-bank-1-7t8o.onrender.com/api
```

---

## Authentication

### Login
```javascript
const handleLogin = async (email, password) => {
  try {
    const data = await authAPIs.login({ email, password });
    
    if (data.token && data.user) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      // Redirect to dashboard
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
};
```

### Register
```javascript
const handleRegister = async (name, email, password, role) => {
  try {
    const data = await authAPIs.register({ 
      name, 
      email, 
      password, 
      role // "donor", "recipient", or "hospital"
    });
    
    if (data.token) {
      localStorage.setItem("token", data.token);
      // Redirect to next step
    }
  } catch (error) {
    console.error("Registration failed:", error);
  }
};
```

### Logout
```javascript
const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  // Redirect to login
};
```

---

## Common Patterns

### Pattern 1: Fetching Data on Component Mount
```javascript
import { useEffect, useState } from "react";
import { donorAPIs } from "../services/api";

export function MyComponent() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await donorAPIs.getMyInfo();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array = run once on mount

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return <div>{profile?.name}</div>;
}
```

### Pattern 2: Form Submission
```javascript
const handleSubmit = async (e, formData) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await donorAPIs.addDonor(formData);
    
    if (response.message) {
      alert("Success!");
      navigate("/dashboard");
    } else {
      alert(response.error || "Failed");
    }
  } catch (error) {
    alert("Error: " + error.message);
  } finally {
    setLoading(false);
  }
};
```

### Pattern 3: Search/Filter with Query Params
```javascript
const handleSearch = async (bloodGroup, city) => {
  try {
    const results = await donorAPIs.searchDonors(bloodGroup, city);
    setSearchResults(results);
  } catch (error) {
    console.error("Search failed:", error);
  }
};
```

---

## API Functions

### Auth APIs
| Function | Method | Auth Required | Returns |
|----------|--------|---------------|---------|
| `authAPIs.register(userData)` | POST | ❌ | `{ token, user }` |
| `authAPIs.login(credentials)` | POST | ❌ | `{ token, user }` |

### Donor APIs
| Function | Method | Auth Required | Returns |
|----------|--------|---------------|---------|
| `donorAPIs.addDonor(data)` | POST | ✅ | `{ message, donor }` |
| `donorAPIs.getMyInfo()` | GET | ✅ | Donor object |
| `donorAPIs.searchDonors(bloodGroup, city)` | GET | ❌ | Array of donors |
| `donorAPIs.getAllDonors()` | GET | ✅ Admin | Array of all donors |
| `donorAPIs.updateDonor(data)` | PUT | ✅ | `{ message, donor }` |

### Recipient APIs
| Function | Method | Auth Required | Returns |
|----------|--------|---------------|---------|
| `recipientAPIs.addRecipient(data)` | POST | ❌ | Recipient object |
| `recipientAPIs.getAllRecipients()` | GET | ❌ | Array of recipients |

### Blood Request APIs
| Function | Method | Auth Required | Returns |
|----------|--------|---------------|---------|
| `bloodRequestAPIs.addRequest(data)` | POST | ✅ | `{ message, bloodRequest }` |
| `bloodRequestAPIs.getAllRequests()` | GET | ❌ | Array of requests |
| `bloodRequestAPIs.getMyRequests()` | GET | ✅ | Array of user's requests |
| `bloodRequestAPIs.updateRequest(id, data)` | PUT | ✅ | `{ message, request }` |
| `bloodRequestAPIs.getActiveRequests()` | GET | ❌ | Array of active requests |
| `bloodRequestAPIs.deleteRequest(id)` | DELETE | ✅ | `{ message }` |

### Compatibility APIs
| Function | Method | Auth Required | Returns |
|----------|--------|---------------|---------|
| `compatibilityAPIs.getMatches(recipientId)` | POST | ❌ | Array of matches with scores |
| `compatibilityAPIs.addDonorProfile(data)` | POST | ❌ | Donor profile |
| `compatibilityAPIs.addRecipientProfile(data)` | POST | ❌ | Recipient profile |
| `compatibilityAPIs.getAllDonorProfiles()` | GET | ❌ | Array of profiles |

---

## Error Handling

### Try-Catch Block
```javascript
try {
  const data = await donorAPIs.getMyInfo();
  // Process data
} catch (error) {
  console.error("Error details:", error);
  // Show user-friendly error message
}
```

### Error Response Format
```javascript
{
  "message": "Error description",
  "field": "field_name", // Optional, for validation errors
  "error": "error_code"   // Alternative error field
}
```

### Common HTTP Status Codes
- **200**: Success
- **201**: Created successfully
- **400**: Bad request (validation error)
- **401**: Unauthorized (no/invalid token)
- **403**: Forbidden (insufficient permissions)
- **404**: Resource not found
- **500**: Server error

---

## Real-World Examples

### Example 1: Complete Donor Registration Flow
```javascript
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPIs, donorAPIs } from "../services/api";

export function DonorRegistration() {
  const [step, setStep] = useState("auth"); // "auth" or "profile"
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Step 1: Register account
  const handleAuthRegister = async (name, email, password) => {
    try {
      const data = await authAPIs.register({
        name,
        email,
        password,
        role: "donor"
      });

      if (data.token) {
        localStorage.setItem("token", data.token);
        setStep("profile"); // Move to profile step
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Step 2: Complete donor profile
  const handleProfileComplete = async (profileData) => {
    try {
      const result = await donorAPIs.addDonor(profileData);
      
      if (result.message) {
        navigate("/dashboard/donor");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      {error && <div className="alert">{error}</div>}
      {step === "auth" ? (
        <AuthForm onSubmit={handleAuthRegister} />
      ) : (
        <ProfileForm onSubmit={handleProfileComplete} />
      )}
    </div>
  );
}
```

### Example 2: Recipient Finding Compatible Donors
```javascript
import { useState, useEffect } from "react";
import { compatibilityAPIs } from "../services/api";

export function FindDonors() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFindDonors = async (recipientId) => {
    setLoading(true);
    try {
      const data = await compatibilityAPIs.getMatches(recipientId);
      
      // Sort by compatibility score (highest first)
      const sorted = data.sort((a, b) => b.compatibility - a.compatibility);
      setMatches(sorted);
    } catch (error) {
      alert("Failed to find donors: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={() => handleFindDonors(recipientId)}>
        Find Compatible Donors
      </button>

      {loading && <p>Searching...</p>}

      {matches.length > 0 && (
        <div className="matches-list">
          {matches.map((match) => (
            <div key={match.donor._id} className="match-card">
              <h3>{match.donor.name}</h3>
              <p>Blood Type: {match.donor.bloodGroup}</p>
              <p>Location: {match.donor.city}</p>
              <p className="compatibility">
                Compatibility Score: {match.compatibility}%
              </p>
              <button>Contact Donor</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

### Example 3: Hospital Viewing Donors
```javascript
import { useEffect, useState } from "react";
import { donorAPIs, recipientAPIs } from "../services/api";

export function HospitalDashboard() {
  const [donors, setDonors] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [donorsList, recipientsList] = await Promise.all([
          donorAPIs.getAllDonors(),
          recipientAPIs.getAllRecipients()
        ]);

        setDonors(donorsList);
        setRecipients(recipientsList);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Hospital Dashboard</h2>
      
      <div className="donors-section">
        <h3>Registered Donors ({donors.length})</h3>
        {donors.map((donor) => (
          <div key={donor._id}>
            <p>{donor.name} - {donor.bloodGroup}</p>
            <p>City: {donor.city}</p>
          </div>
        ))}
      </div>

      <div className="recipients-section">
        <h3>Blood Requests ({recipients.length})</h3>
        {recipients.map((recipient) => (
          <div key={recipient._id}>
            <p>{recipient.name} - {recipient.bloodType}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## Checklist Before Deployment

- [ ] Token is stored in localStorage after login
- [ ] Token is sent with protected API calls
- [ ] Error messages are user-friendly
- [ ] Loading states are shown during API calls
- [ ] API responds correctly for all test cases
- [ ] CORS is configured correctly
- [ ] Environment variables are set (if needed)
- [ ] API rate limiting is considered
- [ ] Sensitive data is not logged
- [ ] Token is cleared on logout

---

## Troubleshooting

### Issue: "Access denied, no token provided"
**Solution**: Ensure token is in localStorage and Bearer prefix is included in Authorization header. Check if `getAuthHeaders()` is working correctly.

### Issue: CORS Error
**Solution**: Verify that the API server's CORS configuration includes your frontend domain.

### Issue: 404 Not Found
**Solution**: Double-check the endpoint path. Compare with API_DOCUMENTATION.md.

### Issue: Token Expired
**Solution**: Implement token refresh logic or redirect to login page when 401 is received.

---

## Resources

- 📄 **API_DOCUMENTATION.md** - Complete API reference
- 📄 **API_FIXES_SUMMARY.md** - Summary of all fixes made
- 📁 **client/src/services/api.js** - API service implementation
- 🔗 **Backend**: GitHub repository or deployed server URL

---

**Last Updated**: February 2025
**Status**: ✅ All APIs correctly configured and ready to use

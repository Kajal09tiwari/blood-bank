// API Configuration
const API_BASE_URL = "https://blood-bank-1-7t8o.onrender.com/api";

// Helper function to get token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// ===== AUTH APIS =====
export const authAPIs = {
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(credentials),
    });
    return response.json();
  },
};

// ===== DONOR APIS =====
export const donorAPIs = {
  addDonor: async (donorData) => {
    const response = await fetch(`${API_BASE_URL}/donor/add`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(donorData),
    });
    return response.json();
  },

  getMyInfo: async () => {
    const response = await fetch(`${API_BASE_URL}/donor/my-info`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  searchDonors: async (bloodGroup, city) => {
    const response = await fetch(
      `${API_BASE_URL}/donor/search?bloodGroup=${bloodGroup}&city=${city}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.json();
  },

  getAllDonors: async () => {
    const response = await fetch(`${API_BASE_URL}/donor/all`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  updateDonor: async (donorData) => {
    const response = await fetch(`${API_BASE_URL}/donor/update`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(donorData),
    });
    return response.json();
  },
};

// ===== RECIPIENT APIS =====
export const recipientAPIs = {
  addRecipient: async (recipientData) => {
    const response = await fetch(`${API_BASE_URL}/recipient`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipientData),
    });
    return response.json();
  },

  getAllRecipients: async () => {
    const response = await fetch(`${API_BASE_URL}/recipient`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return response.json();
  },
};

// ===== BLOOD REQUEST APIS =====
export const bloodRequestAPIs = {
  addRequest: async (requestData) => {
    const response = await fetch(`${API_BASE_URL}/blood-requests/add`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(requestData),
    });
    return response.json();
  },

  getAllRequests: async () => {
    const response = await fetch(`${API_BASE_URL}/blood-requests`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return response.json();
  },

  getMyRequests: async () => {
    const response = await fetch(`${API_BASE_URL}/blood-requests/my-requests`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  updateRequest: async (id, updateData) => {
    const response = await fetch(`${API_BASE_URL}/blood-requests/update/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(updateData),
    });
    return response.json();
  },

  getActiveRequests: async () => {
    const response = await fetch(`${API_BASE_URL}/blood-requests/active-requests`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return response.json();
  },

  deleteRequest: async (id) => {
    const response = await fetch(`${API_BASE_URL}/blood-requests/delete/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return response.json();
  },
};

// ===== COMPATIBILITY APIS =====
export const compatibilityAPIs = {
  getMatches: async (recipientId) => {
    const response = await fetch(`${API_BASE_URL}/compatibility/match`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipientId }),
    });
    return response.json();
  },

  addDonorProfile: async (donorData) => {
    const response = await fetch(`${API_BASE_URL}/compatibility/donor`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(donorData),
    });
    return response.json();
  },

  addRecipientProfile: async (recipientData) => {
    const response = await fetch(`${API_BASE_URL}/compatibility/recipient`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipientData),
    });
    return response.json();
  },

  getAllDonorProfiles: async () => {
    const response = await fetch(`${API_BASE_URL}/compatibility/donors`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return response.json();
  },
};

export default {
  authAPIs,
  donorAPIs,
  recipientAPIs,
  bloodRequestAPIs,
  compatibilityAPIs,
};

# Blood Bank API Documentation

## API Base URL
```
https://blood-bank-1-7t8o.onrender.com/api
```

## Authentication APIs (`/api/auth`)

### 1. Register User
- **Endpoint:** `POST /auth/register`
- **Description:** Register a new user (donor/recipient/hospital)
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "donor" // or "recipient", "hospital"
  }
  ```
- **Response:**
  ```json
  {
    "token": "JWT_TOKEN",
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "donor"
    }
  }
  ```

### 2. Login User
- **Endpoint:** `POST /auth/login`
- **Description:** Login with email and password
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:** Same as Register

---

## Donor APIs (`/api/donor`)

### 1. Add Donor Info
- **Endpoint:** `POST /donor/add`
- **Authentication:** Required (Bearer Token)
- **Description:** Add donor health and blood information
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "bloodGroup": "O+",
    "contactNumber": "9876543210",
    "city": "Delhi",
    "isAvailable": true
  }
  ```
- **Response:**
  ```json
  {
    "message": "Donor information added successfully",
    "donor": { /* donor object */ }
  }
  ```

### 2. Get My Donor Info
- **Endpoint:** `GET /donor/my-info`
- **Authentication:** Required (Bearer Token)
- **Description:** Get logged-in user's donor information
- **Response:**
  ```json
  {
    "_id": "donor_id",
    "userId": "user_id",
    "name": "John Doe",
    "bloodGroup": "O+",
    "contactNumber": "9876543210",
    "city": "Delhi",
    "isAvailable": true
  }
  ```

### 3. Search Donors
- **Endpoint:** `GET /donor/search?bloodGroup=O+&city=Delhi`
- **Authentication:** Not Required
- **Description:** Search donors by blood group and city
- **Query Parameters:**
  - `bloodGroup` (required): Blood group (O+, A+, B+, AB+, etc.)
  - `city` (required): City name
- **Response:** Array of donors

### 4. Get All Donors
- **Endpoint:** `GET /donor/all`
- **Authentication:** Required (Admin Only)
- **Description:** Get all registered donors
- **Response:** Array of all donors

### 5. Update Donor Info
- **Endpoint:** `PUT /donor/update`
- **Authentication:** Required (Bearer Token)
- **Description:** Update own donor information
- **Request Body:** (any field to update)
  ```json
  {
    "bloodGroup": "A+",
    "city": "Mumbai",
    "isAvailable": false
  }
  ```
- **Response:**
  ```json
  {
    "message": "Donor info updated successfully",
    "donor": { /* updated donor object */ }
  }
  ```

---

## Recipient APIs (`/api/recipient`)

### 1. Add Recipient
- **Endpoint:** `POST /recipient`
- **Authentication:** Not Required
- **Description:** Create recipient profile
- **Request Body:**
  ```json
  {
    "name": "Jane Doe",
    "age": 25,
    "gender": "Female",
    "bloodType": "O-",
    "rhFactor": "negative",
    "urgencyLevel": "high",
    "diabetes": false,
    "infections": false,
    "hivStatus": "negative",
    "hemoglobinLevel": 11.5,
    "organIssues": "None",
    "medications": "Aspirin"
  }
  ```
- **Response:**
  ```json
  {
    "_id": "recipient_id",
    "name": "Jane Doe",
    /* other fields */
  }
  ```

### 2. Get All Recipients
- **Endpoint:** `GET /recipient`
- **Authentication:** Not Required
- **Description:** Get all recipient profiles
- **Response:** Array of all recipients

---

## Blood Request APIs (`/api/blood-requests`)

### 1. Create Blood Request
- **Endpoint:** `POST /blood-requests/add`
- **Authentication:** Required (Bearer Token)
- **Description:** Create a blood donation request
- **Request Body:**
  ```json
  {
    "patientName": "John Smith",
    "bloodGroup": "AB+",
    "contactNumber": "9876543210",
    "hospitalName": "City Hospital",
    "city": "Delhi"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Blood request added successfully",
    "bloodRequest": { /* request object */ }
  }
  ```

### 2. Get All Blood Requests
- **Endpoint:** `GET /blood-requests`
- **Authentication:** Not Required
- **Description:** Get all blood requests
- **Response:** Array of blood requests

### 3. Get My Blood Requests
- **Endpoint:** `GET /blood-requests/my-requests`
- **Authentication:** Required (Bearer Token)
- **Description:** Get logged-in user's blood requests
- **Response:** Array of user's requests

### 4. Get Active Blood Requests
- **Endpoint:** `GET /blood-requests/active-requests`
- **Authentication:** Not Required
- **Description:** Get all active (non-expired) blood requests
- **Response:** Array of active requests

### 5. Update Blood Request
- **Endpoint:** `PUT /blood-requests/update/:id`
- **Authentication:** Required (Bearer Token)
- **Description:** Update blood request status
- **Request Body:**
  ```json
  {
    "status": "fulfilled" // or "pending", "fulfilled", "cancelled"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Blood request updated successfully",
    "request": { /* updated request */ }
  }
  ```

### 6. Delete Blood Request
- **Endpoint:** `DELETE /blood-requests/delete/:id`
- **Authentication:** Required (Bearer Token)
- **Description:** Delete a blood request
- **Response:**
  ```json
  {
    "message": "Blood request deleted successfully"
  }
  ```

---

## Compatibility APIs (`/api/compatibility`)

### 1. Get Compatible Donors (Match)
- **Endpoint:** `POST /compatibility/match`
- **Authentication:** Not Required
- **Description:** Find compatible donors for a recipient
- **Request Body:**
  ```json
  {
    "recipientId": "recipient_id"
  }
  ```
- **Response:** Array of matched donors with compatibility scores
  ```json
  [
    {
      "donor": { /* donor profile */ },
      "compatibility": 85
    }
  ]
  ```

### 2. Add Donor Profile
- **Endpoint:** `POST /compatibility/donor`
- **Authentication:** Not Required
- **Description:** Create donor profile for compatibility matching
- **Request Body:** Donor profile data
- **Response:** Created donor profile

### 3. Add Recipient Profile
- **Endpoint:** `POST /compatibility/recipient`
- **Authentication:** Not Required
- **Description:** Create recipient profile for compatibility matching
- **Request Body:** Recipient profile data
- **Response:** Created recipient profile

### 4. Get All Donor Profiles
- **Endpoint:** `GET /compatibility/donors`
- **Authentication:** Not Required
- **Description:** Get all donor profiles
- **Response:** Array of all donor profiles

---

## Common Error Responses

### 401 Unauthorized
```json
{
  "message": "Access denied, no token provided"
}
```

### 403 Forbidden
```json
{
  "message": "Access denied: Unauthorized role"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 400 Bad Request
```json
{
  "message": "Validation error message",
  "field": "field_name" // Optional
}
```

### 500 Server Error
```json
{
  "message": "Internal server error"
}
```

---

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <JWT_TOKEN>
```

The token is obtained from the login or register endpoint and should be stored in localStorage.

---

## API Service Usage in React

The project includes an API service layer (`src/services/api.js`) that provides pre-configured functions for all APIs:

```javascript
import { authAPIs, donorAPIs, recipientAPIs, bloodRequestAPIs, compatibilityAPIs } from "../services/api";

// Example: Register
const data = await authAPIs.register({
  name: "John",
  email: "john@example.com",
  password: "pass123",
  role: "donor"
});

// Example: Login
const data = await authAPIs.login({
  email: "john@example.com",
  password: "pass123"
});

// Example: Add Donor
const data = await donorAPIs.addDonor({
  name: "John",
  bloodGroup: "O+",
  contactNumber: "9876543210",
  city: "Delhi"
});

// Example: Get Compatibility Matches
const data = await compatibilityAPIs.getMatches(recipientId);
```

---

## Important Notes

1. **Token Management**: Store token in localStorage after successful login/register
2. **Error Handling**: Always wrap API calls in try-catch blocks
3. **CORS**: The API is configured to accept requests from the client domain
4. **Bearer Token Format**: Include "Bearer " prefix before the token in Authorization header
5. **Response Codes**: Check response status before using response data

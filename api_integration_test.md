# API Integration Technical Assessment

## **📌 Overview**

This take-home assignment evaluates your **ability to implement a secure, well-structured API integration** using authentication, data transformation, third-party API communication, and caching. The goal is to simulate real-world integration challenges and assess how you handle them.

---

## **📝 Task Description**

Your task is to build a **RESTful API service** that integrates with a **third-party authenticated API**.

### **Scenario:**

A client application needs to retrieve a **list of users from GitHub** and transform the data into a **custom format** before exposing it via an internal API. The service should also implement **caching** to optimize performance and prevent unnecessary API calls.

---

## **📌 Requirements**

### **1. Authentication:**

- The API must authenticate requests using **OAuth 2.0** (GitHub Personal Access Token).
- Use **environment variables** to store API keys securely.

### **2. Data Transformation:**

- Fetch a **list of users from GitHub’s API** (`https://api.github.com/users`).
- Extract **login, id, and avatar_url** fields.
- Convert the response into a **custom format** as follows:

  ```json
  {
    "users": [
      {
        "username": "octocat",
        "identifier": 1,
        "profile_image": "https://github.com/images/error/octocat_happy.gif"
      }
    ]
  }
  ```

### **3. REST API Development:**

- Implement an endpoint:

  ```
  GET /api/users
  ```

- The endpoint should return the **transformed user data**.
- Follow **RESTful best practices**.

### **4. Error Handling:**

- Handle **authentication failures (401/403)**.
- Handle **rate limits (429 Too Many Requests)** with exponential backoff.
- Handle **network failures and API timeouts**.

### **5. Caching:**

- Implement **caching** (Redis preferred) to reduce redundant API calls.
- Cache responses for **5 minutes** to improve performance.

### **6. Performance Optimization:**

- Use **asynchronous processing** where applicable (e.g., fetching users concurrently).
- Implement **retry logic** for transient failures.

---

## **💻 Expected Deliverables**

1. **GitHub Repository with Code**
2. **README.md** (with setup instructions, API documentation)
3. **API Documentation** (Swagger/OpenAPI preferred)
4. **Caching Implementation**
5. **Test Coverage** (Unit + Integration tests)

---

## **📊 Evaluation Criteria**

✅ **Authentication & Security** (OAuth 2.0 implementation, API key management)
✅ **Code Structure & Cleanliness** (Modularity, maintainability)
✅ **Data Transformation Accuracy**
✅ **Error Handling & Logging**
✅ **Caching & Performance Optimization**
✅ **RESTful API Best Practices** (Proper HTTP status codes, naming conventions)
✅ **Scalability Considerations**

---

## **⏳ Time Allocation**

- **~6-8 hours** (Expected completion time)
- This is a take-home assignment, so you can complete it at your own pace within **24 hours**.

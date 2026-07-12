import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// =========================
// Request Interceptor
// =========================

API.interceptors.request.use((config) => {

  const token = localStorage.getItem("access");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;

});

// =========================
// Response Interceptor
// =========================

API.interceptors.response.use(

  (response) => response,

  async (error) => {

    const originalRequest = error.config;

    // If Access Token expired
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {

      originalRequest._retry = true;

      try {

        const refresh = localStorage.getItem("refresh");

        const response = await axios.post(
          "http://127.0.0.1:8000/api/users/refresh/",
          {
            refresh: refresh,
          }
        );

        // Save new access token
        localStorage.setItem(
          "access",
          response.data.access
        );

        // Attach new token
        originalRequest.headers.Authorization =
          `Bearer ${response.data.access}`;

        // Retry original request
        return API(originalRequest);

      } catch (err) {

        // Refresh token expired
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("username");

        window.location.href = "/login";

      }

    }

    return Promise.reject(error);

  }

);

export default API;
import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-bon-bon-vercel-gsyg.vercel.app/api",
  withCredentials: true,
});

// ===============================sn
// REQUEST INTERCEPTOR
// ===============================

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ===============================
// RESPONSE INTERCEPTOR
// ===============================

api.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    // Access token expired
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Refresh token cookie automatically send hogi
        const response = await axios.post(
          "http://localhost:5000/api/auth/refresh-token",
          {},
          {
            withCredentials: true,
          }
        );

        const newAccessToken =
          response.data.accessToken;

        // New token save
        localStorage.setItem(
          "accessToken",
          newAccessToken
        );

        // Original request mein new token
        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        // Original request dobara
        return api(originalRequest);

      } catch (refreshError) {
        console.error(
          "Refresh token failed:",
          refreshError
        );

        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        window.location.href = "/login";

        return Promise.reject(
          refreshError
        );
      }
    }

    return Promise.reject(error);
  }
);

export default api;
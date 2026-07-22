import axios from "axios";
import { store } from "../redux/store";

function joinURL(baseURL, url) {
    return `${baseURL}/${url}`;
}

class Service {
  constructor() {
    // Determine the base API domain dynamically or via environment variables
    if (import.meta.env.VITE_API_URL) {
      this.domain = import.meta.env.VITE_API_URL;
    } else if (import.meta.env.VITE_BZENV === "development" || import.meta.env.DEV) {
      this.domain = import.meta.env.VITE_DEV_PROXY || "http://localhost:5000";
    } else {
      // In production mode, if hosted on Vercel, route to Render backend.
      // Otherwise, use relative paths.
      const currentOrigin = window.location.origin;
      const defaultBackend = "https://url-shortener-bootcamp.onrender.com";
      if (currentOrigin.includes("vercel.app")) {
        this.domain = defaultBackend;
      } else {
        this.domain = "";
      }
    }
  }

  async request(url, method = "POST", data) {
    url = joinURL(this.domain, "api/" + url);

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const state = store.getState();
      const token = state.user?.token;
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    } catch (error) {
      console.warn("Could not retrieve JWT token from Redux store for Authorization header:", error);
    }

    const res = await axios.request({
      url,
      method,
      data,
      withCredentials: true,
      headers,
    });
    return res.data;
  }

  post(url, data) {
    const method = "POST";
    return this.request(url, method, data);
  }

  get(url) {
    const method = "GET";
    return this.request(url, method);
  }

  delete(url, data) {
    const method = "DELETE";
    return this.request(url, method, data);
  }

  put(url, data) {
    const method = "PUT";
    return this.request(url, method, data);
  }

  patch(url, data) {
    const method = "PATCH";
    return this.request(url, method, data);
  }


  getBaseURL = () => {
    return this.domain || window.location.origin;
  };
}

export default Service

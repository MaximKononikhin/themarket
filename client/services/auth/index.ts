import axios from "axios";

import createApiInstance from "../api";

const api = createApiInstance();

const authService = {
  profile: async () => await api.get("auth/profile"),

  refreshToken: async () => {
    await axios
      .create({ withCredentials: true })
      .post("http://localhost:3000/auth/refresh");
  },

  login: async (email: string, password: string) => {
     await api.post("http://localhost:3000/auth/login", {
      email,
      password,
    });
  },
};

export default authService;

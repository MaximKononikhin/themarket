import axios from "axios";

import { IUser } from "lib/types/auth";
import createApiInstance from "services/api";

const api = createApiInstance();

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister extends ILogin {
  name: string;
}

const authService = {
  profile: async (): Promise<IUser> => {
    const response = await api.get("auth/profile");

    return {
      avatar: response.data.avatar?.url ?? null,
      email: response.data.email,
      id: response.data.id,
      name: response.data.name,
    };
  },

  refreshToken: async () => {
    await axios
      .create({ withCredentials: true })
      .post("http://localhost:3000/auth/refresh");
  },

  login: async (loginDto: ILogin) => {
    const { email, password } = loginDto;
    await api.post("auth/login", {
      email,
      password,
    });
  },
  register: async (registerDto: IRegister) => {
    const { email, password, name } = registerDto;
    await api.post("auth/registration", {
      email,
      password,
      name,
    });
  },
  logout: async () => {
    await api.post("auth/logout");
  },
};

export default authService;

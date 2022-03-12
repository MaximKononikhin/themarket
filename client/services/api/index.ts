import axios from "axios";

import authService from "services/auth";

const BASE_URL = "http://localhost:3000";

const createApiInstance = () => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: any) => {
      const status = error.response?.status;
      if (status !== 401) {
        throw error;
      }

      const originalRequest = error.config;
      if (originalRequest.isRetryRequest) {
        if (status === 401) {
          throw error;
        }
      }

      const retryRequest = {
        ...originalRequest,
        isRetryRequest: true,
      };
      try {
        await authService.refreshToken();
      } catch (refreshError: any) {
        if (refreshError.response.status !== 401) {
          throw refreshError;
        }
        return;
      }

      let result;
      try {
        result = await axios(retryRequest);
      } catch (retryError: any) {
        // const retryStatus: HttpStatusCode | undefined =
        //     retryError.response?.status;
        // if (retryStatus === HttpStatusCode.UNAUTHORIZED) {
        //     sendUnauthorized();
        // }
        // throw retryError;
      }

      return result;
    }
  );

  return axiosInstance;
};

export default createApiInstance;

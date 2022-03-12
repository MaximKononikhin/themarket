import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { assert } from "lib/assert";
import { IUser } from "lib/types/auth";
import authService from "services/auth";
import { ILogin, IRegister } from "services/auth";

type IProps = {
  children: React.ReactNode;
};

type IAuthContext = {
  user: IUser | null;
  login: (loginDto: ILogin) => void;
  register: (registerDto: IRegister) => void;
  logout: () => void;
};

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const useAuth = (): IAuthContext => {
  const value = useContext(AuthContext);
  assert(value);
  return value;
};

export const AuthProvider: React.FC<IProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    if (!user) {
      (async () => {
        try {
          const response = await authService.profile();
          setUser(response);
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, [user]);

  const login = async (loginDto: ILogin) => {
    await authService.login(loginDto);
    const response = await authService.profile();
    setUser(response);
  };

  const register = async (registerDto: IRegister) => {
    await authService.register(registerDto);
    const response = await authService.profile();
    setUser(response);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const value: IAuthContext = useMemo(
    () => ({
      user,
      login,
      register,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

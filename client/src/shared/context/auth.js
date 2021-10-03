import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import Router, { useRouter } from "next/router";

import api from "../../services/api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserFromCookies() {
      const accessToken = Cookies.get("accessToken");
      if (!!accessToken && user == null) {
        console.log("useEffect");
        const { data: user } = await api.get("users/me");
        console.log(user);
        if (user) setUser(user);
      }
      setLoading(false);
    }
    loadUserFromCookies();
  }, []);

  const login = async (user) => {
    setUser(user);
  };

  const logout = () => {
    try {
      Cookies.remove("accessToken");
      setUser(null);
      api({
        method: "POST",
        url: "oauth/google/logout",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, loading, login }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

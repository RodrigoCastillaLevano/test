import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Configuración de la API URL con fallback robusto
const getApiUrl = () => {
  // En producción, usar el dominio del backend
  if (window.location.hostname === "frontend.r-c.lat") {
    return "https://backend.r-c.lat";
  }

  // Para desarrollo local, usar la variable de entorno o localhost
  return process.env.REACT_APP_API_URL || "http://localhost:3001";
};

const API_URL = getApiUrl();

console.log("🔗 API URL configurada:", API_URL);

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Configurar axios con el token
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/auth/verify`);
        if (response.data.success) {
          setUser(response.data.user);
        } else {
          logout();
        }
      } catch (error) {
        console.error("Error verificando token:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      verifyToken();
    } else {
      delete axios.defaults.headers.common["Authorization"];
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    console.log("🔐 Intentando login a:", `${API_URL}/api/auth/login`);
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      if (response.data.success) {
        const { token, user } = response.data;
        setToken(token);
        setUser(user);
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || "Error en el login";
      return { success: false, message };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  };

  const value = {
    token,
    user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

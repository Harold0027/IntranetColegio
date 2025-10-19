import { createContext, useState, useContext } from "react";
import { login as loginApi, logout as logoutApi } from "../services/auth.api";
import { useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (usuario, contraseña) => {
    try { 
      const res = await loginApi(usuario, contraseña); 
      setUser(res.user);
      return true;
    } catch (error) {
      console.error("Error en login:", error);
      return false;
    }
  };


  const logout = async () => {
    try {
      await logoutApi(); // Llama al endpoint real
      setUser(null);
      localStorage.removeItem("token"); 
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/session/check", { withCredentials: true })
      .then(res => {
        if (res.data.loggedIn) setUser(res.data.user);
      })
      .catch(err => console.error("Error al verificar sesión:", err));
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

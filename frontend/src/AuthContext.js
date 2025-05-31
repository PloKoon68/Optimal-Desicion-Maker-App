import { createContext, useContext, useState, useEffect } from 'react';
import { checkLoggedIn } from './api/apiCalls/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [globalLoading, setGlobalLoading] = useState(false); // ← NEW for general loading

  useEffect(() => {
    const _check = async () => {
      console.log("checking if logged in")
      const result = await checkLoggedIn();
      setIsLoggedIn(result);
      setLoading(false);
    };
    _check();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, loading, setLoading, globalLoading, setGlobalLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


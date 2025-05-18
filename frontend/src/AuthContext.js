import { createContext, useContext, useState, useEffect } from 'react';
import { checkLoggedIn } from './api/apiCalls/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const _check = async () => {
      const result = await checkLoggedIn();
      setIsLoggedIn(result);
      setLoading(false);
    };
    _check();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


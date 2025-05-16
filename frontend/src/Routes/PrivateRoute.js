import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { checkLoggedIn } from '../api/apiCalls/auth'; // your backend auth checker

export default function PrivateRoute({ children, isloggedIn }) {
  //const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /*
  useEffect(() => {
    const verify = async () => {
      const loggedIn = await checkLoggedIn();
      setIsAuthenticated(loggedIn);
      setIsLoading(false);
    };
    verify();
  }, []);
*/
  /*
  if (isLoading) {
    // 👇 Don't render anything until auth check is done
    return null; 
  }
*/

  if (!isloggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

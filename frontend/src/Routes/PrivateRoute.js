import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children, isloggedIn }) {
  if (!isloggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

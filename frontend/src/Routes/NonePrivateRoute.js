import { Navigate } from 'react-router-dom';

export default function NonePrivateRoute({ children, isloggedIn}) {
  if (isloggedIn) {
    return <Navigate to="/my-cases" replace />;
  }
  return children;
}

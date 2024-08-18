import { Navigate } from "react-router-dom";
import { AuthService } from "../services/AuthService";
import { PrivateRouteProps } from "../interfaces/PrivateRoutesProps";

 function PrivateRoute({ children, isAuthenticated, requiredRole }: PrivateRouteProps) {
  if (!isAuthenticated) {
    return <Navigate to="/Login" />;
  }

  if (requiredRole && requiredRole !== AuthService.GetUserRole()) {
    return <Navigate to="/NotAuthorized" />;
  }

  return <>{children}</>;;
}
export default PrivateRoute;
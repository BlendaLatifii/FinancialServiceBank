import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthService } from '../services/AuthService'; // Import your AuthService

interface AdminRouteProps {
  component: React.ComponentType<any>;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ component: Component,...rest }) => {
  return AuthService.isAdmin() ? <Component {...rest} /> :  <Navigate to="/" replace />;
};

export default AdminRoute;




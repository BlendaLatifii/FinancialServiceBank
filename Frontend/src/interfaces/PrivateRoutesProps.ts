export interface PrivateRouteProps {
    children: React.ReactNode;
    isAuthenticated: boolean;
    requiredRole?: string;
  }
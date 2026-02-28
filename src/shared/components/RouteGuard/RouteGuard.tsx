import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { hasPermission } from '../../../utils/permissionUtils/permissionUtils';

const RouteGuard = ({
  children,
  requireAuth = false,
  requirePublic = false,
  requireMfa = false,
  requireResetState = false,
  allowedRoles = [],
  requiredPermission = null,

}) => {
  const location = useLocation();

  // Get auth state from Redux
  const { user, isAuthenticated, mfaPending } = useSelector((state: any) => state.auth);

  // 1️⃣ Public route (like login, signup)
  if (requirePublic && isAuthenticated && !mfaPending) {
    return <Navigate to="/dashboard" replace />;
  }

  // 2️⃣ Protected route
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // 3️⃣ MFA route
  if (requireMfa) {
    if (!user) return <Navigate to="/" replace />;
    if (!mfaPending) return <Navigate to="/dashboard" replace />;
  }

  // Permission-based protection
  // if (requiredPermission) {
  //   if (!user || !hasPermission(user.role, requiredPermission)) {
  //     return <Navigate to="/access-denied" replace />;
  //   }
  // }

  // // 4️⃣ Role-based protection
  // if (allowedRoles.length > 0) {
  //   if (!user || !allowedRoles.includes(user.role)) {
  //     return <Navigate to="/access-denied" replace />;
  //   }
  // }

  // 5️⃣ Reset password route protection

  if (
  requireResetState &&
  !location.state?.identifier &&
  location.pathname !== "/forgotPassword"
) {
  return <Navigate to="/forgotPassword" replace />;
}

  return children;
};

export default RouteGuard;



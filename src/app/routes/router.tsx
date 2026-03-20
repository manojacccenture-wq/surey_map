import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "@/shared/components/Loader/Loader";
import { PERMISSIONS } from "@/app/config/Dashboard/permission";
import RouteGuard from "@/shared/components/RouteGuard/RouteGuard";
import AuthLayout from "@/app/layout";
import DashboardLayout from "@/app/Layout/Dashboard/DashboardLayout";

// Auth Pages
const SignIn = lazy(() => import("@/features/auth/pages/SignIn"));
const SignUp = lazy(() => import("@/features/auth/pages/SignUp"));
const ForgotPassword = lazy(() => import("@/features/auth/pages/ForgotPassword"));
const ResetPassword = lazy(() => import("@/features/auth/pages/ResetPassword"));
const MFA = lazy(() => import("@/features/auth/pages/MFA"));

// // Dashboard
import Overview from "@/features/dashboard/Sub Features/Overview/Overview";

import RegisterUser from "@/features/dashboard/Sub Features/RegisterUser/RegisterUser";
import SurveyList from "@/features/dashboard/Sub Features/SurveyList/SurveyList";
import Logout from "@/features/dashboard/Public Features/Logout/Logout";
import AccessDenied from "@/features/AccessDenied/AccessDenied";



const AppRouter = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>

        {/* Public Auth Routes */}

        <Route element={<AuthLayout />}><Route path="/" element={<RouteGuard requirePublic><SignIn /></RouteGuard>} />

          <Route path="/signup" element={<RouteGuard requirePublic> <SignUp /></RouteGuard>} />

          <Route path="/forgotPassword" element={<RouteGuard requirePublic> <ForgotPassword /></RouteGuard>} /></Route>

        {/* MFA */}

        <Route path="/mfa" element={<RouteGuard requireMfa> <MFA /></RouteGuard>} />

        {/* PROTECTED DASHBOARD AREA */}

        <Route path="/dashboard" element={<RouteGuard requireAuth> <DashboardLayout /> </RouteGuard>}>


          <Route path="registerUser" element={<RouteGuard > <RegisterUser /></RouteGuard>} />
          <Route index element={<RouteGuard requireAuth requiredPermission={PERMISSIONS.VIEW_DASHBOARD}><Overview /></RouteGuard>} />

          <Route path="surveyList" element={<RouteGuard requireAuth requiredPermission={PERMISSIONS.VIEW_TOILETS} ><SurveyList /></RouteGuard>} />


        </Route>



        {/* Reset Password */}

        <Route path="/reset-password" element={<RouteGuard requireResetState> <ResetPassword /> </RouteGuard>} />

        {/* Access Denied */}

        {/* <Route path="/access-denied" element={<AccessDenied />} /> */}

        {/* Log Out */}

        <Route path="logout" element={<RouteGuard requireAuth > <Logout /> </RouteGuard>} />

        <Route path="/access-denied" element={<AccessDenied />} />

      </Routes >
    </Suspense >
  );
};

export default AppRouter;

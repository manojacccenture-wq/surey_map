import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "@/shared/components/Loader/Loader";
import { PERMISSIONS } from "@/app/config/Dashboard/permission";
import RouteGuard from "@/shared/components/RouteGuard/RouteGuard";
import AuthLayout from "@/app/layout";
import DashboardLayout from "@/app/Layout/Dashboard/DashboardLayout";
// import DashboardLayout from "../shared/Layout/DashboardLayout/DashboardLayout";
// import Logout from "../features/dashboard/Public Features/Logout/Logout";

// Auth Pages
const SignIn = lazy(() => import("@/features/auth/pages/SignIn"));
const SignUp = lazy(() => import("@/features/auth/pages/SignUp"));
const ForgotPassword = lazy(() => import("@/features/auth/pages/ForgotPassword"));
// const ResetPassword = lazy(() => import("../features/auth/pages/ResetPassword"));
const MFA = lazy(() => import("@/features/auth/pages/MFA"));

// // Dashboard
import Overview from "@/features/dashboard/Sub Features/Overview/Overview";
// const Toilets = lazy(() => import("../features/dashboard/Sub Features/Toilets/Toilets"));
// const Vendors = lazy(() => import("../features/dashboard/Sub Features/Vendors/Vendors"));
// const Feedback = lazy(() => import("../features/dashboard/Sub Features/Feedback/Feedback"));
import RegisterUser from "@/features/dashboard/Sub Features/RegisterUser/RegisterUser";
import SurveyList from "@/features/dashboard/Sub Features/SurveyList/SurveyList";
// const Roles = lazy(() => import("../features/dashboard/Sub Features/Roles/Roles"));
// const Support = lazy(() => import("../features/dashboard/Sub Features/Support/Support"));


// // Access Denied
// const AccessDenied = lazy(() => import("../features/auth/pages/AccessDenied"));

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


          <Route path="registerUser" element={<RouteGuard /* requiredPermission={PERMISSIONS.MANAGE_USERS} */> <RegisterUser /></RouteGuard>} />
          <Route index element={<RouteGuard requiredPermission={PERMISSIONS.VIEW_DASHBOARD}><Overview /></RouteGuard>} />

           <Route path="surveyList" element={<RouteGuard requiredPermission={PERMISSIONS.VIEW_TOILETS} ><SurveyList /></RouteGuard>} />

          {/*<Route path="vendors" element={<RouteGuard requiredPermission={PERMISSIONS.MANAGE_VENDORS} > <Vendors /> </RouteGuard>} />

          <Route path="feedback" element={<RouteGuard requiredPermission={PERMISSIONS.MANAGE_FEEDBACK}> <Feedback /></RouteGuard>} />


          <Route path="roles" element={<RouteGuard requiredPermission={PERMISSIONS.MANAGE_ROLES}> <Roles /></RouteGuard>} />

          <Route path="support" element={<RouteGuard requiredPermission={PERMISSIONS.VIEW_SUPPORT} > <Support /> </RouteGuard>} />*/}
        </Route>



        {/* Reset Password */}

        {/* <Route path="/reset-password" element={<RouteGuard requireResetState> <ResetPassword /> </RouteGuard>} /> */}

        {/* Access Denied */}

        {/* <Route path="/access-denied" element={<AccessDenied />} /> */}

        {/* Log Out */}

        {/* <Route path="logout" element={<RouteGuard requireAuth > <Logout /> </RouteGuard>} /> */}

      </Routes >
    </Suspense >
  );
};

export default AppRouter;

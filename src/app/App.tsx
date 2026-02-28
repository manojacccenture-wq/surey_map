import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "./store"; // adjust path if needed

import AppRouter from "@/app/routes/router";
// import { ErrorBoundary } from "@/shared/components/ErrorBoundary/ErrorBoundary";
import Toast from "@/shared/components/Toast/Toast";
import {
  selectToastMessage,
  selectToastType,
  selectToastDuration,
  clearToast,
} from "@/shared/components/Toast/api/toastSlice";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const toastMessage = useSelector((state: RootState) =>
    selectToastMessage(state)
  );
  const toastType = useSelector((state: RootState) =>
    selectToastType(state)
  );
  const toastDuration = useSelector((state: RootState) =>
    selectToastDuration(state)
  );

  const handleToastClose = (): void => {
    dispatch(clearToast());
  };

  return (
    <>
     {/* <ErrorBoundary> */}
      <AppRouter />
      <Toast
        message={toastMessage}
        type={toastType}
        duration={toastDuration}
        onClose={handleToastClose}
      />
     {/* </ErrorBoundary> */}
    </>
  );
};

export default App;
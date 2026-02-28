import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/authSlice';
// import userReducer from '../features/dashboard/Sub Features/Users/userSlice';
import toastReducer from '@/shared/components/Toast/api/toastSlice';

// Define root reducer with all feature slices
const rootReducer = combineReducers({
  auth: authReducer,
  // user: userReducer,
  toast: toastReducer,
});

export default rootReducer;

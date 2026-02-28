import { createSlice } from '@reduxjs/toolkit';
import { loginAsync,registerAsync,verifyMfaAsync, logoutAsync,requestPasswordResetAsync,resetPasswordAsync} from '@/features/auth/authThunk';

const initialState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  token: localStorage.getItem('authToken') || null,
  mfaPending: false,
  resetPasswordEmail: null,
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
  isAuthenticated: !!localStorage.getItem('authToken'),
};



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setMfaPending: (state, action) => {
      state.mfaPending = action.payload;
    },
    clearMfaPending: (state) => {
      state.mfaPending = false;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        
        // If 2FA is enabled, mark MFA pending
        if (action.payload.user.isTwoFactor) {
          state.mfaPending = true;
          state.isAuthenticated = false;
        }
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });

    // Register
    builder
      .addCase(registerAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });

    // Verify MFA
    builder
      .addCase(verifyMfaAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(verifyMfaAsync.fulfilled, (state) => {
        state.status = 'succeeded';
        state.mfaPending = false;
        state.isAuthenticated = true;
      })
      .addCase(verifyMfaAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });

    // Logout
    builder
      .addCase(logoutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.status = 'idle';
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.mfaPending = false;
        state.resetPasswordEmail = null;
        state.error = null;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });

    // Request Password Reset
    builder
      .addCase(requestPasswordResetAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(requestPasswordResetAsync.fulfilled, (state, action) => {

        state.status = 'pending';
        // Store email for reset password step
        state.resetPasswordEmail = action.meta.arg;
      })
      .addCase(requestPasswordResetAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });

    // Reset Password
    builder
      .addCase(resetPasswordAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(resetPasswordAsync.fulfilled, (state) => {
        state.status = 'succeeded';
        state.resetPasswordEmail = null;
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearError, setMfaPending, clearMfaPending } = authSlice.actions;
export default authSlice.reducer;

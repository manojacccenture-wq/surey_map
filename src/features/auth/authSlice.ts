import { createSlice } from '@reduxjs/toolkit';
import { loginAsync, registerAsync, verifyMfaAsync, logoutAsync, requestPasswordResetAsync, resetPasswordAsync, restoreSessionAsync } from '@/features/auth/authThunk';

interface TempCredentials {
  username: string;
  password: string;
}

interface AuthState {
  user: any | null; // replace `any` with proper User type later
  isAuthenticated: boolean;
  mfaPending: boolean;
  tempCredentials: TempCredentials | null;
  resetPasswordEmail: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed' | 'pending';
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  mfaPending: false,
  tempCredentials: null, // Store username + password temporarily during MFA
  resetPasswordEmail: null,
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
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
        state.status = "loading";
        state.error = null;
      })
      // .addCase(loginAsync.fulfilled, (state) => {
      //   state.status = "succeeded";
      // })
      .addCase(loginAsync.fulfilled, (state, action: any) => {
  
        state.status = "succeeded";

        if (action.payload?.IsSuccessful) {
          state.user = action.payload;
          state.isAuthenticated = true;
        }
      })
      .addCase(loginAsync.rejected, (state, action: any) => {
        state.status = "idle";

        if (action.payload?.type === "MFA_REQUIRED") {
          state.mfaPending = true;
          state.tempCredentials = action.meta.arg; // store username + password
        } else {
          state.mfaPending = false;
          state.error = action.payload?.message || "Login failed";
        }
      });

    // Register
    builder
      .addCase(registerAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerAsync.fulfilled, (state) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
      })
      .addCase(registerAsync.rejected, (state, action: any) => {
        state.status = 'failed';
        state.error = action.payload?.message || "Registration failed";
      });

    // Verify MFA
    builder
      .addCase(verifyMfaAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(verifyMfaAsync.fulfilled, (state, action: any) => {
        state.status = "succeeded";
        state.user = action.payload; // 
        state.mfaPending = false;
        state.isAuthenticated = true;
        state.tempCredentials = null; // VERY IMPORTANT
      })
      .addCase(verifyMfaAsync.rejected, (state, action: any) => {
        state.status = 'failed';
        state.error = action.payload?.message || "MFA verification failed";
      });

    // Logout
    builder
      .addCase(logoutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.status = 'idle';
        state.isAuthenticated = false;
        state.mfaPending = false;
        state.resetPasswordEmail = null;
        state.error = null;
      })
      .addCase(logoutAsync.rejected, (state, action: any) => {
        state.status = 'failed';
        state.error = action.payload?.message || "Logout failed";
      });

    // Request Password Reset
    builder
      .addCase(requestPasswordResetAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(requestPasswordResetAsync.fulfilled, (state, action) => {
        state.status = 'pending';
        state.resetPasswordEmail = action.meta.arg.identifier; //  FIXED
      })
      .addCase(requestPasswordResetAsync.rejected, (state, action: any) => {
        state.status = 'failed';
        state.error = action.payload?.message || "Password reset request failed";
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
      .addCase(resetPasswordAsync.rejected, (state, action: any) => {
        state.status = 'failed';
        state.error = action.payload?.message || "Password reset failed";
      });

    builder
      .addCase(restoreSessionAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(restoreSessionAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload; // ✅ IMPORTANT
      })
      .addCase(restoreSessionAsync.rejected, (state) => {
        state.status = "idle";
        state.isAuthenticated = false;
      });
  },
});

export const { clearError, setMfaPending, clearMfaPending } = authSlice.actions;
export default authSlice.reducer;

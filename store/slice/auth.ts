import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ name, email, password }: { name: string; email: string; password: string }) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.status === 200) {
        const userData = await response.json();
        return userData;
      } else {
        throw new Error('Unexpected response status: ' + response.status + ' ' + response.statusText);
      }
    } catch (error) {
      toast.error('Failed to register user data' + error);
      throw error;
    }
  }
);

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        const userData = await response.json();
        return userData;
      } else {
        throw new Error('Unexpected response status: ' + response.status);
      }
    } catch (error) {
      toast.error('Failed to fetch user data');
      throw error;
    }
  }
);

interface AuthState {
  userData: {
    id: string;
    name: string;
    email: string;
    token: string;
  };
  isLogin: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  userData: {
    id: '',
    name: '',
    email: '',
    token: '',
  },
  isLogin: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.isLogin = true;
        state.isLoading = false;
        localStorage.setItem('token', action.payload.token);
        toast.success('Login successfully!');
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isLoading = false;
        toast.error('Failed to fetch user data');
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.isLogin = true;
        state.isLoading = false;
        localStorage.setItem('token', action.payload.token);
        toast.success('Registered successfully!');
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        toast.error('Failed to register user data');
      });
  },
});

export default authSlice.reducer;

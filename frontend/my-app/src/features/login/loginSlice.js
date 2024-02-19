import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { logingIn, secureFunc, register, unsecureFunc } from './loginAPI';


const initialState = {
  loggedIn: (sessionStorage.getItem('access'))? true : false,
  status: 'idle',
  message: 'press one of the buttons'
};

export const loginAsync = createAsyncThunk(
  'login/logingIn',
  async (formData) => {
    const response = await logingIn(formData);
    return response.data;
  }
);

export const registerAsync = createAsyncThunk(
  'login/register',
  async (formData) => {
    const response = await register(formData);
    return response.data
  }
)

export const secureAsync = createAsyncThunk(
  'login/secureFunc',
  async () => {
    const response = await secureFunc();
    return response.data;
  }
)

export const unsecureAsync = createAsyncThunk(
  'login/unsecureFunc',
  async () => {
    const response = await unsecureFunc();
    return response.data;
  }
)

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logOut: state => {
      sessionStorage.removeItem('access')
      state.loggedIn = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedIn = true;
        sessionStorage.setItem('access', action.payload.access)
      })
      .addCase(secureAsync.fulfilled, (state, action) => {
        state.message = action.payload.message
      })
      .addCase(secureAsync.rejected, (state, action) => {
        state.message = 'Unauthorized. please log in'
      })
      .addCase(unsecureAsync.fulfilled, (state, action) => {
        state.message = action.payload.message
      })
    },
});

export const selectCount = (state) => state.login.loggedIn;
export const message = (state) => state.login.message;
export const { logOut } = loginSlice.actions;
export default loginSlice.reducer;

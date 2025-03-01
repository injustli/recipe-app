import { create } from 'zustand';

const authInitialState = {
  accessToken: null,
  idToken: null,
  user: null,
  isAuth: null
};

const environment = import.meta.env.NODE_ENV;
const SERVER_URL =
  environment == 'production'
    ? import.meta.env.VITE_API_URL
    : 'http://localhost:8080';

const useAuthStore = create((set, get) => ({
  ...authInitialState,
  login: async (code) => {
    const response = await fetch(`${SERVER_URL}/api/auth/google/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        code
      })
    });
    if (!response.ok) {
      set({ isAuth: false });
      throw new Error('Unexpected error occurred while logging in');
    }
    const { accessToken, user, idToken } = await response.json();
    set({ user, accessToken, idToken, isAuth: true });
  },
  refresh: async () => {
    const response = await fetch(`${SERVER_URL}/api/auth/google/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
    if (!response.ok) {
      set({ ...authInitialState, isAuth: false });
      throw new Error();
    }
    const { accessToken, user, idToken } = await response.json();
    set({ user, accessToken, idToken, isAuth: true });
  },
  logout: async () => {
    await fetch(`${SERVER_URL}/api/auth/google/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${get().idToken}`
      }
    });
    set({ ...authInitialState, isAuth: false });
  }
}));

export default useAuthStore;

import { auth, googleProvider } from '@/firebaseConfigure';
import useNotifications from '@/hooks/useNotifcations';
import { SERVER_URL } from '@/utils/constants';
import { User } from '@/utils/types';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { createContext, ReactNode, useEffect, useState } from 'react';

interface AuthState {
  idToken: string | null;
  isAuth: boolean;
  user: User | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

interface Props {
  children: ReactNode;
}

export const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider = ({ children }: Props) => {
  const value = useRequireAuth();

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useRequireAuth = (): AuthState => {
  const { handleError } = useNotifications();

  const [idToken, setIdToken] = useState<string | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Upon refresh, if user session exists, login user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser && !user) {
        try {
          const idToken = await currentUser.getIdToken();

          const response = await fetch(
            `${SERVER_URL}/api/auth/google/authenticate`,
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${idToken}`
              }
            }
          );
          const data = await response.json();
          setUser(data);
          setIdToken(idToken);
          setIsAuth(true);
        } catch (error) {
          console.error('Error verifying user with backend:', error);
          handleError('An error has occurred while signing in');
        }
      } else {
        // User is signed out
        setUser(null);
        setIdToken(null);
        setIsAuth(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.log('An error has occurred while signing in:', err);
      handleError('An error has occurred while signing in');
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log('An error has occurred while signing out:', err);
      handleError('An error has occurred while signing out');
    }
  };

  return { idToken, isAuth, user, login, logout };
};

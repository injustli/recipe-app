import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';

const useSession = () => {
  const context = useContext(AuthContext);

  if (!context) {
    console.log('Context must be used in AuthProvider');
    throw new Error('Context must be used in AuthProvider');
  }

  return context;
};

export default useSession;

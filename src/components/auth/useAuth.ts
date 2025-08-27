import { AuthContext, type AuthContextType } from './authContext';

import { useContext } from 'react';
export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

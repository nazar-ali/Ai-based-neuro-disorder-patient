'use client';
import { useSignedInUser } from '@/store/useSignedInUser';

export const useLoggedInUser = () => {
  const { loggedInUser, setLoggedInUser, resetLoggedInUser } = useSignedInUser();

  let user = null;

  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('loggedInUser');
      if (stored && stored !== 'undefined' && stored !== 'null') {
        user = JSON.parse(stored);
      }
    } catch (e) {
      console.error("❌ Failed to parse loggedInUser from localStorage:", e);
      user = null;
    }
  }

  return {
    loggedInUser: loggedInUser || user,
    setLoggedInUser,
    resetLoggedInUser,
  };
};

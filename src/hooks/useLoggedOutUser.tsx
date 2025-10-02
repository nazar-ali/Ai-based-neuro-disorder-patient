'use client';
import { useRouter } from 'next/navigation';
import { deleteAccessToken } from '@/lib/helpers';
import { useLoggedInUser } from '@/hooks/userLoggedIn';
import { APP_ROUTES } from '@/constants/app-routes';

export const useLogOutUser = () => {
  const { resetLoggedInUser } = useLoggedInUser();
  const router = useRouter();
  const logoutUser = () => {
    deleteAccessToken();
    resetLoggedInUser();
    setTimeout(() => {
      router.push(APP_ROUTES.LOGIN);
    }, 500);
  };

  return { logoutUser };
};

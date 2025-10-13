"use client";

import { useEffect, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLoggedInUser } from "@/hooks/userLoggedIn";
import { APP_ROUTES } from "@/constants/app-routes";

const publicAuthPages = [APP_ROUTES.LOGIN, APP_ROUTES.SIGNUP];
const dashboardRedirect = APP_ROUTES.DASHBOARD;
const loginRedirect = APP_ROUTES.LOGIN;

interface RouteGuardProps {
  children: ReactNode;
}

const RouteGuard = ({ children }: RouteGuardProps) => {
  const { loggedInUser } = useLoggedInUser();

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!pathname) return;

    const isAuthPage = publicAuthPages.includes(pathname);

    if (loggedInUser && isAuthPage) {
      router.replace(dashboardRedirect);
    } else if (!loggedInUser && !isAuthPage) {
      router.replace(loginRedirect);
    }
  }, [pathname, loggedInUser, router]);

  return <>{children}</>;
};

export default RouteGuard;

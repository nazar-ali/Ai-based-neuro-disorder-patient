"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/common/Loader";
import { useLoggedInUser } from "@/hooks/userLoggedIn";
import Loader from "@/components/common/Loader";

export default function PublicRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loggedInUser,} = useLoggedInUser(); 
  const router = useRouter();
 const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    if (!isLoading && loggedInUser) {
      router.replace("/dashboard");
       setIsloading(false) 
    }
  }, [isLoading, loggedInUser, router]);

  if (!isLoading) {
    return <Loader />; 
  }

  
  return !loggedInUser ? <>{children}</> : null;
}

import { useState } from "react";
import { useLogOutUser } from "./useLoggedOutUser";

export function useNetworkRequest<T = unknown, P extends any[] = any[]>({
  initialLoader = false,
  apiFunction,
  initialData = null,
}: {
  initialLoader?: boolean;
  apiFunction: (...params: P) => Promise<T>;
  initialData?: T | null;
}) {
  const { logoutUser } = useLogOutUser(); 

  const [loading, setLoading] = useState(initialLoader);
  const [data, setData] = useState<T | null>(initialData);
  const [error, setError] = useState<string>("");

  const executeFunction = async (...params: P): Promise<T> => {
    setError("");
    setLoading(true);

    try {
      const response = await apiFunction(...params);
      console.log("Api response successfull",response)
      setData(response);
      return response;
    } catch (err: unknown) {
      const errorMessage =
        (err as any)?.errorMessage || (err as Error)?.message || "Something went wrong";
      const errorCode = (err as any)?.errorCode;

      if (errorCode === 401) {
        logoutUser();
      }

      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    data,
    errorMessage: error,
    executeFunction,
    setErrorMessage: setError,
    setData,
  };
}

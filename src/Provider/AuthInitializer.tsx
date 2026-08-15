'use client'
import { currentUser } from "@/lib/client-auth";
import { setLoading, setUser } from "@/redux/features/auth/authSlice";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function AuthInitializer() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const loadUser = async () => {
      try {
        dispatch(setLoading(true));
        const user = await currentUser();
        dispatch(setUser(user));
      } catch {
        dispatch(setUser(null));
        dispatch(setLoading(false));
        return null;
      } finally {
        dispatch(setLoading(false));
      }
    };
    loadUser();
  }, [dispatch]);

  return null;
}

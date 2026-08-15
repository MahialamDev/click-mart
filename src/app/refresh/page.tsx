"use client";

import useAxiosInstance from "@/Hooks/axiosInstance";
import React, { useEffect } from "react";

const RefreshPage = () => {
  const axiosInstance = useAxiosInstance();

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const response = await axiosInstance.post("/api/auth/refresh");

        console.log(response.data);
      } catch (error) {
        console.error("Refresh failed:", error);
      }
    };

    refreshToken();
  }, [axiosInstance]);
  // ok

  return <div>refresh</div>;
};

export default RefreshPage;
import axiosInstance from "@/Hooks/axiosInstance";


export async function currentUser() {
  const response = await axiosInstance.get("/auth/me");
  return response.data.data;
}

export async function logoutUser() {
  const response = await axiosInstance.post("/auth/logout");

  return response.data;
}

// aUTH PAGE
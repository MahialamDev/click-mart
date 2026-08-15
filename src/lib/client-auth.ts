import axiosInstance from "@/Hooks/axiosInstance";


export async function currentUser() {
  const response = await axiosInstance.get("/auth/me");
  return response.data.data;
}

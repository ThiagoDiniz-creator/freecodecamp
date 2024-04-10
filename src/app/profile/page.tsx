"use client";
import { UserAttributes } from "@/models/userModel";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ProfilePage() {
  const [user, setUser] = useState<UserAttributes>();
  const router = useRouter();

  const logout = async () => {
    try {
      const response = await axios.post(
        "/api/users/logout",
        {},
        { withCredentials: true }
      );

      if (!response.data.success) {
        toast.error(response.data.message ?? "Não foi possível fazer logout!");
        return;
      }

      if (response.data.success) {
        toast.success("Logout realizado com sucesso!");
        router.push("/login");
      }
    } catch (error: any) {
      toast.error(error.message ?? "Não foi possível fazer logout!");
    }
  };

  const getUserDetails = async () => {
    const response = await axios.get("/api/users/me");
    setUser(response.data);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <div className="flex flex-col gap-y-2 bg-blue-500 px-8 py-2 rounded-md mb-4 mt-2">
        <span className="uppercase font-bold">User data</span>
        <span>Id: {user?.id}</span>
        <span>Email: {user?.email}</span>
        <span>Username: {user?.username}</span>
      </div>
      <hr />
      <button
        onClick={logout}
        className='bg-blue-500 px-4 py-2 rounded-full hover:bg-blue-50 hover:text-blue-600 hover:border-blue-500'
      >
        Logout
      </button>
      <Toaster />
    </div>
  );
}

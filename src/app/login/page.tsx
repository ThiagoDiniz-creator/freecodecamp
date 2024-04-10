"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const router = useRouter();

  const onLogin = async () => {
    try {
      const response = await axios.post("/api/users/login", user);

      if(!response.data.success){
        toast.error(response.data.message ?? "Não foi possível fazer login!");
        return
      }

      if (response.data.success) {
        toast.success("Login realizado com sucesso!");
        router.push("/profile")
      }
    }
    catch (error: any) {
      toast.error(error.message ?? "Não foi possível fazer login!");
    }

  };

  useEffect(() => {
    if (user.email && user.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  },[user])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Login</h1>
      <hr />
      <label htmlFor='email'>Email</label>
      <input
        id='email'
        type='email'
        value={user.email}
        onChange={e => setUser({ ...user, email: e.target.value })}
        placeholder='email'
        className='p-2 border text-neutral-700 border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
      />
      <label htmlFor='password'>Password</label>
      <input
        id='password'
        type='password'
        value={user.password}
        onChange={e => setUser({ ...user, password: e.target.value })}
        placeholder='password'
        className='p-2 border text-neutral-700 border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
      />
      <button
        onClick={onLogin}
        disabled={buttonDisabled}
        className='bg-blue-600 text-white p-2 rounded-lg'
      >
        Login
      </button>
      <Link href='/signup'>
        Signup
      </Link>
      <Toaster />
        
    </div>
  );
}

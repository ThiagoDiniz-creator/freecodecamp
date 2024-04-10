"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      router.push("/login")
    } catch (err: any) {
      toast.error(err.message ?? "Error signing up");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email && user.password && user.username) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? "Processing" : "Signup"}</h1>
      <hr />
      <label htmlFor='username'>Username</label>
      <input
        id='username'
        type='text'
        value={user.username}
        onChange={e => setUser({ ...user, username: e.target.value })}
        placeholder='username'
        className='p-2 border text-neutral-700 border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
      />
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
        onClick={onSignup}
        disabled={buttonDisabled}
        className='bg-blue-600 text-white p-2 rounded-lg'
      >
        Signup
      </button>
      <Link href='/login'>Login</Link>
    </div>
  );
}

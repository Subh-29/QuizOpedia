'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/redux/actions/userAction';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function Login() {
  const formRef = useRef(null);
  const titleRef = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(titleRef.current, { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' })
      .fromTo(formRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.5');
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Login with', email, password);
    try {
      await dispatch(loginUser({email, password}));
      router.push("/user/quiz");
      toast.success("Logged in successfully");
      
    } catch (error) {
      console.log("the error in: ", error);
      toast.error("Bad creds!!");
    }
  };

  return (
    <div className=" flex items-center justify-center bg-[var(--bg)] text-[var(--text-primary)] p-4">
      <div className="w-full max-w-md bg-[var(--primary)] p-8 rounded-3xl shadow-2xl border border-[var(--soft)]">
        <h1
          ref={titleRef}
          className="text-3xl font-extrabold text-center mb-6 text-[var(--text-heading)]"
        >
          Welcome Back 👋
        </h1>

        <form ref={formRef} onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-[var(--bg)] text-[var(--text-primary)] border border-[var(--soft)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-[var(--bg)] text-[var(--text-primary)] border border-[var(--soft)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[var(--accent)] text-white py-3 rounded-xl font-bold hover:scale-[1.03] transition-transform duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-[var(--text-secondary)] mt-6">
          Don’t have an account? <a href="/register" className="text-[var(--text-accent)] font-semibold">Register</a>
        </p>
      </div>
    </div>
  );
}

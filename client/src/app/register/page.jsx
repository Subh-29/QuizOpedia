"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import gsap from "gsap";
import { useDispatch } from "react-redux";
import { registerUser } from "@/redux/actions/userAction";
import { useRouter } from "next/navigation";

export default function RegisterPage() {

  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Registered:", data);
    // TODO: connect to backend register API
    try {
      await dispatch(registerUser(data));
      router.push("/user");
    } catch (error) {
      console.log("error while register: ", error);
      
    }
  };

  useEffect(() => {
    const tl = gsap.timeline();
    tl.from(".animate-register", {
      y: 40,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className=" bg-[var(--bg)] text-[var(--text-primary)] flex items-center justify-center p-4">
      <div className="bg-[var(--primary)] rounded-3xl shadow-2xl w-full max-w-md p-8 animate-register">
        <h2 className="text-3xl font-bold text-center mb-6 text-[var(--text-heading)] animate-register">
          Create an account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="animate-register">
            <label className="block text-sm mb-1" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 rounded-lg bg-[var(--bg)] border border-[var(--soft)] text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]"
              placeholder="John Doe"
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
          </div>

          <div className="animate-register">
            <label className="block text-sm mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /[^@\s]+@[^@\s]+\.[^@\s]+/,
                  message: "Invalid email",
                },
              })}
              className="w-full px-4 py-2 rounded-lg bg-[var(--bg)] border border-[var(--soft)] text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          <div className="animate-register">
            <label className="block text-sm mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full px-4 py-2 rounded-lg bg-[var(--bg)] border border-[var(--soft)] text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-[var(--text-accent)] text-white font-bold py-2 rounded-lg hover:scale-105 transition-transform duration-200 animate-register"
          >
            Register
          </button>

          <p className="text-center pt-6 text-sm text-[var(--text-secondary)] animate-register">
            Already have an account? <a href="/login" className="text-[var(--text-accent)] font-semibold">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}

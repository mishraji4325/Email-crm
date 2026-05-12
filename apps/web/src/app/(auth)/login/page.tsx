"use client";

import { useForm } from "react-hook-form";
import { useAuthStore } from "../../../store/auth.store";
import { loginUser } from "../../../services/auth.service";



export default function LoginPage() {

  const {
    register,
    handleSubmit,
  } = useForm();

  const setAuth =
    useAuthStore((state) => state.setAuth);

  async function onSubmit(data: any) {

    try {

      const response =
        await loginUser(data);

      console.log(response);

      setAuth(
        response.user,
        response.token
      );

      localStorage.setItem(
        "token",
        response.token
      );

      alert("Login Successful");

    } catch (error) {

      console.log(error);

    }
  }

  return (
    <div>

      <h1>Login</h1>

      <form onSubmit={handleSubmit(onSubmit)}>

        <input
          placeholder="Email"
          {...register("email")}
        />

        <br />

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />

        <br />

        <button type="submit">
          Login
        </button>

      </form>

    </div>
  );
}
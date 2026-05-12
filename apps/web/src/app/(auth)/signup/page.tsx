"use client";

import { useForm } from "react-hook-form";
import { registerUser } from "../../../services/auth.service";



export default function SignupPage() {

  const {
    register,
    handleSubmit,
  } = useForm();

  async function onSubmit(data: any) {
    try {

      const response = await registerUser(data);

      console.log(response);

      alert("Signup Successful");

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>

      <h1>Signup</h1>

      <form onSubmit={handleSubmit(onSubmit)}>

        <input
          placeholder="Name"
          {...register("name")}
        />

        <br />

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
          Signup
        </button>

      </form>

    </div>
  );
}
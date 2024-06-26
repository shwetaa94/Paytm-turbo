"use client";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput"; // Assuming you have a TextInput component
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const SignIn = () => {
  const router = useRouter();
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  async function handleLogin() {
    try {
      const res = await signIn("credentials", {
        phone: number,
        password: password,
        redirect: false,
      });
      if (res?.ok) {
        toast.success("Sign In Successfully");
        router.push("/dashboard");
      } else {
        toast.error(res?.error || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="flex-grow"></div>
      <div className="w-full max-w-md">
        <Center>
          <div className="max-w-md w-full bg-white shadow-md px-8 pt-6 pb-8 mb-4 rounded-xl border border-gray-200">
            <h1 className="text-3xl font-extrabold text-[#6a51a6] text-center mb-4">
              Paytm Wallet
            </h1>
            <h2 className="text-xl font-semibold text-center mb-4">Log In </h2>
            <div>
              <TextInput
                placeholder="Enter your phone number"
                onChange={(value: string) => {
                  setNumber(value);
                }}
                type="text"
                label={"Phone Number"}
              />
            </div>

            <div className="mt-0">
              <TextInput
                placeholder="Enter your password"
                onChange={(value: string) => {
                  setPassword(value);
                }}
                type="password"
                label={"Password"}
              />
            </div>

            <div className="mt-6">
              <button
                className="bg-[#6a51a6] hover:bg-[#5f4796] text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full"
                type="button"
                onClick={handleLogin}
              >
                Sign In
              </button>
            </div>
            <div className="text-center mt-4">
              <p>Don't have an account?</p>
              <button
                className="text-[#6a51a6] hover:underline focus:outline-none"
                onClick={() => router.push("/auth/signup")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </Center>
      </div>
      <div className="flex-grow"></div>
    </div>
  );
};

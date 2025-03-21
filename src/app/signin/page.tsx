"use client";
import Link from "next/link";
import React, { useActionState } from "react";
import { authenticate, register } from "../actions/auth";
import DotLoader from "~/components/DotLoader/DotLoader";

const SignInPage = () => {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-center text-2xl font-semibold text-gray-900">
          Sign In
        </h1>
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="redirectTo" value="/dashboard" />
          <div className="relative h-fit">
            <input
              className="w-full rounded-md border border-gray-300 px-3 pb-1 pt-7 text-sm focus:border-black focus:outline-none"
              type="email"
              name="email"
              required
            />
            <label htmlFor="" className="absolute left-3 top-2 text-[12px]">
              EMAIL
            </label>
          </div>

          <div className="relative h-fit">
            <input
              className="w-full rounded-md border border-gray-300 px-3 pb-1 pt-7 text-sm focus:border-black focus:outline-none"
              type="password"
              name="password"
              minLength={8}
              required
            />
            <label htmlFor="" className="absolute left-3 top-2 text-[12px]">
              PASSWORD
            </label>
          </div>
          <button
            disabled={isPending}
            className="w-full rounded-md bg-black py-2 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {isPending ? <DotLoader /> : `Log in`}
          </button>
          <p className="text-center text-xs text-gray-600">
            No account?{" "}
            <Link href="/signup" className="text-blue-400 hover:text-blue-600">
              Create one
            </Link>
          </p>
          {errorMessage && (
            <p className="text-center text-sm text-red-500">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignInPage;

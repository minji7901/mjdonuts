import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="flex items-center justify-center h-screen">
      <div className="container mx-auto text-center">
        <p className="text-base font-semibold">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tightsm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-full bg-white px-3.5 py-2.5 text-sm font-bold border border-black"
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
}
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="flex items-center justify-center h-screen">
      <div className="container mx-auto text-center text-gray-300">
        <p className="font-semibold">404</p>
        <h1 className="mt-4 text-3xl font-bold neon-text">
          Page not found
        </h1>
        <p className="mt-6 leading-8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-full bg-primary px-3.5 py-2.5 text-sm text-base font-bold"
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
}
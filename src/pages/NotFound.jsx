import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="flex items-center justify-center h-screen text-white">
      <div className="container mx-auto text-center">
        <p className="text-6xl font-semibold">404</p>
        <h1 className="mt-3 text-8xl font-bold neon-text">
          Page not found
        </h1>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="border border-white rounded-full px-3.5 py-2.5 font-bold"
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
}
import React from 'react';
import Products from "../components/Products";

export default function All() {
  return (
    <section className="bg-main">
      <div className="inner">
        <h2 className="text-default text-center font-bold text-3xl mb-10">All Donuts</h2>
        <Products />
      </div>
    </section>
  );
}
import React from 'react';
import Products from "../components/Products";
import MainBnr from "../components/MainBnr";

export default function Main() {
  return (
    <section className="bg-primary-100">
      <MainBnr />
      <div className="bg-main">
        <div className="inner">
          <h2 className="text-default text-center font-bold text-3xl mb-10">Recommended Donuts</h2>
          <Products limit={8} />
        </div>
      </div>
    </section>
  );
}
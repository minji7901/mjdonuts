import React from 'react';
import banner from '../assets/banner.jpg'
import Products from "../components/Products";

export default function Main() {
  return (
    <section>
      <div className="mb-5">
        <img src={banner} alt="banner" />
      </div>
      <div className="inner">
        <Products />
      </div>
    </section>
  );
}
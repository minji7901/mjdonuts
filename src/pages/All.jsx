import React from 'react';
import Products from "../components/Products";
import banner from '../assets/all_banner.png'

export default function All() {
  return (
    <section>
      <img src={banner} alt="banner" />
      <div className="inner">
        <Products />
      </div>
    </section>
  );
}


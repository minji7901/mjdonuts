import React from 'react';
import banner from '../assets/banner.jpg'
import Products from "../components/Products";

export default function Main() {
  return (
    <section>
      <img src={banner} alt="banner" />
      <div className="inner">
        <Products limit={12}/>
      </div>
    </section>
  );
}
import React from 'react';
import icon1 from '../assets/main_bnr_icon1.svg';
import icon2 from '../assets/main_bnr_icon2.svg';
import icon3 from '../assets/main_bnr_icon3.svg';

const Icon = ({ srcName, text }) => (
  <li className="flex flex-col items-center">
    <img src={srcName} className="max-w-14" alt={text} />
    <p className="text-base/90">{text}</p>
  </li>
);

export default function MainBnr() {
  return (
    <div className="inner lg:h-[80vh] text-white">
      <div className="relative pb-28">
        <div className="pt-10">
          <div>
            <div className="mb-10 lg:mb-0 text-center lg:text-left">
              <h1 className="text-5xl lg:text-8xl font-bold tracking-widest"><span className="text-secondary">MJ</span>DONUTS</h1>
              <p className="mt-5 text-2xl">Introducing the menu of MJDONUTS!</p>
            </div>
            <div className="lg:text-left lg:absolute top-0 left-[38%] ">
              <img src="https://res.cloudinary.com/duzlgcrq3/image/upload/v1720289396/bnr_donuts_lbc0bw.png" className="w-48 mx-auto lg:mx-0 lg:w-full" alt="img" />
            </div>
          </div>
          <ul className="flex gap-5 mt-5 text-center lg:mt-40">
            <Icon srcName={icon1} text='Experienced chefs' />
            <Icon srcName={icon2} text='Free shipping' />
            <Icon srcName={icon3} text='Great experience' />
          </ul>
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { BiWon } from "react-icons/bi";
import useCart from "../hooks/useCart";
import { useAuthContext } from "../context/AuthContext";

const SUCCESS_MESSAGE_CLASSNAME = "absolute top-24 left-[50%] translate-x-[-50%] bg-primary-100 font-bold px-5 py-3 rounded-xl shadow-md text-white";
const DETAIL_CLASSNAME = "inline-flex items-center flex-wrap justify-center gap-10 px-16 py-5 shadow-base rounded-2xl";
const DETAIL_BTN_CLASSNAME = "mt-6 rounded-full w-full pt-3 pb-2 bg-secondary font-semibold text-lg text-white shadow-base";

const OptionSelector = ({ options, selectedOption, onSelect }) => {
  return (
    <div className="flex items-center flex-wrap gap-5 mt-1">
      {options && options.map((item, i) => (
        <div className="chk-icon bg-transparent" key={i}>
          <input
            type="radio"
            id={item}
            name="op"
            value={item}
            onChange={(e) => onSelect(e, i)}
            checked={selectedOption === item}
          />
          <label htmlFor={item}>{item}</label>
        </div>
      ))}
    </div>
  );
};

export default function Detail() {
  const { user , login } = useAuthContext();
  const { addOrUpdateItem } = useCart();
  const { state: { product: { id, image, options, price, title } } } = useLocation();

  const [selectedOption, setSelectedOption] = useState(options && options[0]);
  const [numSelected, setNumSelected] = useState(0);
  const [successMessage, setSuccessMessage] = useState();
  const [totalPrice, setTotalPrice] = useState(price);

  useEffect(() => {
    setTotalPrice(price + (numSelected > 0 ? 1100 : 0));
  }, [numSelected, price]);

  const handleSelect = (e, i) => {
    setSelectedOption(e.target.value);
    setNumSelected(i);
  };

  const handleClick = () => {
    if(!user) {
      alert("Login is required");
      login();
      return ;
    }
    const productToAdd = { id, image, title, price: totalPrice, selectedOption, quantity: 1 };
    addOrUpdateItem.mutate(productToAdd, {
      onSuccess: () => {
        setSuccessMessage('The product has been added to your shopping cart.');
        setTimeout(() => setSuccessMessage(null), 3000);
      },
    });
  };

  return (
    <section className="bg-main h-cal">
      <div className="inner">
        <div className="h-cal text-center">
          {successMessage && (
            <p className={SUCCESS_MESSAGE_CLASSNAME}>👏 {successMessage}</p>
          )}
          <div className={DETAIL_CLASSNAME}>
            <div className="max-w-80">
              <img src={image} alt={title} />
            </div>
            <div>
              <p className="text-4xl font-semibold">
                {title}
              </p>
              <p className="font-semibold text-left text-xl mt-5">Filling <span className="text-default/50 font-light text-base">(+1100)</span></p>
              <OptionSelector options={options} selectedOption={selectedOption} onSelect={handleSelect} />
              <div className="flex items-center justify-center gap-1 text-xl font-semibold mt-10">
                <p>Total</p>
                <div className="flex items-center text-primary-200">
                  <BiWon />
                  <p>{totalPrice.toLocaleString()}</p>
                </div>
              </div>
              <button className={DETAIL_BTN_CLASSNAME} onClick={handleClick}>ADD TO CART</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

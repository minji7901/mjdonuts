import React from 'react';
import { useNavigate } from "react-router-dom";
import { BiWon } from "react-icons/bi";

const ITEM_CLASSNAME = 'cursor-pointer shadow-base rounded-2xl py-5 hover:scale-110 hover:bg-base/70 transition-all'
const ITEM_PRICE_CLASSNAME = "flex items-center justify-center font-semibold text-primary-200"

export default function ProductItem({
  product,
  product: { id, image, title, price }
}) {
  const navigate = useNavigate();

  return (
    <li
      className={ITEM_CLASSNAME}
      onClick={() => { 
        navigate(`/products/${id}`, { state: { product } }) 
      }}
    >
      <img src={image} className="max-w-48 mx-auto" alt={title} />
      <div className="text-center">
        <p className="text-lg py-2 break-keep text-default font-bold">
          {title}
        </p>
        <div className={ITEM_PRICE_CLASSNAME}>
          <BiWon className="mb-[1px]" />
          <p>{price.toLocaleString()}</p>
        </div>
      </div>
    </li>
  );
}
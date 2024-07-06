import React from 'react';
import { TbMoneybag } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export default function ProductItem({product,product:{id,image,title,price}}) {
  const  PRICE_CLASSNAME = "flex items-center justify-center gap-1 p-4 border-t border-t-white h-14 mt-auto text-primary";
  const navigate = useNavigate();
  return (
    <li className="card" onClick={()=>{navigate(`/product/${id}`, {state: {product}})}}>
      <img src={image} className="max-w-48 mx-auto" alt={title} />
      <p className="p-4 break-keep text-gray-300">{title}</p>
      <div className={PRICE_CLASSNAME}>
        <TbMoneybag />
        <p className="font-semibold text-lg">{price.toLocaleString()}</p>
      </div>
    </li>
  );
}


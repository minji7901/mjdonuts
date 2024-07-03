import React from 'react';
import { TbMoneybag } from "react-icons/tb";

export default function ProductCard({product:{id,image,title,price}}) {
  return (
    <li className="card">
      <img src={image} className="max-w-48 mx-auto" alt={title} />
      <p className="p-4 break-keep text-gray-300">{title}</p>
      <div className="flex items-center justify-center gap-1 p-4 border-t border-t-white h-14 mt-auto text-primary">
        <TbMoneybag />
        <p className="font-semibold text-lg">{price}</p>
      </div>
    </li>
  );
}


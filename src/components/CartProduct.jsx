import React from 'react';
import { TbMoneybag } from "react-icons/tb";
import useProducts from "../hooks/useProducts";

export default function CartProduct({
  product,
  product: { id, image, title, option, quantity, price ,numSelected },
  uid,
}) {
  const { updateCartMutation, deleteCartMutation } = useProducts(uid);
  const handleMinus = (e) => {
    if (quantity < 2) return;
    e.stopPropagation();
    updateCartMutation.mutate({ uid, product: { ...product, quantity: quantity - 1 } });
  };
  const handlePlus = (e) => {
    e.stopPropagation();
    updateCartMutation.mutate({ uid, product: { ...product, quantity: quantity + 1 } });
  }
  const handleDelete = (e) => {
    e.stopPropagation();
    deleteCartMutation.mutate({ uid, id });
  }

  const CART_BOX_CLASSNAME = "flex items-center gap-5 border-b border-b-white/50 py-12 last:border-none"
  const CART_INPUT_CLASSNAME = "bg-transparent px-3 focus:outline-none w-14 text-center text-sm border-y py-1 border-white h-full"
  const CART_ITEM_CLASSNAME = "border border-white bg-white/10 backdrop-blur-md text-center p-4 rounded-full"
  const CART_NUM_CLASSNAME = "bg-white px-2 py-1 text-base text-[#030424]"

  return (
    <div className={CART_BOX_CLASSNAME}>
      <div className={CART_ITEM_CLASSNAME}>
        <img src={image} className="max-w-24" alt={title} />
      </div>
      <div>
        <p className="text-lg">{title}</p>
        <p className="mt-1 mb-3 text-sm text-white/50 ">({option}묶음)</p>
        <div className="flex rounded-md h-8">
          <button onClick={(e) => { handleMinus(e); }} className={'rounded-l-md ' + CART_NUM_CLASSNAME}>-</button>
          <input type="number" value={quantity} readOnly className={CART_INPUT_CLASSNAME} />
          <button onClick={(e) => { handlePlus(e) }} className={'rounded-r-md ' + CART_NUM_CLASSNAME}>+</button>
        </div>
      </div>
      <div className="flex items-center gap-1 text-xl ml-auto">
        <TbMoneybag />
        <p>{price.toLocaleString()}</p>
      </div>
      <button onClick={(e) => { handleDelete(e) }} className="ml-4 border border-white px-3 py-1 rounded-md">삭제</button>
    </div>
  );
}
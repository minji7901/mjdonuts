import React from 'react';
import { BiWon } from "react-icons/bi";
import useProducts from "../hooks/useProducts";

export default function CartProduct({
  product,
  product: { id, image, title, quantity, price, selectedOption },
  uid,
}) {
  const { updateCartMutation, deleteCartMutation } = useProducts(uid);

  const handleMinus = (e) => {
    if (quantity < 2) return;
    e.stopPropagation();
    updateCartMutation.mutate({
      uid,
      product: {
        ...product,
        quantity: quantity - 1
      }
    });
  };

  const handlePlus = (e) => {
    e.stopPropagation();
    updateCartMutation.mutate({
      uid,
      product: {
        ...product,
        quantity: quantity + 1
      }
    });
  }

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteCartMutation.mutate({ uid, id });
  }

  const totalPrice = price * quantity;

  const CARTPRODUCT_CLASSNAME = "flex items-center gap-5 flex-col lg:flex-row lg:py-2 pb-10 border-b border-dashed border-primary-100 last:border-b-0 last:pb-0"
  const CART_COMMON_CLASSNAME = "flex items-center  gap-2 basis-1/6 justify-center"
  const CART_NUM_CLASSNAME = "w-7 h-7 rounded-full text-white font-lg"

  return (
    <div className={CARTPRODUCT_CLASSNAME}>
      <img src={image} className="basis-1/6 max-w-32" alt={title} />
      <div className="basis-2/6">
        <p className="font-semibold text-xl mb-1">{title}</p>
        {selectedOption === "none" ?
          <></>
          : <p className="text-default/50 font-light text-sm">
            ( + 1100 {selectedOption})
          </p>
        }
      </div>
      <div className={CART_COMMON_CLASSNAME}>
        <button
          className={'bg-primary-100/50 ' + CART_NUM_CLASSNAME}
          onClick={(e) => { handleMinus(e); }}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          className={'bg-primary-100 ' + CART_NUM_CLASSNAME}
          onClick={(e) => { handlePlus(e) }}
        >
          +
        </button>
      </div>
      <div className={'tex-xl ' + CART_COMMON_CLASSNAME}>
        <BiWon />
        <p>{totalPrice.toLocaleString()}</p>
      </div>
      <div className="basis-1/6 text-center">
        <button
          className="bg-secondary text-white shadow-base px-5 py-1 rounded-full "
          onClick={(e) => { handleDelete(e) }} >
          del
        </button>
      </div>
    </div>
  );
}
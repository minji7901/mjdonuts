import React from 'react';
import CartProduct from "../components/CartProduct";
import { FiShoppingCart } from "react-icons/fi";
import { BiWon } from "react-icons/bi";
import useCart from "../hooks/useCart";

export default function Cart() {
  const {
    cartQuery: { isLoading, data: products },
  } = useCart();

  // 장바구니에 상품이 있는지 여부 확인
  const hasProducts = products && products.length > 0;
  // 전체 상품 가격 계산
  const totalPrice = products ? products.reduce((total, item) => total + item.price * item.quantity, 0) : 0;

  return (
    <section className="bg-main h-cal">
      <div className="inner">
        <div className="flex items-center justify-center text-5xl mb-10 gap-3 font-medium">
          <FiShoppingCart />
          <h1>CART</h1>
        </div>
        {isLoading && <p>loading..</p>}
        {!hasProducts && !isLoading &&
          <p className="text-xl">There are no products in your shopping cart.</p>
        }
        {hasProducts &&
          <div className="flex rounded-3xl shadow-base flex-col lg:flex-row">
            <div className="px-10 py-5 w-full lg-w-calc-64">
              {products && products.map((product) => (
                <CartProduct key={product.id} product={product} />
              ))}
            </div>
            <div className="text-2xl p-5 w-full lg:w-64 bg-primary-100 rounded-b-3xl lg:rounded-r-3xl lg:rounded-l-none">
              <div className="flex items-center justify-center gap-2 h-full font-semibold text-white">
                <p>TOTAL :</p>
                <p className="flex items-center gap-1">
                  <BiWon />
                  {totalPrice.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        }
      </div>
    </section>
  );
}
import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";
import CartProduct from "../components/CartProduct";
import { FiShoppingCart } from "react-icons/fi";
import { TbMoneybag } from "react-icons/tb";

export default function Cart() {
  const { user: { uid } } = useAuthContext();
  const { isLoading, error, data: products } = useQuery({
    queryKey: ['carts'],
    queryFn: () => getCart(uid),
  })
  // 장바구니에 상품이 있는지 여부 확인
  const hasProducts = products && products.length > 0;
  // 전체 상품 가격 계산
  const totalPrice = products ? products.reduce((total, item) => total + item.price, 0) : 0;

  return (
    <section className="inner pt-10">
      <div className="flex items-center justify-center text-3xl mb-10 gap-3">
        <FiShoppingCart />
        <h1 className="font-black">장바구니</h1>
      </div>
      {!hasProducts && <p>장바구니에 상품이 없습니다.</p>}
      {hasProducts && (
        <>
          <div className="pb-14">
            {isLoading && "loading.."}
            {error && <p>에러: {error.message}</p>}
            {products && products.map((product) => (
              <CartProduct key={product.id} product={product} uid={uid} />
            ))}
          </div>
          <div className="py-10 border-dashed border-t border-white">
            <div className="flex items-center justify-between text-2xl">
              <p>Total</p>
              <p className="flex items-center gap-2 text-primary font-bold">
                <TbMoneybag />
                {totalPrice.toLocaleString()}
              </p>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
import React from 'react';
import useProducts from "../hooks/useProducts";
import ProductItem from "./ProductItem";

export default function Products({ limit }) {
  const { productQuery: { isLoading, error, data: products } } = useProducts();
  const displayProducts  = (products, limit) => {
    if (!products) return [];
    if (limit) {
      return [...products].sort(() => 0.5 - Math.random()).slice(0, limit);
    }
    return products;
  }
  const items = displayProducts(products, limit);

  return (
    <>
      {isLoading && <p>로딩중</p>}
      {error && <p>{error}</p>}
      <ul className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-4 gap-x-5 gap-y-8">
        {items &&
          items.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
      </ul>
    </>
  );
}
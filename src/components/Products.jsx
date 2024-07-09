import React from 'react';
import useProducts from "../hooks/useProducts";
import ProductItem from "./ProductItem";

export default function Products({ limit }) {
  const {
    productQuery: { isLoading, error, data }
  } = useProducts();

  const displayProducts  = (data, limit) => {
    if (!data) return [];
    if (limit) {
      return [...data].sort(() => 0.5 - Math.random()).slice(0, limit);
    }
    return data;
  }
  const items = displayProducts(data, limit);

  return (
    <>
      {isLoading && <p>loading...</p>}
      {error && <p>{error.message}</p>}
      <ul className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-4 gap-x-5 gap-y-8">
        {items.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
      </ul>
    </>
  );
}
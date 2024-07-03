import React from 'react';
import { getProducts } from "../api/firebase";
import ProductCard from "./ProductCard";
import { useQuery } from "react-query";

export default function Products() {
  const { isLoading, error, data: products } = useQuery(['products'], getProducts)
  return (
    <div>
      {isLoading && <p>로딩중</p>}
      {error && <p>{error}</p>}
      <ul className="grid grid-cols-4 gap-x-5 gap-y-8">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </ul>
    </div>
  );
}


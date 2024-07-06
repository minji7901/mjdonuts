import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewProduct, addOrUpdateCart, getProducts, removeCart } from "../api/firebase";

export default function useProducts(uid){
  const queryClient = useQueryClient();
  const productQuery = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: 1000 * 60
  })
  const addProduct = useMutation({
    mutationFn: ({ product, url }) => addNewProduct(product, url),
    onSuccess: () => queryClient.invalidateQueries(['products'])
  })
  const updateCartMutation = useMutation({
    mutationFn: ({ uid, product }) => addOrUpdateCart(uid, product),
    onSuccess: () => queryClient.invalidateQueries(['cart', uid])
  })
  const deleteCartMutation = useMutation({
    mutationFn: ({ uid, id }) => removeCart(uid, id),
    onSuccess: () => queryClient.invalidateQueries(['cart', uid])
  })
  
  return {productQuery,addProduct, updateCartMutation, deleteCartMutation}
}
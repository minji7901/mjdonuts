import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addOrUpdateToCart, getCart, removeFromCart } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';

export default function useCart() {
  const { user } = useAuthContext();
  const uid = user?.uid;
  const queryClient = useQueryClient();

  const cartQuery = useQuery({
    queryKey: ['cart', uid],
    queryFn: () => getCart(uid),
    enabled: !!uid,
    onError: (error) => {
      console.error('Error fetching cart:', error);
    },
  });

  const addOrUpdateItem = useMutation({
    mutationFn: (product) => addOrUpdateToCart(uid, product),
    onSuccess: () => {
      queryClient.invalidateQueries(['cart', uid]);
    },
    onError: (error) => {
      console.error('Error adding or updating item:', error);
    },
  });

  const removeItem = useMutation({
    mutationFn: (id) => removeFromCart(uid, id),
    onSuccess: () => {
      queryClient.invalidateQueries(['cart', uid]);
    },
    onError: (error) => {
      console.error('Error removing item:', error);
    },
  });

  return { cartQuery, addOrUpdateItem, removeItem };
}
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import useCartStore from '../store/cartStore';

function CartIcon() {
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <Link to="/cart" className="relative">
      <ShoppingCart size={24} />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#7A1526] text-[#C89B3C] text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </Link>
  );
}

export default CartIcon;
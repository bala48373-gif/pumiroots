import { create } from "zustand";

const useCartStore = create((set, get) => ({
  items: [],

  addToCart: (product) => {
    const items = get().items;
    const existing = items.find((item) => item.id === product.id);

    if (existing) {
      set({
        items: items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({ items: [...items, { ...product, quantity: 1 }] });
    }
  },

  removeFromCart: (productId) => {
    set({ items: get().items.filter((item) => item.id !== productId) });
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }
    set({
      items: get().items.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    });
  },

  clearCart: () => set({ items: [] }),

  getTotal: () => {
    return get().items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  },

  getItemCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },
}));

export default useCartStore;
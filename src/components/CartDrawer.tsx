import { X, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Restaurant } from "@/types";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  restaurant: Restaurant | null;
  onCheckout: () => void;
}

export function CartDrawer({ open, onClose, restaurant, onCheckout }: CartDrawerProps) {
  const { items, addItem, decreaseItem, removeItem, subtotal, totalItems, clearCart } =
    useCart();

  const deliveryFee = restaurant ? restaurant.delivery_fee : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-rose-500" />
            <h2 className="text-lg font-bold text-gray-900">Your Cart</h2>
            {totalItems > 0 && (
              <span className="bg-rose-100 text-rose-600 text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems} items
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Your cart is empty
            </h3>
            <p className="text-sm text-gray-500">
              Add some delicious dishes to get started!
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {restaurant && (
                <div className="bg-rose-50 rounded-xl p-3 mb-2">
                  <p className="text-sm text-rose-600 font-medium">
                    {restaurant.name}
                  </p>
                  <p className="text-xs text-rose-400">
                    {restaurant.delivery_time} delivery
                  </p>
                </div>
              )}
              {items.map(({ item, quantity }) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                >
                  <span
                    className={`w-3 h-3 rounded-sm border-2 shrink-0 ${
                      item.is_veg ? "border-green-600" : "border-red-500"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => decreaseItem(item.id)}
                      className="p-1.5 hover:bg-gray-100 transition-colors"
                    >
                      {quantity === 1 ? (
                        <Trash2 className="w-4 h-4 text-red-500" />
                      ) : (
                        <Minus className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                    <span className="text-sm font-bold min-w-[1.5rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => addItem(item)}
                      className="p-1.5 hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  <span className="text-sm font-bold text-gray-900 min-w-[3rem] text-right">
                    ${(item.price * quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <button
                onClick={clearCart}
                className="w-full text-sm text-gray-400 hover:text-red-500 transition-colors py-2"
              >
                Clear cart
              </button>
            </div>

            <div className="border-t border-gray-200 p-4 space-y-2 bg-white">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Delivery fee</span>
                <span className="font-medium">
                  {deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Taxes (8%)</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-100">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full mt-2 py-3.5 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-rose-200"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

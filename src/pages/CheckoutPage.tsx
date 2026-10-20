import { useState } from "react";
import { useCart } from "@/context/CartContext";
import type { Restaurant } from "@/types";
import { CheckCircle2, ArrowLeft } from "lucide-react";

interface CheckoutPageProps {
  restaurant: Restaurant | null;
  onBack: () => void;
  onComplete: () => void;
}

export function CheckoutPage({ restaurant, onBack, onComplete }: CheckoutPageProps) {
  const { items, subtotal, totalItems, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
    phone: "",
    notes: "",
  });

  const deliveryFee = restaurant ? restaurant.delivery_fee : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Order placed successfully!
          </h1>
          <p className="text-gray-500 mb-1">
            Your delicious order is being prepared.
          </p>
          {restaurant && (
            <p className="text-sm text-gray-400 mb-6">
              {restaurant.name} · {restaurant.delivery_time}
            </p>
          )}
          <button
            onClick={onComplete}
            className="w-full py-3.5 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl transition-colors"
          >
            Back to home
          </button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-4">Add items before checking out.</p>
        <button
          onClick={onBack}
          className="text-rose-500 font-medium hover:underline"
        >
          Back to home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-rose-500 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back</span>
        </button>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

        <form onSubmit={handlePlaceOrder} className="grid md:grid-cols-5 gap-6">
          {/* Delivery details */}
          <div className="md:col-span-3 space-y-4">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Delivery details
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full name
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery address
                  </label>
                  <input
                    required
                    value={form.address}
                    onChange={(e) =>
                      setForm({ ...form, address: e.target.value })
                    }
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all"
                    placeholder="123 Main Street"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all"
                    placeholder="New York"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP code
                  </label>
                  <input
                    required
                    value={form.zip}
                    onChange={(e) => setForm({ ...form, zip: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all"
                    placeholder="10001"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone number
                  </label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery notes (optional)
                  </label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all resize-none"
                    placeholder="Leave at door, ring doorbell, etc."
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Payment method
              </h2>
              <div className="space-y-2">
                {["Cash on delivery", "Credit / Debit card", "Digital wallet"].map(
                  (method, i) => (
                    <label
                      key={method}
                      className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:border-rose-300 transition-colors"
                    >
                      <input
                        type="radio"
                        name="payment"
                        defaultChecked={i === 0}
                        className="accent-rose-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {method}
                      </span>
                    </label>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Order summary
              </h2>
              {restaurant && (
                <p className="text-sm text-rose-500 font-medium mb-3">
                  {restaurant.name}
                </p>
              )}
              <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                {items.map(({ item, quantity }) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm text-gray-600"
                  >
                    <span className="flex items-center gap-1.5">
                      <span
                        className={`w-2.5 h-2.5 rounded-sm border ${
                          item.is_veg
                            ? "border-green-600"
                            : "border-red-500"
                        }`}
                      />
                      {quantity}× {item.name}
                    </span>
                    <span>${(item.price * quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 pt-4 border-t border-gray-100">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>
                    Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})
                  </span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Delivery fee</span>
                  <span>
                    {deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Taxes (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-6 py-3.5 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-rose-200"
              >
                Place order · ${total.toFixed(2)}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

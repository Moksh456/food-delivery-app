import { Star, Plus, Minus } from "lucide-react";
import type { MenuItem } from "@/types";
import { useCart } from "@/context/CartContext";

interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const { addItem, decreaseItem, getItemQuantity } = useCart();
  const qty = getItemQuantity(item.id);

  return (
    <div className="flex gap-4 py-5 border-b border-gray-100 last:border-b-0">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span
            className={`w-3.5 h-3.5 rounded-sm border-2 flex items-center justify-center shrink-0 ${
              item.is_veg
                ? "border-green-600"
                : "border-red-500"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                item.is_veg ? "bg-green-600" : "bg-red-500"
              }`}
            />
          </span>
          {item.is_bestseller && (
            <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 text-xs font-bold rounded">
              Bestseller
            </span>
          )}
        </div>

        <h4 className="text-base font-semibold text-gray-900 leading-snug">
          {item.name}
        </h4>
        {item.description && (
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {item.description}
          </p>
        )}
        <div className="flex items-center gap-3 mt-2">
          <span className="font-bold text-gray-900">
            ${item.price.toFixed(2)}
          </span>
          {item.rating > 0 && (
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {item.rating}
            </span>
          )}
        </div>
      </div>

      <div className="shrink-0 w-28 relative">
        {item.image_url && (
          <div className="w-full h-24 rounded-xl overflow-hidden mb-2">
            <img
              src={item.image_url}
              alt={item.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}
        <div className="flex justify-center">
          {qty === 0 ? (
            <button
              onClick={() => addItem(item)}
              className="flex items-center gap-1 px-4 py-1.5 bg-white border-2 border-rose-500 text-rose-500 font-bold text-sm rounded-lg hover:bg-rose-50 transition-colors"
            >
              <Plus className="w-4 h-4" />
              ADD
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-rose-500 text-white rounded-lg overflow-hidden">
              <button
                onClick={() => decreaseItem(item.id)}
                className="p-1.5 hover:bg-rose-600 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-sm font-bold min-w-[1.5rem] text-center">
                {qty}
              </span>
              <button
                onClick={() => addItem(item)}
                className="p-1.5 hover:bg-rose-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

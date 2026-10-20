import { Star, Clock, MapPin } from "lucide-react";
import type { Restaurant } from "@/types";

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
}

const priceLabels = ["$", "$$", "$$$", "$$$"];

export function RestaurantCard({ restaurant, onClick }: RestaurantCardProps) {
  return (
    <button
      onClick={onClick}
      className="group text-left bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl hover:border-gray-300 transition-all duration-300 cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={restaurant.image_url}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {restaurant.promoted && (
            <span className="px-2.5 py-1 bg-black/70 text-white text-xs font-semibold rounded-md backdrop-blur-sm">
              Promoted
            </span>
          )}
          {restaurant.pure_veg && (
            <span className="px-2.5 py-1 bg-green-600/90 text-white text-xs font-semibold rounded-md backdrop-blur-sm">
              Pure Veg
            </span>
          )}
        </div>
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg px-2.5 py-1 flex items-center gap-1 shadow-sm">
          <Clock className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-xs font-semibold text-gray-700">
            {restaurant.delivery_time}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-rose-500 transition-colors line-clamp-1">
            {restaurant.name}
          </h3>
          <div className="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-md shrink-0">
            <Star className="w-3.5 h-3.5 fill-green-600 text-green-600" />
            <span className="text-sm font-bold text-green-700">
              {restaurant.rating}
            </span>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-3 line-clamp-1">
          {restaurant.cuisine}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-500 pt-3 border-t border-gray-100">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {restaurant.location}
          </span>
          <span className="font-medium text-gray-600">
            {priceLabels[restaurant.price_level - 1]} ·{" "}
            {restaurant.delivery_fee === 0
              ? "Free delivery"
              : `$${restaurant.delivery_fee} delivery`}
          </span>
        </div>
      </div>
    </button>
  );
}

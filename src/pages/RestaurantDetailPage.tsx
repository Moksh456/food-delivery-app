import { useMemo } from "react";
import { Star, Clock, MapPin, Bike, Info } from "lucide-react";
import { MenuItemCard } from "@/components/MenuItemCard";
import { useRestaurant } from "@/hooks/useData";
import type { Restaurant } from "@/types";

interface RestaurantDetailPageProps {
  restaurantId: string;
  fallbackRestaurant: Restaurant | null;
  onBack: () => void;
}

export function RestaurantDetailPage({
  restaurantId,
  fallbackRestaurant,
  onBack,
}: RestaurantDetailPageProps) {
  const { restaurant: fetchedRestaurant, menuItems, loading } =
    useRestaurant(restaurantId);
  const restaurant = fetchedRestaurant || fallbackRestaurant;

  const groupedMenu = useMemo(() => {
    const groups: Record<string, typeof menuItems> = {};
    menuItems.forEach((item) => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return groups;
  }, [menuItems]);

  const categoryNames = Object.keys(groupedMenu);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Restaurant not found
        </h2>
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
      {/* Cover */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img
          src={restaurant.cover_url}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Restaurant info card */}
        <div className="relative -mt-16 bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {restaurant.name}
              </h1>
              <p className="text-gray-500 mb-1">{restaurant.cuisine}</p>
              {restaurant.description && (
                <p className="text-sm text-gray-400 mb-4">
                  {restaurant.description}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  {restaurant.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-gray-400" />
                  {restaurant.delivery_time}
                </span>
                <span className="flex items-center gap-1.5">
                  <Bike className="w-4 h-4 text-gray-400" />
                  {restaurant.delivery_fee === 0
                    ? "Free delivery"
                    : `$${restaurant.delivery_fee} delivery`}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-2 sm:border-l sm:pl-6 sm:border-gray-100">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-1 bg-green-50 px-2.5 py-1 rounded-lg">
                  <Star className="w-4 h-4 fill-green-600 text-green-600" />
                  <span className="font-bold text-green-700">
                    {restaurant.rating}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  ({restaurant.rating_count.toLocaleString()} ratings)
                </span>
              </div>
              {restaurant.pure_veg && (
                <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-md">
                  Pure Veg
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
            <Info className="w-4 h-4 text-rose-400" />
            <p className="text-sm text-gray-500">
              Menu items below are prepared fresh. Add items to your cart to
              place an order.
            </p>
          </div>
        </div>

        {/* Menu */}
        <div className="pb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Menu</h2>
          {categoryNames.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No menu items available.
            </p>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
              {categoryNames.map((cat) => (
                <div key={cat}>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 pb-2 border-b border-gray-100">
                    {cat}
                  </h3>
                  <div className="divide-y divide-gray-100">
                    {groupedMenu[cat].map((item) => (
                      <MenuItemCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

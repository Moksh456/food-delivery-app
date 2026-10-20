import { useState, useMemo } from "react";
import { CategoryStrip } from "@/components/CategoryStrip";
import { RestaurantCard } from "@/components/RestaurantCard";
import { useCategories, useRestaurants, useSearch } from "@/hooks/useData";
import type { Restaurant } from "@/types";
import { UtensilsCrossed, TrendingUp, Sparkles } from "lucide-react";

interface HomePageProps {
  onRestaurantClick: (restaurant: Restaurant) => void;
  searchQuery: string;
}

export function HomePage({ onRestaurantClick, searchQuery }: HomePageProps) {
  const { categories, loading: catLoading } = useCategories();
  const { restaurants, loading: restLoading } = useRestaurants();
  const { results: searchResults, loading: searchLoading } = useSearch(searchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const displayRestaurants = searchQuery.trim() ? searchResults : restaurants;

  const filteredRestaurants = useMemo(() => {
    if (!selectedCategory) return displayRestaurants;
    const catName = categories.find((c) => c.slug === selectedCategory)?.name.toLowerCase();
    if (!catName) return displayRestaurants;
    return displayRestaurants.filter((r) =>
      r.cuisine.toLowerCase().includes(catName)
    );
  }, [displayRestaurants, selectedCategory, categories]);

  const promotedRestaurants = restaurants.filter((r) => r.promoted).slice(0, 4);
  const topRated = [...restaurants].sort((a, b) => b.rating - a.rating).slice(0, 6);

  const showSearch = searchQuery.trim().length > 0;
  const loading = showSearch ? searchLoading : restLoading || catLoading;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      {!showSearch && (
        <section className="relative h-[380px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/38631739/pexels-photo-38631739.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
              alt="Delicious food spread"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-3">
                Discover the best food & drinks near you
              </h1>
              <p className="text-lg text-white/80 mb-6">
                Order from your favorite restaurants, delivered fresh to your door.
              </p>
              <div className="flex gap-3">
                <span className="px-4 py-2 bg-white/15 backdrop-blur-md text-white text-sm font-medium rounded-full border border-white/20">
                  Free delivery on first order
                </span>
                <span className="px-4 py-2 bg-rose-500/90 backdrop-blur-md text-white text-sm font-medium rounded-full">
                  30 min delivery
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories */}
        {!showSearch && (
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <UtensilsCrossed className="w-5 h-5 text-rose-500" />
              <h2 className="text-xl font-bold text-gray-900">
                What's on your mind?
              </h2>
            </div>
            {!catLoading && (
              <CategoryStrip
                categories={categories}
                selected={selectedCategory}
                onSelect={setSelectedCategory}
              />
            )}
          </section>
        )}

        {/* Promoted */}
        {!showSearch && promotedRestaurants.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h2 className="text-xl font-bold text-gray-900">
                Featured restaurants
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {promotedRestaurants.map((r) => (
                <RestaurantCard
                  key={r.id}
                  restaurant={r}
                  onClick={() => onRestaurantClick(r)}
                />
              ))}
            </div>
          </section>
        )}

        {/* All / Filtered restaurants */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-rose-500" />
            <h2 className="text-xl font-bold text-gray-900">
              {showSearch
                ? `Search results for "${searchQuery}"`
                : selectedCategory
                ? "Filtered restaurants"
                : "All restaurants near you"}
            </h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-200 animate-pulse"
                >
                  <div className="h-48 bg-gray-200" />
                  <div className="p-4 space-y-2">
                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredRestaurants.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UtensilsCrossed className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                No restaurants found
              </h3>
              <p className="text-sm text-gray-500">
                Try a different search or category filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {(showSearch ? searchResults : topRated).map((r) => (
                <RestaurantCard
                  key={r.id}
                  restaurant={r}
                  onClick={() => onRestaurantClick(r)}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      <footer className="bg-gray-900 text-gray-400 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white font-bold mb-3 text-lg">Food</h4>
              <p className="text-sm">
                Discover the best food and drinks near you, anytime.
              </p>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-3">Company</h5>
              <ul className="space-y-2 text-sm">
                <li className="hover:text-white cursor-pointer">About</li>
                <li className="hover:text-white cursor-pointer">Careers</li>
                <li className="hover:text-white cursor-pointer">Team</li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-3">For Restaurants</h5>
              <ul className="space-y-2 text-sm">
                <li className="hover:text-white cursor-pointer">Partner with us</li>
                <li className="hover:text-white cursor-pointer">Apps for you</li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-3">Learn more</h5>
              <ul className="space-y-2 text-sm">
                <li className="hover:text-white cursor-pointer">Privacy</li>
                <li className="hover:text-white cursor-pointer">Terms</li>
                <li className="hover:text-white cursor-pointer">Security</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

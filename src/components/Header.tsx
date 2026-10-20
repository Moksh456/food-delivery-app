import { useCart } from "@/context/CartContext";
import { ShoppingBag, Search, MapPin, Home, ChevronLeft } from "lucide-react";

interface HeaderProps {
  onCartClick: () => void;
  onLogoClick: () => void;
  onSearch: (query: string) => void;
  searchQuery: string;
  showBack?: boolean;
}

export function Header({
  onCartClick,
  onLogoClick,
  onSearch,
  searchQuery,
  showBack,
}: HeaderProps) {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 h-16">
          <div className="flex items-center gap-3 shrink-0">
            {showBack ? (
              <button
                onClick={onLogoClick}
                className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Go back"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
            ) : (
              <button onClick={onLogoClick} className="flex items-center gap-2">
                <Home className="w-5 h-5 text-rose-500 hidden sm:block" />
                <span className="text-2xl font-bold text-rose-500 tracking-tight">
                  Food
                </span>
              </button>
            )}
          </div>

          <div className="hidden md:flex items-center gap-2 text-sm text-gray-600 border-l border-gray-200 pl-4 shrink-0">
            <MapPin className="w-4 h-4 text-rose-500" />
            <span className="font-medium">Downtown</span>
          </div>

          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search for restaurants and dishes"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-100 rounded-xl border border-transparent focus:border-rose-300 focus:bg-white focus:ring-2 focus:ring-rose-100 outline-none transition-all"
              />
            </div>
          </div>

          <button
            onClick={onCartClick}
            className="relative flex items-center gap-2 px-4 py-2.5 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors shrink-0"
          >
            <ShoppingBag className="w-5 h-5 text-rose-500" />
            <span className="hidden sm:inline text-sm font-medium text-rose-600">
              Cart
            </span>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

import { useState } from "react";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/Header";
import { HomePage } from "@/pages/HomePage";
import { RestaurantDetailPage } from "@/pages/RestaurantDetailPage";
import { CheckoutPage } from "@/pages/CheckoutPage";
import { CartDrawer } from "@/components/CartDrawer";
import type { Restaurant } from "@/types";

type View =
  | { name: "home" }
  | { name: "restaurant"; restaurant: Restaurant }
  | { name: "checkout" };

function App() {
  const [view, setView] = useState<View>({ name: "home" });
  const [searchQuery, setSearchQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  const goHome = () => {
    setView({ name: "home" });
    setSearchQuery("");
  };

  const handleRestaurantClick = (restaurant: Restaurant) => {
    setView({ name: "restaurant", restaurant });
  };

  const handleCheckout = () => {
    setCartOpen(false);
    setView({ name: "checkout" });
  };

  const currentRestaurant =
    view.name === "restaurant"
      ? view.restaurant
      : view.name === "checkout"
      ? null
      : null;

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Header
          onCartClick={() => setCartOpen(true)}
          onLogoClick={goHome}
          onSearch={setSearchQuery}
          searchQuery={searchQuery}
          showBack={view.name !== "home"}
        />

        {view.name === "home" && (
          <HomePage
            onRestaurantClick={handleRestaurantClick}
            searchQuery={searchQuery}
          />
        )}

        {view.name === "restaurant" && (
          <RestaurantDetailPage
            restaurantId={view.restaurant.id}
            fallbackRestaurant={view.restaurant}
            onBack={goHome}
          />
        )}

        {view.name === "checkout" && (
          <CheckoutPage
            restaurant={currentRestaurant}
            onBack={goHome}
            onComplete={goHome}
          />
        )}

        <CartDrawer
          open={cartOpen}
          onClose={() => setCartOpen(false)}
          restaurant={
            view.name === "restaurant" ? view.restaurant : null
          }
          onCheckout={handleCheckout}
        />
      </div>
    </CartProvider>
  );
}

export default App;

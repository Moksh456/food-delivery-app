/*
# Create Zomato-style food delivery schema (single-tenant, no auth)

1. New Tables
- `categories` — food categories (Pizza, Burgers, Biryani, etc.) with name, slug, and image URL.
- `restaurants` — restaurant listings with name, cuisine, rating, delivery time, price level, image, and cover image.
- `menu_items` — dishes belonging to a restaurant, with name, description, price, category, image, veg flag, and rating.

2. Relationships
- `menu_items.restaurant_id` references `restaurants.id` (CASCADE on delete).
- `restaurants.cuisine` is a free text field for display.

3. Security
- RLS enabled on all tables.
- All tables are intentionally public/shared (single-tenant, no sign-in) so policies use `TO anon, authenticated` with `USING (true)` / `WITH CHECK (true)`.
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  image_url text NOT NULL
);

CREATE TABLE IF NOT EXISTS restaurants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  cuisine text NOT NULL,
  description text DEFAULT '',
  rating numeric(2,1) NOT NULL DEFAULT 4.0,
  rating_count integer NOT NULL DEFAULT 0,
  delivery_time text NOT NULL DEFAULT '30-40 min',
  delivery_fee numeric(6,2) NOT NULL DEFAULT 0,
  price_level integer NOT NULL DEFAULT 2,
  image_url text NOT NULL,
  cover_url text NOT NULL,
  location text NOT NULL DEFAULT '',
  promoted boolean NOT NULL DEFAULT false,
  pure_veg boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id uuid NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text DEFAULT '',
  price numeric(8,2) NOT NULL,
  category text NOT NULL DEFAULT 'Main Course',
  image_url text DEFAULT '',
  is_veg boolean NOT NULL DEFAULT true,
  is_bestseller boolean NOT NULL DEFAULT false,
  rating numeric(2,1) DEFAULT 4.0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_categories" ON categories;
CREATE POLICY "anon_select_categories" ON categories FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_categories" ON categories;
CREATE POLICY "anon_insert_categories" ON categories FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_restaurants" ON restaurants;
CREATE POLICY "anon_select_restaurants" ON restaurants FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_restaurants" ON restaurants;
CREATE POLICY "anon_insert_restaurants" ON restaurants FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_menu_items" ON menu_items;
CREATE POLICY "anon_select_menu_items" ON menu_items FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_menu_items" ON menu_items;
CREATE POLICY "anon_insert_menu_items" ON menu_items FOR INSERT
  TO anon, authenticated WITH CHECK (true);

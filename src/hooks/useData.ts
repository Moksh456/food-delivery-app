import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import type { Restaurant, MenuItem, Category } from "@/types";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true })
      .then(({ data, error }) => {
        if (!error && data) setCategories(data);
        setLoading(false);
      });
  }, []);

  return { categories, loading };
}

export function useRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("restaurants")
      .select("*")
      .order("rating", { ascending: false });
    if (!error && data) setRestaurants(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { restaurants, loading };
}

export function useRestaurant(id: string | null) {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    setLoading(true);

    (async () => {
      const [{ data: restData, error: restErr }, { data: menuData, error: menuErr }] =
        await Promise.all([
          supabase.from("restaurants").select("*").eq("id", id).maybeSingle(),
          supabase.from("menu_items").select("*").eq("restaurant_id", id).order("category", { ascending: true }),
        ]);

      if (!restErr && restData) setRestaurant(restData as Restaurant);
      if (!menuErr && menuData) setMenuItems(menuData as MenuItem[]);
      setLoading(false);
    })();
  }, [id]);

  return { restaurant, menuItems, loading };
}

export function useSearch(query: string) {
  const [results, setResults] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    const timer = setTimeout(async () => {
      const { data, error } = await supabase
        .from("restaurants")
        .select("*")
        .ilike("name", `%${query}%`)
        .order("rating", { ascending: false });
      if (!error && data) setResults(data);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return { results, loading };
}

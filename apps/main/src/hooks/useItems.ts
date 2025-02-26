import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Item {
  id: number;
  title: string;
  category: string;
  price: string;
  image: string;
  created_at: string;
}

export function useItems(category?: string) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchItems() {
      try {
        let query = supabase
          .from('items')
          .select('*')
          .order('created_at', { ascending: false });

        if (category) {
          query = query.eq('category', category);
        }

        const { data, error } = await query;

        if (error) throw error;
        setItems(data || []);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, [category]);

  return { items, loading, error };
}
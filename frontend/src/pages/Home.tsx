import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Package } from 'lucide-react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import ErrorState from '../components/ErrorState';

const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Home', 'Books', 'Toys', 'Sports', 'Food', 'Beauty'];

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string>('All');
  
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchProducts = async (reset = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      if (category !== 'All') params.append('category', category);
      
      const currentCursorToFetch = reset ? null : nextCursor;
      if (currentCursorToFetch) params.append('cursor', currentCursorToFetch);

      const API_BASE = 'https://products-api-nwrz.onrender.com';
      const res = await fetch(`${API_BASE}/api/products?${params.toString()}`);
      
      if (!res.ok) throw new Error(`Server responded with status: ${res.status}`);

      const data = await res.json();
      const newItems = data.items || [];
      
      if (reset) setProducts(newItems);
      else setProducts(prev => [...prev, ...newItems]);
      
      setNextCursor(data.next_cursor || null);
    } catch (err: any) {
      console.error("Fetch Error:", err);
      setError(err.message || "Failed to load products. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(true);
  }, [category]);

  const lastElementRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && nextCursor) fetchProducts();
    });
    
    if (node) observer.current.observe(node);
  }, [loading, nextCursor, category]);

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans selection:bg-blue-200 flex flex-col">
      <Navbar category={category} setCategory={setCategory} categories={CATEGORIES} />

      <main className="flex-1 max-w-6xl mx-auto px-4 pt-32 pb-20 w-full">
        {error && <ErrorState error={error} onRetry={() => fetchProducts(true)} />}

        {products.length === 0 && !loading && !error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-32 text-slate-500 flex flex-col items-center gap-4">
            <Package className="w-16 h-16 text-slate-200" />
            <p className="text-lg font-medium text-slate-600">No products found for this category.</p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              isLast={index === products.length - 1} 
              lastElementRef={lastElementRef} 
            />
          ))}
        </div>
        
        {loading && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center py-12">
            <div className="bg-white px-6 py-3 rounded-full shadow-sm border border-slate-200 flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
              <span className="text-sm font-medium text-slate-600">Loading more products...</span>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}

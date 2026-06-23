import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Package, Search, Github, Linkedin, Mail, Code2, Heart, AlertCircle, RefreshCcw } from 'lucide-react'

// Types for our API Response
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  created_at: string;
}

interface ApiResponse {
  items: Product[];
  next_cursor: string | null;
}

const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Home', 'Books', 'Toys', 'Sports', 'Food', 'Beauty']

export default function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [nextCursor, setNextCursor] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [category, setCategory] = useState<string>('All')
  
  const observer = useRef<IntersectionObserver | null>(null)

  const fetchProducts = async (reset = false) => {
    try {
      setLoading(true)
      setError(null)
      
      const params = new URLSearchParams()
      if (category !== 'All') {
        params.append('category', category)
      }
      
      const currentCursorToFetch = reset ? null : nextCursor
      if (currentCursorToFetch) {
        params.append('cursor', currentCursorToFetch)
      }

      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'
      const res = await fetch(`${API_BASE}/api/products?${params.toString()}`)
      
      if (!res.ok) {
        throw new Error(`Server responded with status: ${res.status}`)
      }

      const data: ApiResponse = await res.json()
      const newItems = data.items || []
      
      if (reset) {
        setProducts(newItems)
      } else {
        setProducts(prev => [...prev, ...newItems])
      }
      
      setNextCursor(data.next_cursor || null)
    } catch (err: any) {
      console.error("Fetch Error:", err)
      setError(err.message || "Failed to load products. Please check your connection.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts(true)
  }, [category])

  const lastElementRef = useCallback((node: HTMLDivElement) => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && nextCursor) {
        fetchProducts()
      }
    })
    
    if (node) observer.current.observe(node)
  }, [loading, nextCursor, category])

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }


  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans selection:bg-blue-200 flex flex-col">
      {/* Floating Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 p-4 pointer-events-none">
        <motion.header 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="max-w-5xl mx-auto pointer-events-auto bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl"
        >
          <div className="px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 text-white p-2 rounded-xl shadow-lg shadow-blue-500/20">
                <Package className="w-5 h-5" />
              </div>
              <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
                CodeVector Browse
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative group">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="pl-10 pr-8 py-2.5 bg-slate-100/50 hover:bg-slate-100 border border-slate-200/50 rounded-xl text-sm font-medium focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all appearance-none outline-none cursor-pointer shadow-sm"
                >
                  {CATEGORIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            </div>
          </div>
        </motion.header>
      </div>

      {/* Main Grid Content */}
      <main className="flex-1 max-w-6xl mx-auto px-4 pt-32 pb-20 w-full">
        
        {/* Error State UI */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="mb-8 p-6 bg-red-50 border border-red-200 rounded-2xl flex flex-col items-center text-center shadow-lg shadow-red-500/10"
          >
            <div className="bg-red-100 p-3 rounded-full mb-3 text-red-600">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-red-900 mb-2">Oops! Something went wrong.</h2>
            <p className="text-red-700 font-medium mb-5 max-w-md">
              {error}
            </p>
            <button 
              onClick={() => fetchProducts(true)}
              className="flex items-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
            >
              <RefreshCcw className="w-4 h-4" /> Try Again
            </button>
          </motion.div>
        )}

        {products.length === 0 && !loading && !error && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-32 text-slate-500 flex flex-col items-center gap-4"
          >
            <Package className="w-16 h-16 text-slate-200" />
            <p className="text-lg font-medium text-slate-600">No products found for this category.</p>
          </motion.div>
        )}

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {products.map((product, index) => {
              const isLast = index === products.length - 1
              
              return (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  ref={isLast ? lastElementRef : null}
                  className="group bg-white border border-slate-200/60 rounded-2xl p-5 hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-1.5 transition-all duration-500 flex flex-col h-full relative overflow-hidden"
                >
                  {/* Subtle gradient glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-5">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide uppercase bg-blue-50 text-blue-600 ring-1 ring-inset ring-blue-600/10">
                        {product.category}
                      </span>
                      <span className="text-xl font-bold text-slate-900 tracking-tight">
                        ${product.price}
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-slate-800 line-clamp-2 mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    
                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
                      <p className="text-xs font-medium text-slate-400">
                        {new Date(product.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
        
        {loading && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="flex justify-center py-12"
          >
            <div className="bg-white px-6 py-3 rounded-full shadow-sm border border-slate-200 flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
              <span className="text-sm font-medium text-slate-600">Loading more products...</span>
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
            Developed with <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> by 
            <span className="font-bold text-slate-900">Akshit Sharma</span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="https://linkedin.com/in/akshit-sharma31" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <a href="https://github.com/gentleakshit1" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors text-sm font-medium">
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a href="https://leetcode.com/u/AkshitSharma31/" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-orange-50 hover:text-orange-600 transition-colors text-sm font-medium">
              <Code2 className="w-4 h-4" /> LeetCode
            </a>
            <a href="mailto:gentleakshit@gmail.com" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-colors text-sm font-medium">
              <Mail className="w-4 h-4" /> Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

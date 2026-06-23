import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Search, User, Compass } from 'lucide-react';

interface NavbarProps {
  category: string;
  setCategory: (c: string) => void;
  categories: string[];
}

export default function Navbar({ category, setCategory, categories }: NavbarProps) {
  const location = useLocation();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-4 pointer-events-none">
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="max-w-5xl mx-auto pointer-events-auto bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl"
      >
        <div className="px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 text-white p-2 rounded-xl shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Package className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
              CodeVector
            </h1>
          </Link>
          
          <div className="flex items-center gap-4">
            {location.pathname === '/' && (
              <div className="relative group hidden sm:block">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="pl-10 pr-8 py-2.5 bg-slate-100/50 hover:bg-slate-100 border border-slate-200/50 rounded-xl text-sm font-medium focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all appearance-none outline-none cursor-pointer shadow-sm"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            )}
            
            {location.pathname === '/' ? (
              <Link 
                to="/about"
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-blue-600 text-white text-sm font-semibold rounded-xl transition-colors shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">About Me</span>
              </Link>
            ) : (
              <Link 
                to="/"
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-sm font-semibold rounded-xl transition-colors shadow-sm hover:-translate-y-0.5 active:translate-y-0 border border-slate-200/60"
              >
                <Compass className="w-4 h-4" />
                <span className="hidden sm:inline">Browse Products</span>
              </Link>
            )}
          </div>
        </div>
      </motion.header>
    </div>
  );
}

import { motion } from 'framer-motion';
import { Package } from 'lucide-react';

export default function Preloader() {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center"
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="bg-gradient-to-tr from-blue-600 to-indigo-500 text-white p-4 rounded-2xl shadow-xl shadow-blue-500/20 mb-6"
      >
        <Package className="w-8 h-8" />
      </motion.div>
      <h2 className="text-2xl font-bold text-slate-800 tracking-tight mb-2">Loading CodeVector</h2>
      <p className="text-slate-500 font-medium animate-pulse">Initializing components...</p>
    </motion.div>
  );
}

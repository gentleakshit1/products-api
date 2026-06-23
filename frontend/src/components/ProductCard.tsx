import { motion } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  created_at: string;
}

interface ProductCardProps {
  product: Product;
  isLast: boolean;
  lastElementRef: (node: HTMLDivElement) => void;
}

export default function ProductCard({ product, isLast, lastElementRef }: ProductCardProps) {
  return (
    <motion.div
      ref={isLast ? lastElementRef : null}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group bg-white border border-slate-200/60 rounded-2xl p-5 hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-1.5 transition-all duration-500 flex flex-col h-full relative overflow-hidden"
    >
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
  );
}

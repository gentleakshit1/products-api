import { motion } from 'framer-motion';
import { AlertCircle, RefreshCcw } from 'lucide-react';

export default function ErrorState({ error, onRetry }: { error: string, onRetry: () => void }) {
  return (
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
        onClick={onRetry}
        className="flex items-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
      >
        <RefreshCcw className="w-4 h-4" /> Try Again
      </button>
    </motion.div>
  );
}

import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-sm"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center mr-2">
            <i className="fa-solid fa-utensils text-white"></i>
          </div>
          <h1 className="text-xl font-semibold text-gray-800">吃啥好呢</h1>
        </div>
      </div>
    </motion.header>
  );
}
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { mockIngredients, sectionMap } from '@/lib/mockData';

export default function Ingredients() {
  const navigate = useNavigate();
  const location = useLocation();
  const [highlightItem, setHighlightItem] = useState<string | null>(null);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  
  // 从路由state获取高亮食材
  useEffect(() => {
    if (location.state?.highlight) {
      setHighlightItem(location.state.highlight);
      setTimeout(() => setHighlightItem(null), 2000);
    }
  }, [location.state]);

  // 合并相同食材
  const groupedIngredients = mockIngredients.reduce((acc, item) => {
    const key = `${item.name}-${item.unit}`;
    if (!acc[key]) {
      acc[key] = { ...item, amount: 0 };
    }
    acc[key].amount += item.amount;
    return acc;
  }, {} as Record<string, any>);

  // 按区域分组
  const sectionGroups = Object.values(groupedIngredients).reduce((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = [];
    }
    acc[item.section].push(item);
    return acc;
  }, {} as Record<string, any[]>);

  const toggleCheckItem = (name: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-md mx-auto p-4">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-200 mr-2"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <h2 className="text-xl font-semibold">食材采购清单</h2>
        </div>

        <div className="space-y-6">
          {Object.entries(sectionGroups).map(([sectionKey, items]) => {
            const section = sectionMap[sectionKey as keyof typeof sectionMap];
            return (
              <motion.div 
                key={sectionKey}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-lg overflow-hidden ${section.color}`}
              >
                <div className="p-3 flex items-center border-b border-white">
                  <i className={`fa-solid ${section.icon} mr-2`}></i>
                  <h3 className="font-medium">{section.name}</h3>
                </div>
                
                <div className="divide-y divide-white">
                  {items.map((item, index) => (
                    <div 
                      key={index}
                      className={`p-3 flex justify-between items-center ${highlightItem === item.name ? 'bg-yellow-100' : ''}`}
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={!!checkedItems[item.name]}
                          onChange={() => toggleCheckItem(item.name)}
                          className="h-4 w-4 text-orange-500 mr-3"
                        />
                        <span className={`${checkedItems[item.name] ? 'line-through text-gray-500' : ''}`}>
                          {item.name}
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {item.amount}
                        <span className="text-xs text-gray-500 ml-1">{item.unit}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
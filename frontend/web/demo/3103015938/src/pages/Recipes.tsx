import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { mockRecipes } from '@/lib/mockData';

export default function Recipes() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState(mockRecipes);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [longPressedId, setLongPressedId] = useState<string | null>(null);
  const [date, setDate] = useState(new Date());

  const handleCardClick = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const handleLongPress = (id: string) => {
    setLongPressedId(id);
    setShowAlternatives(true);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setRecipes([...mockRecipes].sort(() => Math.random() - 0.5));
      setIsRefreshing(false);
    }, 1000);
  };

  const changeDate = (days: number) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    setDate(newDate);
  };

  const getMealColor = (type: string) => {
    switch (type) {
      case '早餐': return 'bg-yellow-50';
      case '午餐': return 'bg-green-50';
      case '晚餐': return 'bg-purple-50';
      default: return 'bg-white';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-md mx-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <h2 className="text-xl font-semibold">
            {date.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' })}
          </h2>
          <div className="flex space-x-2">
            <button 
              onClick={() => changeDate(-1)}
              className="p-2 rounded-full hover:bg-gray-200"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button 
              onClick={() => changeDate(1)}
              className="p-2 rounded-full hover:bg-gray-200"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>

        <div className="relative">
          <div 
            className="overflow-y-auto space-y-4 pb-4"
            onScroll={(e) => {
              const { scrollTop } = e.currentTarget;
              if (scrollTop < -50 && !isRefreshing) {
                handleRefresh();
              }
            }}
          >
            {isRefreshing && (
              <div className="flex justify-center py-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <i className="fa-solid fa-spinner text-orange-500"></i>
                </motion.div>
              </div>
            )}

            {recipes.map((recipe) => (
              <motion.div
                key={recipe.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`rounded-lg shadow-md overflow-hidden ${getMealColor(recipe.type)}`}
                onClick={() => handleCardClick(recipe.id)}
                onTouchStart={() => {
                  const timer = setTimeout(() => {
                    handleLongPress(recipe.id);
                  }, 500);
                  return () => clearTimeout(timer);
                }}
              >
                <div className="p-4">
                  <div className="flex items-start">
                    <div className="w-20 h-20 rounded-lg overflow-hidden mr-4">
                      <img
                        src={`https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=%24%7BencodeURIComponent%28recipe.imagePrompt%29%7D&sign=1779a7890c520790ad0361db8bf52d27`}
                        alt={recipe.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-medium">{recipe.name}</h3>
                        <span className="text-sm text-gray-500">{recipe.type}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <i className="fa-solid fa-clock text-gray-500 mr-1"></i>
                        <span className="text-sm text-gray-500 mr-3">{recipe.time}</span>
                        <i className="fa-solid fa-signal text-gray-500 mr-1"></i>
                        <span className="text-sm text-gray-500">{recipe.difficulty}</span>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedCard === recipe.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4"
                      >
                        <div className="border-t border-gray-200 pt-3">
                          <h4 className="font-medium mb-2">烹饪步骤</h4>
                          <ol className="list-decimal pl-5 space-y-1">
                            {recipe.steps.map((step, i) => (
                              <li key={i} className="text-sm">{step}</li>
                            ))}
                          </ol>
                        </div>
                        <div className="border-t border-gray-200 pt-3 mt-3">
                          <h4 className="font-medium mb-2">所需食材</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {recipe.ingredients.map((ingredient, i) => (
                              <div 
                                key={i} 
                                className="text-sm hover:text-orange-500 cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate('/ingredients', { state: { highlight: ingredient.name } });
                                }}
                              >
                                {ingredient.name} <span className="text-gray-500">{ingredient.amount}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 替代方案弹窗 */}
      <AnimatePresence>
        {showAlternatives && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowAlternatives(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-lg p-6 w-full max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-medium mb-4">替代方案</h3>
              <div className="space-y-3">
                {mockRecipes
                  .filter(r => r.id !== longPressedId && r.type === recipes.find(r => r.id === longPressedId)?.type)
                  .map(recipe => (
                    <div 
                      key={recipe.id}
                      className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        setRecipes(recipes.map(r => r.id === longPressedId ? recipe : r));
                        setShowAlternatives(false);
                      }}
                    >
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-md overflow-hidden mr-3">
                          <img
                            src={`https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=%24%7BencodeURIComponent%28recipe.imagePrompt%29%7D&sign=1779a7890c520790ad0361db8bf52d27`}
                            alt={recipe.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{recipe.name}</h4>
                          <div className="flex items-center text-sm text-gray-500">
                            <i className="fa-solid fa-clock mr-1"></i>
                            <span>{recipe.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
              <button
                className="mt-4 w-full py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                onClick={() => setShowAlternatives(false)}
              >
                取消
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
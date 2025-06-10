import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';

// Mock数据
const MEAL_COUNT_OPTIONS = [1, 2, 3];
const GROUPING_RULE_OPTIONS = ['按餐次分组', '按食材类型分组', '按烹饪难度分组'];
const NUTRITION_OPTIONS = ['低脂', '高蛋白', '低碳水', '高纤维', '低盐'];

// 默认设置
const DEFAULT_SETTINGS = {
  mealCount: 3,
  groupingRules: ['按餐次分组', '按食材类型分组'],
  nutritionPreferences: ['高蛋白', '高纤维']
};

export default function Settings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [isClearing, setIsClearing] = useState(false);

  // 从localStorage加载设置
  useEffect(() => {
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // 保存设置到localStorage
  useEffect(() => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
  }, [settings]);

  const handleMealCountChange = (count: number) => {
    setSettings({...settings, mealCount: count});
  };

  const handleGroupingRuleToggle = (rule: string) => {
    const newRules = settings.groupingRules.includes(rule)
      ? settings.groupingRules.filter(r => r !== rule)
      : [...settings.groupingRules, rule];
    setSettings({...settings, groupingRules: newRules});
  };

  const handleNutritionToggle = (pref: string) => {
    const newPrefs = settings.nutritionPreferences.includes(pref)
      ? settings.nutritionPreferences.filter(p => p !== pref)
      : [...settings.nutritionPreferences, pref];
    setSettings({...settings, nutritionPreferences: newPrefs});
  };

  const clearUserData = () => {
    setIsClearing(true);
    localStorage.removeItem('userProfile');
    setTimeout(() => {
      setIsClearing(false);
    }, 1000);
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
          <h2 className="text-xl font-semibold">设置</h2>
        </div>

        <div className="space-y-6">
          {/* 默认餐次数设置 */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm p-4"
          >
            <h3 className="font-medium mb-4">默认餐次数</h3>
            <div className="flex justify-between">
              {MEAL_COUNT_OPTIONS.map(count => (
                <label key={count} className="flex items-center">
                  <input
                    type="radio"
                    name="mealCount"
                    checked={settings.mealCount === count}
                    onChange={() => handleMealCountChange(count)}
                    className="h-5 w-5 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="ml-2">{count}餐</span>
                </label>
              ))}
            </div>
          </motion.div>

          {/* 智能分组规则 */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-sm p-4"
          >
            <h3 className="font-medium mb-4">智能分组规则</h3>
            <div className="space-y-3">
              {GROUPING_RULE_OPTIONS.map(rule => (
                <label key={rule} className="flex items-center justify-between">
                  <span>{rule}</span>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      checked={settings.groupingRules.includes(rule)}
                      onChange={() => handleGroupingRuleToggle(rule)}
                      className="sr-only"
                    />
                    <div className={`block w-10 h-6 rounded-full ${settings.groupingRules.includes(rule) ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
                    <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${settings.groupingRules.includes(rule) ? 'transform translate-x-4' : ''}`}></div>
                  </div>
                </label>
              ))}
            </div>
          </motion.div>

          {/* 营养偏好 */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm p-4"
          >
            <h3 className="font-medium mb-4">营养偏好</h3>
            <div className="space-y-3">
              {NUTRITION_OPTIONS.map(pref => (
                <label key={pref} className="flex items-center justify-between">
                  <span>{pref}</span>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      checked={settings.nutritionPreferences.includes(pref)}
                      onChange={() => handleNutritionToggle(pref)}
                      className="sr-only"
                    />
                    <div className={`block w-10 h-6 rounded-full ${settings.nutritionPreferences.includes(pref) ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
                    <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${settings.nutritionPreferences.includes(pref) ? 'transform translate-x-4' : ''}`}></div>
                  </div>
                </label>
              ))}
            </div>
          </motion.div>

          {/* 清除数据按钮 */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm p-4"
          >
            <button
              onClick={clearUserData}
              disabled={isClearing}
              className={`w-full py-3 rounded-md ${isClearing ? 'bg-gray-300' : 'bg-red-100 text-red-600 hover:bg-red-200'}`}
            >
              {isClearing ? (
                <span className="flex items-center justify-center">
                  <i className="fa-solid fa-spinner animate-spin mr-2"></i>
                  清除中...
                </span>
              ) : '清除用户数据'}
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { provinces, tastePreferences, specialPreferences } from '@/lib/mockData';

export default function Home() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    peopleCount: '',
    lazinessLevel: 3,
    region: '',
    tastePreferences: [] as string[],
    specialPreference: '',
    staplePreference: '',
    avoidFoods: [] as string[],
    appetite: 5,
    budget: '',
    timeAvailable: 30
  });
  const [showOptional, setShowOptional] = useState(false);
  const [errors, setErrors] = useState({
    peopleCount: '',
    lazinessLevel: '',
    region: ''
  });

  const validateForm = () => {
    const newErrors = {
      peopleCount: !formData.peopleCount ? '请选择用餐人数' : '',
      lazinessLevel: '',
      region: !formData.region ? '请选择地区' : ''
    };
    setErrors(newErrors);
    return !newErrors.peopleCount && !newErrors.region;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      localStorage.setItem('userProfile', JSON.stringify(formData));
      navigate('/recipes');
    }
  };

  const handleSkip = () => {
    localStorage.setItem('userProfile', JSON.stringify({
      ...formData,
      tastePreferences: [],
      specialPreference: '',
      staplePreference: '',
      avoidFoods: [],
      appetite: 5,
      budget: '',
      timeAvailable: 30
    }));
    navigate('/recipes');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto p-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">创建您的饮食画像</h2>
        
        {/* 必填字段 */}
        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-gray-700 mb-2">用餐人数 *</label>
            <div className="flex space-x-4">
              {['1人', '2人', '3-4人', '5人以上'].map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    name="peopleCount"
                    checked={formData.peopleCount === option}
                    onChange={() => setFormData({...formData, peopleCount: option})}
                    className="h-4 w-4 text-orange-500"
                  />
                  <span className="ml-2">{option}</span>
                </label>
              ))}
            </div>
            {errors.peopleCount && <p className="text-red-500 text-sm mt-1">{errors.peopleCount}</p>}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">懒惰程度 *</label>
            <div className="flex items-center space-x-2">
              <span className="text-sm">不想开火</span>
              <input
                type="range"
                min="1"
                max="5"
                value={formData.lazinessLevel}
                onChange={(e) => setFormData({...formData, lazinessLevel: parseInt(e.target.value)})}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm">就爱做一桌</span>
            </div>
            <div className="text-center text-sm text-gray-500 mt-1">
              当前: {['不想开火', '不想炒菜', '不想折腾一小时', '不想做一桌菜', '就爱做一桌'][formData.lazinessLevel - 1]}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">地区 *</label>
            <select
              value={formData.region}
              onChange={(e) => setFormData({...formData, region: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">选择您的地区</option>
              {provinces.map((province) => (
                <option key={province} value={province}>{province}</option>
              ))}
            </select>
            {errors.region && <p className="text-red-500 text-sm mt-1">{errors.region}</p>}
          </div>
        </div>

        {/* 可选字段折叠按钮 */}
        <button
          onClick={() => setShowOptional(!showOptional)}
          className="w-full py-2 mb-4 text-orange-600 font-medium flex items-center justify-center"
        >
          {showOptional ? '隐藏可选信息' : '显示更多选项'}
          <i className={`fa-solid fa-chevron-${showOptional ? 'up' : 'down'} ml-2`}></i>
        </button>

        {/* 可选字段 */}
        {showOptional && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="space-y-4 mb-8"
          >
            <div>
              <label className="block text-gray-700 mb-2">口味偏好</label>
              <div className="flex flex-wrap gap-2">
                {tastePreferences.map((taste) => (
                  <label key={taste} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.tastePreferences.includes(taste)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({...formData, tastePreferences: [...formData.tastePreferences, taste]});
                        } else {
                          setFormData({...formData, tastePreferences: formData.tastePreferences.filter(t => t !== taste)});
                        }
                      }}
                      className="h-4 w-4 text-orange-500"
                    />
                    <span className="ml-2">{taste}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">特殊偏好</label>
              <select
                value={formData.specialPreference}
                onChange={(e) => setFormData({...formData, specialPreference: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">无特殊偏好</option>
                {specialPreferences.map((pref) => (
                  <option key={pref} value={pref}>{pref}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">主食偏好</label>
              <div className="flex space-x-4">
                {['米饭', '面食', '杂粮', '无偏好'].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="staplePreference"
                      checked={formData.staplePreference === option}
                      onChange={() => setFormData({...formData, staplePreference: option})}
                      className="h-4 w-4 text-orange-500"
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">忌口食材</label>
              <input
                type="text"
                placeholder="用逗号分隔，如: 香菜,芹菜"
                value={formData.avoidFoods.join(',')}
                onChange={(e) => setFormData({...formData, avoidFoods: e.target.value.split(',').map(f => f.trim()).filter(f => f)})}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">食量 (1-10)</label>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.appetite}
                onChange={(e) => setFormData({...formData, appetite: parseInt(e.target.value)})}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-center text-sm text-gray-500 mt-1">
                当前: {formData.appetite}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">价格要求</label>
              <div className="flex space-x-4">
                {['经济', '适中', '高档'].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="budget"
                      checked={formData.budget === option}
                      onChange={() => setFormData({...formData, budget: option})}
                      className="h-4 w-4 text-orange-500"
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">可花费时间 (分钟)</label>
              <input
                type="range"
                min="10"
                max="120"
                step="5"
                value={formData.timeAvailable}
                onChange={(e) => setFormData({...formData, timeAvailable: parseInt(e.target.value)})}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-center text-sm text-gray-500 mt-1">
                当前: {formData.timeAvailable}分钟
              </div>
            </div>
          </motion.div>
        )}

        {/* 按钮组 */}
        <div className="flex space-x-4 mt-8">
          <button
            onClick={handleSkip}
            className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
          >
            跳过
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
          >
            提交
          </button>
        </div>
      </motion.div>
    </div>
  );
}
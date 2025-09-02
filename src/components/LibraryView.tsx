import React, { useState } from 'react';
import { BookOpen, Utensils, Dumbbell, Play, Clock, Star, Filter } from 'lucide-react';

interface LibraryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  category: string;
  type: 'course' | 'recipe' | 'exercise';
}

const LibraryView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'courses' | 'recipes' | 'exercises'>('courses');
  const [filter, setFilter] = useState<string>('all');

  const libraryItems: LibraryItem[] = [
    {
      id: '1',
      title: 'Sleep Optimization Fundamentals',
      description: 'Learn science-backed strategies to improve your sleep quality and duration',
      image: 'https://d64gsuwffb70l.cloudfront.net/68b6e52c75fe6868d2fc32d8_1756816746370_06a620c2.webp',
      duration: '45 min',
      difficulty: 'Beginner',
      rating: 4.8,
      category: 'Sleep',
      type: 'course'
    },
    {
      id: '2',
      title: 'Stress Management Techniques',
      description: 'Practical tools for managing stress in the workplace and daily life',
      image: 'https://d64gsuwffb70l.cloudfront.net/68b6e52c75fe6868d2fc32d8_1756816748265_c4ca6461.webp',
      duration: '30 min',
      difficulty: 'Beginner',
      rating: 4.9,
      category: 'Mental Health',
      type: 'course'
    },
    {
      id: '3',
      title: 'Mediterranean Power Bowl',
      description: 'Nutrient-dense bowl with quinoa, vegetables, and healthy fats',
      image: 'https://d64gsuwffb70l.cloudfront.net/68b6e52c75fe6868d2fc32d8_1756816750083_42b4f873.webp',
      duration: '20 min',
      difficulty: 'Beginner',
      rating: 4.7,
      category: 'Mediterranean',
      type: 'recipe'
    },
    {
      id: '4',
      title: 'Green Goddess Smoothie',
      description: 'Energizing smoothie packed with spinach, avocado, and protein',
      image: 'https://d64gsuwffb70l.cloudfront.net/68b6e52c75fe6868d2fc32d8_1756816751840_625059fc.webp',
      duration: '5 min',
      difficulty: 'Beginner',
      rating: 4.6,
      category: 'Smoothies',
      type: 'recipe'
    },
    {
      id: '5',
      title: 'Morning Yoga Flow',
      description: 'Gentle yoga sequence to start your day with energy and focus',
      image: 'https://d64gsuwffb70l.cloudfront.net/68b6e52c75fe6868d2fc32d8_1756816758631_8cc37e36.webp',
      duration: '15 min',
      difficulty: 'Beginner',
      rating: 4.8,
      category: 'Yoga',
      type: 'exercise'
    },
    {
      id: '6',
      title: 'HIIT Cardio Blast',
      description: 'High-intensity interval training for maximum calorie burn',
      image: 'https://d64gsuwffb70l.cloudfront.net/68b6e52c75fe6868d2fc32d8_1756816760400_6e060979.webp',
      duration: '25 min',
      difficulty: 'Advanced',
      rating: 4.5,
      category: 'Cardio',
      type: 'exercise'
    }
  ];

  const filteredItems = libraryItems.filter(item => {
    if (activeTab === 'courses') return item.type === 'course';
    if (activeTab === 'recipes') return item.type === 'recipe';
    if (activeTab === 'exercises') return item.type === 'exercise';
    return true;
  }).filter(item => {
    if (filter === 'all') return true;
    return item.category.toLowerCase().includes(filter.toLowerCase()) || 
           item.difficulty.toLowerCase() === filter.toLowerCase();
  });

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'courses':
        return <BookOpen className="w-4 h-4" />;
      case 'recipes':
        return <Utensils className="w-4 h-4" />;
      case 'exercises':
        return <Dumbbell className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-700';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-700';
      case 'Advanced':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Wellness Library</h1>
            <p className="text-indigo-100">Courses, recipes, and exercises for your journey</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">50+</div>
            <div className="text-sm text-indigo-100">Resources</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {[
          { key: 'courses', label: 'Courses' },
          { key: 'recipes', label: 'Recipes' },
          { key: 'exercises', label: 'Exercises' }
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as any)}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === key
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {getTabIcon(key)}
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-600" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Categories</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            {activeTab === 'courses' && (
              <>
                <option value="sleep">Sleep</option>
                <option value="mental health">Mental Health</option>
              </>
            )}
            {activeTab === 'recipes' && (
              <>
                <option value="mediterranean">Mediterranean</option>
                <option value="smoothies">Smoothies</option>
              </>
            )}
            {activeTab === 'exercises' && (
              <>
                <option value="yoga">Yoga</option>
                <option value="cardio">Cardio</option>
              </>
            )}
          </select>
        </div>
        
        <div className="text-sm text-gray-600">
          {filteredItems.length} items
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(item.difficulty)}`}>
                  {item.difficulty}
                </span>
              </div>
              <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{item.duration}</span>
              </div>
              {item.type === 'course' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all">
                    <Play className="w-5 h-5 text-indigo-600 ml-1" />
                  </button>
                </div>
              )}
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900 line-clamp-1">{item.title}</h3>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{item.rating}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                  {item.category}
                </span>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
                  {item.type === 'course' ? 'Start Course' : 
                   item.type === 'recipe' ? 'View Recipe' : 'Start Workout'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-2">
            <BookOpen className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No items found</h3>
          <p className="text-gray-600">Try adjusting your filters to see more content.</p>
        </div>
      )}
    </div>
  );
};

export default LibraryView;
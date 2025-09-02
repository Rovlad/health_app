import React from 'react';
import { Heart, Activity, Moon, Brain, Target, Trophy } from 'lucide-react';

interface HealthMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  target: number;
  icon: React.ReactNode;
  color: string;
  trend: 'up' | 'down' | 'stable';
}

const HealthDashboard: React.FC = () => {
  const healthMetrics: HealthMetric[] = [
    {
      id: 'steps',
      name: 'Шаги в день',
      value: 8432,
      unit: 'шагов',
      target: 10000,
      icon: <Activity className="w-5 h-5" />,
      color: 'text-blue-600',
      trend: 'up'
    },
    {
      id: 'sleep',
      name: 'Качество сна',
      value: 7.5,
      unit: 'часов',
      target: 8,
      icon: <Moon className="w-5 h-5" />,
      color: 'text-purple-600',
      trend: 'stable'
    },
    {
      id: 'heart',
      name: 'Пульс',
      value: 72,
      unit: 'уд/мин',
      target: 70,
      icon: <Heart className="w-5 h-5" />,
      color: 'text-red-600',
      trend: 'down'
    },
    {
      id: 'stress',
      name: 'Уровень стресса',
      value: 3,
      unit: '/10',
      target: 2,
      icon: <Brain className="w-5 h-5" />,
      color: 'text-orange-600',
      trend: 'down'
    }
  ];

  const calculateProgress = (value: number, target: number) => {
    return Math.min((value / target) * 100, 100);
  };

  return (
    <div className="space-y-6">
      {/* Health Score Hero */}
      <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-6 overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Оценка здоровья</h2>
              <p className="text-gray-600">Ваше общее благополучие сегодня</p>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">1,247 баллов</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-gray-200"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - 0.78)}`}
                  className="text-green-500"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">78</span>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="text-lg font-semibold text-gray-900 mb-1">Отличный прогресс!</div>
              <div className="text-sm text-gray-600 mb-2">Вы на 22% выше своей базовой линии</div>
              <div className="text-xs text-green-600 font-medium">↗ +5 баллов от вчерашнего</div>
            </div>
          </div>
        </div>
      </div>

      {/* Health Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {healthMetrics.map((metric) => (
          <div key={metric.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg bg-gray-50 ${metric.color}`}>
                {metric.icon}
              </div>
              <div className={`text-xs px-2 py-1 rounded-full ${
                metric.trend === 'up' ? 'bg-green-100 text-green-700' :
                metric.trend === 'down' ? 'bg-red-100 text-red-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {metric.trend === 'up' ? '↗' : metric.trend === 'down' ? '↘' : '→'}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-600">{metric.name}</div>
              <div className="text-lg font-bold text-gray-900">
                {metric.value.toLocaleString()} <span className="text-sm font-normal text-gray-500">{metric.unit}</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    metric.color.includes('blue') ? 'bg-blue-500' :
                    metric.color.includes('purple') ? 'bg-purple-500' :
                    metric.color.includes('red') ? 'bg-red-500' :
                    'bg-orange-500'
                  }`}
                  style={{ width: `${calculateProgress(metric.value, metric.target)}%` }}
                />
              </div>
              
              <div className="text-xs text-gray-500">
                Цель: {metric.target} {metric.unit}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthDashboard;
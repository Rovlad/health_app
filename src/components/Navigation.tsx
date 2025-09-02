import React from 'react';
import { 
  Home, 
  BarChart3, 
  MessageCircle, 
  Trophy, 
  Users, 
  BookOpen, 
  User, 
  Settings,
  Bell
} from 'lucide-react';

interface NavigationProps {
  activeView: string;
  onViewChange: (view: string) => void;
  userRole: 'employee' | 'coach' | 'admin';
}

const Navigation: React.FC<NavigationProps> = ({ activeView, onViewChange, userRole }) => {
  const navigationItems = [
    { id: 'today', label: 'Сегодня', icon: Home },
    { id: 'dashboard', label: 'Панель', icon: BarChart3 },
    { id: 'coaching', label: 'Коучинг', icon: MessageCircle },
    { id: 'challenges', label: 'Вызовы', icon: Trophy },
    { id: 'community', label: 'Сообщество', icon: Users },
    { id: 'library', label: 'Библиотека', icon: BookOpen }
  ];

  const adminItems = [
    { id: 'analytics', label: 'Аналитика', icon: BarChart3 },
    { id: 'users', label: 'Пользователи', icon: User },
    { id: 'settings', label: 'Настройки', icon: Settings }
  ];

  const items = userRole === 'admin' ? [...navigationItems, ...adminItems] : navigationItems;

  return (
    <nav className="bg-white border-r border-gray-200 w-64 min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">H</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">HealthManager</h1>
            <p className="text-xs text-gray-600">Платформа здоровья</p>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <img
            src="https://d64gsuwffb70l.cloudfront.net/68b6e52c75fe6868d2fc32d8_1756816742930_f52fb1f3.webp"
            alt="User"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-900">Иван Иванов</h3>
            <p className="text-xs text-gray-600 capitalize">{userRole}</p>
          </div>
          <button className="p-1 text-gray-400 hover:text-gray-600">
            <Bell className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 py-4">
        <div className="space-y-1 px-3">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Role Switcher */}
      <div className="p-4 border-t border-gray-200">
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Сменить роль
          </p>
          <div className="flex space-x-1">
            {[{role: 'employee', label: 'Сотрудник'}, {role: 'coach', label: 'Коуч'}, {role: 'admin', label: 'Админ'}].map(({role, label}) => (
              <button
                key={role}
                className={`px-2 py-1 text-xs rounded-md transition-colors ${
                  userRole === role
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
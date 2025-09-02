import React, { useState } from 'react';
import { MessageCircle, Calendar, CheckSquare, Star, Send, Paperclip } from 'lucide-react';

interface Coach {
  id: string;
  name: string;
  avatar: string;
  specialties: string[];
  rating: number;
  isOnline: boolean;
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'task' | 'plan';
}

const CoachingHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'tasks' | 'sessions'>('chat');
  const [newMessage, setNewMessage] = useState('');

  const coach: Coach = {
    id: '1',
    name: 'Др. Сара Чен',
    avatar: 'https://d64gsuwffb70l.cloudfront.net/68b6e52c75fe6868d2fc32d8_1756816737257_87aef8bd.webp',
    specialties: ['Питание', 'Контроль веса', 'Уменьшение стресса'],
    rating: 4.9,
    isOnline: true
  };

  const messages: Message[] = [
    {
      id: '1',
      senderId: 'coach',
      content: 'Отличная работа по завершению медитации сегодня! Я заметила, что вы последовательно выполняете свою рутину по управлению стрессом.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      type: 'text'
    },
    {
      id: '2',
      senderId: 'user',
      content: 'Спасибо! Я чувствую себя гораздо более сосредоточенным. Мне стоит увеличить продолжительность?',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      type: 'text'
    },
    {
      id: '3',
      senderId: 'coach',
      content: 'Давайте попробуем 20 минут завтра. Я назначила вам новое дыхательное упражнение для опробования.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      type: 'task'
    }
  ];

  const upcomingSessions = [
    {
      id: '1',
      title: 'Недельная проверка',
      date: 'Завтра, 14:00',
      duration: '30 мин',
      type: 'Видеозвонок'
    },
    {
      id: '2',
      title: 'Групповой семинар по питанию',
      date: 'Пятница, 10:00',
      duration: '60 мин',
      type: 'Групповое занятие'
    }
  ];

  const assignedTasks = [
    {
      id: '1',
      title: 'Попробуйте дыхательную технику 4-7-8',
      description: 'Практикуйте эту технику 5 минут перед сном',
      dueDate: 'Сегодня',
      completed: false,
      points: 15
    },
    {
      id: '2',
      title: 'Записывайте свои приёмы пищи 3 дня',
      description: 'Делайте фотографии и отмечайте размеры порций',
      dueDate: 'На этой неделе',
      completed: true,
      points: 25
    }
  ];

  const sendMessage = () => {
    if (newMessage.trim()) {
      // Handle message sending logic here
      setNewMessage('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Coach Profile Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={coach.avatar}
              alt={coach.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            {coach.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
            )}
          </div>
          
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">{coach.name}</h2>
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(coach.rating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-1 text-sm text-gray-600">{coach.rating}</span>
              </div>
              <span className="text-sm text-green-600 font-medium">Онлайн</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {coach.specialties.map((specialty) => (
                <span
                  key={specialty}
                  className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {[
          { key: 'chat', label: 'Чат', icon: MessageCircle },
          { key: 'tasks', label: 'Задачи', icon: CheckSquare },
          { key: 'sessions', label: 'Сессии', icon: Calendar }
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as 'chat' | 'tasks' | 'sessions')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === key
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'chat' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          {/* Messages */}
          <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.senderId === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    message.senderId === 'user'
                      ? 'bg-blue-600 text-white'
                      : message.type === 'task'
                      ? 'bg-purple-100 text-purple-900 border border-purple-200'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.senderId === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Message Input */}
          <div className="border-t border-gray-100 p-4">
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Paperclip className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Напишите сообщение..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tasks' && (
        <div className="space-y-4">
          {assignedTasks.map((task) => (
            <div
              key={task.id}
              className={`bg-white rounded-xl p-4 border ${
                task.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className={`font-medium ${
                  task.completed ? 'text-green-700 line-through' : 'text-gray-900'
                }`}>
                  {task.title}
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-blue-600">+{task.points} баллов</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    task.completed ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {task.completed ? 'Выполнено' : task.dueDate}
                  </span>
                </div>
              </div>
              <p className={`text-sm ${
                task.completed ? 'text-green-600' : 'text-gray-600'
              }`}>
                {task.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'sessions' && (
        <div className="space-y-4">
          {upcomingSessions.map((session) => (
            <div key={session.id} className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{session.title}</h3>
                  <p className="text-sm text-gray-600">{session.date}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      {session.type}
                    </span>
                    <span className="text-xs text-gray-500">{session.duration}</span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                  Присоединиться
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoachingHub;
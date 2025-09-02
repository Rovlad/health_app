import React, { useState } from 'react';
import { CheckCircle2, Circle, Plus, Zap, Target, Clock } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  type: 'habit' | 'coach' | 'challenge';
}

interface Habit {
  id: string;
  name: string;
  streak: number;
  target: number;
  current: number;
  unit: string;
}

const TodayView: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Записать утренний вес',
      description: 'Отследивайте прогресс к своей цели по весу',
      points: 10,
      completed: false,
      type: 'habit'
    },
    {
      id: '2',
      title: 'Завершить 15-минутную медитацию',
      description: 'Снизьте стресс с помощью направленного дыхательного упражнения',
      points: 15,
      completed: true,
      type: 'coach'
    },
    {
      id: '3',
      title: 'Присоединиться к командному вызову по шагам',
      description: 'Превзойдите вчерашний командный рекорд в 45,000 шагов',
      points: 25,
      completed: false,
      type: 'challenge'
    }
  ]);

  const [habits, setHabits] = useState<Habit[]>([
    { id: '1', name: 'Потребление воды', streak: 7, target: 8, current: 5, unit: 'стаканов' },
    { id: '2', name: 'Шаги', streak: 12, target: 10000, current: 8432, unit: 'шагов' },
    { id: '3', name: 'Сон', streak: 3, target: 8, current: 7.5, unit: 'часов' }
  ]);

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const totalPoints = tasks.filter(t => t.completed).reduce((sum, t) => sum + t.points, 0);
  const potentialPoints = tasks.reduce((sum, t) => sum + t.points, 0);

  return (
    <div className="space-y-6">
      {/* Today's Summary */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">План на сегодня</h2>
            <p className="text-blue-100">3 приоритетных действия для оптимального здоровья</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{totalPoints}</div>
            <div className="text-sm text-blue-100">из {potentialPoints} баллов</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex-1 bg-blue-500 bg-opacity-30 rounded-full h-3">
            <div 
              className="bg-white rounded-full h-3 transition-all duration-300"
              style={{ width: `${(totalPoints / potentialPoints) * 100}%` }}
            />
          </div>
          <div className="flex items-center space-x-1">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">
              {Math.round((totalPoints / potentialPoints) * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* Priority Tasks */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Target className="w-5 h-5 mr-2 text-blue-600" />
          Приоритетные действия
        </h3>
        
        {tasks.map((task) => (
          <div 
            key={task.id}
            className={`bg-white rounded-xl p-4 border transition-all duration-200 ${
              task.completed 
                ? 'border-green-200 bg-green-50' 
                : 'border-gray-200 hover:border-blue-200 hover:shadow-md'
            }`}
          >
            <div className="flex items-start space-x-3">
              <button
                onClick={() => toggleTask(task.id)}
                className={`mt-1 transition-colors ${
                  task.completed 
                    ? 'text-green-600' 
                    : 'text-gray-400 hover:text-blue-600'
                }`}
              >
                {task.completed ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  <Circle className="w-6 h-6" />
                )}
              </button>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className={`font-medium ${
                    task.completed ? 'text-green-700 line-through' : 'text-gray-900'
                  }`}>
                    {task.title}
                  </h4>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.type === 'habit' ? 'bg-blue-100 text-blue-700' :
                      task.type === 'coach' ? 'bg-purple-100 text-purple-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {task.type === 'habit' ? 'привычка' : task.type === 'coach' ? 'коуч' : 'вызов'}
                    </span>
                    <span className="text-sm font-medium text-gray-600">
                      +{task.points} баллов
                    </span>
                  </div>
                </div>
                <p className={`text-sm ${
                  task.completed ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {task.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Habit Tracker */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-green-600" />
          Ежедневные привычки
        </h3>
        
        <div className="grid gap-4">
          {habits.map((habit) => (
            <div key={habit.id} className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="text-lg font-medium text-gray-900">{habit.name}</div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span className="text-sm font-medium text-orange-600">
                      {habit.streak} дней подряд
                    </span>
                  </div>
                </div>
                <button className="p-1 rounded-full hover:bg-gray-100">
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Прогресс</span>
                  <span className="font-medium text-gray-900">
                    {habit.current.toLocaleString()} / {habit.target.toLocaleString()} {habit.unit}
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((habit.current / habit.target) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodayView;
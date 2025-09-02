import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Flag, Star, Users, TrendingUp } from 'lucide-react';

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    isExpert: boolean;
    title?: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: Date;
  topic: string;
  liked: boolean;
}

interface Topic {
  id: string;
  name: string;
  members: number;
  posts: number;
  trending: boolean;
}

const CommunityView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'topics'>('feed');
  
  const topics: Topic[] = [
    { id: '1', name: 'Здоровые рецепты', members: 234, posts: 89, trending: true },
    { id: '2', name: 'Мотивация к фитнесу', members: 189, posts: 156, trending: true },
    { id: '3', name: 'Сон и восстановление', members: 145, posts: 67, trending: false },
    { id: '4', name: 'Управление стрессом', members: 198, posts: 123, trending: false },
    { id: '5', name: 'Йога и осознанность', members: 167, posts: 78, trending: true }
  ];

  const posts: Post[] = [
    {
      id: '1',
      author: {
        name: 'Др. Сара Чен',
        avatar: 'https://d64gsuwffb70l.cloudfront.net/68b6e52c75fe6868d2fc32d8_1756816737257_87aef8bd.webp',
        isExpert: true,
        title: 'Нутрициолог'
      },
      content: 'Начало дня с белком может помочь стабилизировать уровень сахара в крови и снизить тягу к еде в течение дня. Попробуйте добавить греческий йогурт, яйца или белковый смузи в свою утреннюю рутину! 🥚✨',
      image: 'https://d64gsuwffb70l.cloudfront.net/68b6e52c75fe6868d2fc32d8_1756816746370_06a620c2.webp',
      likes: 47,
      comments: 12,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      topic: 'Здоровые рецепты',
      liked: false
    },
    {
      id: '2',
      author: {
        name: 'Алекс Джонсон',
        avatar: 'https://d64gsuwffb70l.cloudfront.net/68b6e52c75fe6868d2fc32d8_1756816738981_82031f9d.webp',
        isExpert: false
      },
      content: 'Только что завершил свой первый забег на 5 км! 🏃‍♂️ Три месяца назад я едва мог бежать 2 минуты. Ключ был в том, чтобы начинать медленно и быть последовательным. Кто-нибудь ещё работает над своими беговыми целями?',
      likes: 23,
      comments: 8,
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      topic: 'Мотивация к фитнесу',
      liked: true
    },
    {
      id: '3',
      author: {
        name: 'Мария Гарсия',
        avatar: 'https://d64gsuwffb70l.cloudfront.net/68b6e52c75fe6868d2fc32d8_1756816740805_5797ce82.webp',
        isExpert: false
      },
      content: 'Приготовила сегодня на обед эту потрясающую чашу-Будда с киноа! Полна питательных веществ и такая яркая. Рецепт в комментариях, если кому-то нужен! 🥗',
      image: 'https://d64gsuwffb70l.cloudfront.net/68b6e52c75fe6868d2fc32d8_1756816748265_c4ca6461.webp',
      likes: 31,
      comments: 15,
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      topic: 'Здоровые рецепты',
      liked: false
    }
  ];

  const toggleLike = (postId: string) => {
    // Handle like toggle logic here
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Сообщество здоровья</h1>
            <p className="text-green-100">Общайтесь, делитесь и вдохновляйте друг друга</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">1.2k</div>
            <div className="text-sm text-green-100">Активные участники</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {[
          { key: 'feed', label: 'Лента сообщества', icon: MessageCircle },
          { key: 'topics', label: 'Темы', icon: Users }
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as 'feed' | 'topics')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === key
                ? 'bg-white text-green-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Community Feed */}
      {activeTab === 'feed' && (
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Post Header */}
              <div className="p-4 flex items-center space-x-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                    {post.author.isExpert && (
                      <div className="flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-xs font-medium">Эксперт</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    {post.author.title && <span>{post.author.title}</span>}
                    <span>•</span>
                    <span>{post.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <span>•</span>
                    <span className="text-green-600 font-medium">{post.topic}</span>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Flag className="w-4 h-4" />
                </button>
              </div>

              {/* Post Content */}
              <div className="px-4 pb-4">
                <p className="text-gray-900 mb-3">{post.content}</p>
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post content"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                )}
              </div>

              {/* Post Actions */}
              <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center space-x-2 text-sm ${
                      post.liked 
                        ? 'text-red-600' 
                        : 'text-gray-600 hover:text-red-600'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${post.liked ? 'fill-current' : ''}`} />
                    <span>{post.likes}</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600">
                    <MessageCircle className="w-5 h-5" />
                    <span>{post.comments}</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-green-600">
                    <Share2 className="w-5 h-5" />
                    <span>Поделиться</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Topics */}
      {activeTab === 'topics' && (
        <div className="grid gap-4 md:grid-cols-2">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{topic.name}</h3>
                    {topic.trending && (
                      <div className="flex items-center space-x-1 px-2 py-1 bg-orange-100 text-orange-700 rounded-full">
                        <TrendingUp className="w-3 h-3" />
                        <span className="text-xs font-medium">Тренд</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{topic.members} участников</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{topic.posts} постов</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium">
                Присоединиться к теме
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityView;
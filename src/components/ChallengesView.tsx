import React, { useState } from 'react';
import { Trophy, Users, Calendar, Target, Medal, Crown } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'personal' | 'team' | 'organization';
  participants: number;
  duration: string;
  progress: number;
  reward: number;
  status: 'active' | 'completed' | 'upcoming';
  endDate: Date;
}

interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  score: number;
  rank: number;
  department: string;
}

const ChallengesView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'leaderboard'>('active');

  const challenges: Challenge[] = [
    {
      id: '1',
      title: '10K Steps Daily',
      description: 'Walk 10,000 steps every day for a week',
      type: 'personal',
      participants: 1,
      duration: '7 days',
      progress: 71,
      reward: 100,
      status: 'active',
      endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      title: 'Team Wellness Sprint',
      description: 'Complete wellness activities as a team',
      type: 'team',
      participants: 8,
      duration: '2 weeks',
      progress: 45,
      reward: 250,
      status: 'active',
      endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
    },
    {
      id: '3',
      title: 'Mindful March',
      description: 'Practice meditation for 30 days',
      type: 'organization',
      participants: 156,
      duration: '30 days',
      progress: 23,
      reward: 500,
      status: 'active',
      endDate: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000)
    }
  ];

  const leaderboard: LeaderboardEntry[] = [
    {
      id: '1',
      name: 'Alex Johnson',
      avatar: 'https://d64gsuwffb70l.cloudfront.net/68b6e52c75fe6868d2fc32d8_1756816738981_82031f9d.webp',
      score: 2847,
      rank: 1,
      department: 'Engineering'
    },
    {
      id: '2',
      name: 'Maria Garcia',
      avatar: 'https://d64gsuwffb70l.cloudfront.net/68b6e52c75fe6868d2fc32d8_1756816740805_5797ce82.webp',
      score: 2691,
      rank: 2,
      department: 'Marketing'
    },
    {
      id: '3',
      name: 'You',
      avatar: 'https://d64gsuwffb70l.cloudfront.net/68b6e52c75fe6868d2fc32d8_1756816742930_f52fb1f3.webp',
      score: 2534,
      rank: 3,
      department: 'Design'
    },
    {
      id: '4',
      name: 'David Kim',
      avatar: 'https://d64gsuwffb70l.cloudfront.net/68b6e52c75fe6868d2fc32d8_1756816737257_87aef8bd.webp',
      score: 2398,
      rank: 4,
      department: 'Sales'
    }
  ];

  const getChallengeIcon = (type: string) => {
    switch (type) {
      case 'personal':
        return <Target className="w-5 h-5" />;
      case 'team':
        return <Users className="w-5 h-5" />;
      case 'organization':
        return <Trophy className="w-5 h-5" />;
      default:
        return <Target className="w-5 h-5" />;
    }
  };

  const getChallengeColor = (type: string) => {
    switch (type) {
      case 'personal':
        return 'text-blue-600 bg-blue-100';
      case 'team':
        return 'text-green-600 bg-green-100';
      case 'organization':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-blue-600 bg-blue-100';
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Medal className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-600">{rank}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Challenges & Competitions</h1>
            <p className="text-purple-100">Compete, achieve, and earn rewards</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">3rd</div>
            <div className="text-sm text-purple-100">Your rank</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {[
          { key: 'active', label: 'Active Challenges', icon: Target },
          { key: 'leaderboard', label: 'Leaderboard', icon: Trophy }
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as any)}
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

      {/* Active Challenges */}
      {activeTab === 'active' && (
        <div className="space-y-4">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getChallengeColor(challenge.type)}`}>
                    {getChallengeIcon(challenge.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{challenge.title}</h3>
                    <p className="text-sm text-gray-600">{challenge.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">+{challenge.reward}</div>
                  <div className="text-xs text-gray-500">points</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium text-gray-900">{challenge.progress}%</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${challenge.progress}%` }}
                  />
                </div>

                <div className="flex justify-between items-center text-sm text-gray-600">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{challenge.participants} participants</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{challenge.duration}</span>
                    </div>
                  </div>
                  <span className="font-medium">
                    Ends {challenge.endDate.toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Leaderboard */}
      {activeTab === 'leaderboard' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-2">This Month's Leaders</h2>
            <p className="text-gray-600">Top performers across all challenges</p>
          </div>
          
          <div className="divide-y divide-gray-100">
            {leaderboard.map((entry) => (
              <div 
                key={entry.id} 
                className={`p-4 flex items-center space-x-4 ${
                  entry.name === 'You' ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-center w-8">
                  {getRankIcon(entry.rank)}
                </div>
                
                <img
                  src={entry.avatar}
                  alt={entry.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className={`font-medium ${
                      entry.name === 'You' ? 'text-blue-900' : 'text-gray-900'
                    }`}>
                      {entry.name}
                    </h3>
                    {entry.name === 'You' && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                        You
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{entry.department}</p>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">
                    {entry.score.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">points</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengesView;
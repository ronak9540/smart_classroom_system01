import React from 'react';
import Icon from '../../../components/AppIcon';

const GamificationPanel = ({ gamificationData }) => {
  const { badges, currentStreak, totalPoints, level, nextLevelPoints, achievements } = gamificationData;

  const progressPercentage = (totalPoints / nextLevelPoints) * 100;

  const getBadgeIcon = (type) => {
    switch (type) {
      case 'attendance': return 'CheckCircle';
      case 'performance': return 'Award';
      case 'participation': return 'Users';
      case 'streak': return 'Flame';
      default: return 'Star';
    }
  };

  const getBadgeColor = (rarity) => {
    switch (rarity) {
      case 'gold': return 'text-yellow-500 bg-yellow-50';
      case 'silver': return 'text-gray-500 bg-gray-50';
      case 'bronze': return 'text-orange-600 bg-orange-50';
      default: return 'text-primary bg-primary/10';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Achievements & Rewards</h3>
        <div className="flex items-center space-x-2">
          <Icon name="Trophy" size={20} color="var(--color-warning)" />
          <span className="text-sm font-medium text-warning">Level {level}</span>
        </div>
      </div>
      <div className="space-y-6">
        {/* Level Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Progress to Level {level + 1}</span>
            <span className="text-text-primary font-medium">{totalPoints} / {nextLevelPoints} XP</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
        </div>
        
        {/* Current Streak */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <Icon name="Flame" size={20} color="white" />
            </div>
            <div>
              <div className="font-semibold text-text-primary">{currentStreak} Day Streak</div>
              <div className="text-sm text-text-secondary">Keep it up!</div>
            </div>
          </div>
          <div className="text-2xl">🔥</div>
        </div>
        
        {/* Badges */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-text-primary">Recent Badges</h4>
          <div className="grid grid-cols-2 gap-3">
            {badges?.slice(0, 4)?.map((badge, index) => (
              <div key={index} className={`p-3 rounded-lg border ${getBadgeColor(badge?.rarity)}`}>
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name={getBadgeIcon(badge?.type)} size={16} />
                  <span className="text-sm font-medium">{badge?.name}</span>
                </div>
                <p className="text-xs opacity-80">{badge?.description}</p>
                <div className="text-xs mt-1 opacity-60">
                  Earned {new Date(badge.earnedDate)?.toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recent Achievements */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-text-primary">Recent Achievements</h4>
          <div className="space-y-2">
            {achievements?.slice(0, 3)?.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 bg-muted rounded">
                <Icon name="Star" size={16} color="var(--color-warning)" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-text-primary">{achievement?.title}</div>
                  <div className="text-xs text-text-secondary">+{achievement?.points} XP</div>
                </div>
                <div className="text-xs text-text-secondary">
                  {new Date(achievement.date)?.toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamificationPanel;
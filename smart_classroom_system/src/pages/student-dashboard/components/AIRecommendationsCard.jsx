import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIRecommendationsCard = ({ recommendations }) => {
  const [activeTab, setActiveTab] = useState('content');

  const tabs = [
    { id: 'content', label: 'Content', icon: 'BookOpen' },
    { id: 'study', label: 'Study Tips', icon: 'Lightbulb' },
    { id: 'resources', label: 'Resources', icon: 'Link' }
  ];

  const getRecommendationIcon = (type) => {
    switch (type) {
      case 'video': return 'Play';
      case 'article': return 'FileText';
      case 'practice': return 'PenTool';
      case 'quiz': return 'HelpCircle';
      default: return 'BookOpen';
    }
  };

  const getRecommendationColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-error bg-error/5';
      case 'medium': return 'border-warning bg-warning/5';
      case 'low': return 'border-success bg-success/5';
      default: return 'border-border bg-muted';
    }
  };

  const filteredRecommendations = recommendations?.filter(rec => rec?.category === activeTab);

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Brain" size={20} color="var(--color-secondary)" />
          <h3 className="text-lg font-semibold text-text-primary">AI Recommendations</h3>
        </div>
        <div className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded-full">
          Personalized
        </div>
      </div>
      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg">
        {tabs?.map((tab) => (
          <Button
            key={tab?.id}
            variant={activeTab === tab?.id ? "default" : "ghost"}
            size="sm"
            iconName={tab?.icon}
            iconPosition="left"
            iconSize={16}
            onClick={() => setActiveTab(tab?.id)}
            className="flex-1"
          >
            {tab?.label}
          </Button>
        ))}
      </div>
      {/* Recommendations */}
      <div className="space-y-3">
        {filteredRecommendations?.length > 0 ? (
          filteredRecommendations?.map((recommendation, index) => (
            <div key={index} className={`p-4 rounded-lg border ${getRecommendationColor(recommendation?.priority)}`}>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={getRecommendationIcon(recommendation?.type)} size={16} color="var(--color-primary)" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-text-primary text-sm">{recommendation?.title}</h4>
                    <div className="flex items-center space-x-2">
                      {recommendation?.priority === 'high' && (
                        <div className="w-2 h-2 bg-error rounded-full" />
                      )}
                      <span className="text-xs text-text-secondary">{recommendation?.estimatedTime}</span>
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary mb-3">{recommendation?.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs px-2 py-1 bg-muted rounded text-text-secondary">
                        {recommendation?.subject}
                      </span>
                      <span className="text-xs text-text-secondary">
                        Match: {recommendation?.matchPercentage}%
                      </span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs">
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-text-secondary">
            <Icon name="Sparkles" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-2" />
            <p>No recommendations available</p>
            <p className="text-xs mt-1">Complete more activities to get personalized suggestions</p>
          </div>
        )}
      </div>
      {filteredRecommendations?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="outline" size="sm" className="w-full">
            View All Recommendations
          </Button>
        </div>
      )}
    </div>
  );
};

export default AIRecommendationsCard;
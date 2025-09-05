import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TeachingQuality = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');

  const qualityMetrics = {
    month: {
      overallRating: 4.3,
      totalRatings: 156,
      ratingDistribution: [
        { stars: 5, count: 68, percentage: 44 },
        { stars: 4, count: 52, percentage: 33 },
        { stars: 3, count: 24, percentage: 15 },
        { stars: 2, count: 8, percentage: 5 },
        { stars: 1, count: 4, percentage: 3 }
      ],
      improvementScore: 8.5,
      trend: 'improving'
    },
    semester: {
      overallRating: 4.1,
      totalRatings: 624,
      ratingDistribution: [
        { stars: 5, count: 250, percentage: 40 },
        { stars: 4, count: 218, percentage: 35 },
        { stars: 3, count: 100, percentage: 16 },
        { stars: 2, count: 37, percentage: 6 },
        { stars: 1, count: 19, percentage: 3 }
      ],
      improvementScore: 7.8,
      trend: 'stable'
    }
  };

  const recentFeedback = [
    {
      id: 1,
      studentName: "Anonymous Student",
      subject: "Data Structures & Algorithms",
      rating: 5,
      comment: "Excellent explanation of complex algorithms. The visual demonstrations really helped me understand the concepts better.",
      date: "2025-01-03",
      helpful: 12,
      categories: ["Clarity", "Examples", "Engagement"]
    },
    {
      id: 2,
      studentName: "Anonymous Student",
      subject: "Database Management Systems",
      rating: 4,
      comment: "Good teaching style, but could use more practical examples. The theoretical concepts are well explained.",
      date: "2025-01-02",
      helpful: 8,
      categories: ["Theory", "Practical"]
    },
    {
      id: 3,
      studentName: "Anonymous Student",
      subject: "Software Engineering",
      rating: 3,
      comment: "The pace is sometimes too fast. Would appreciate more time for questions and clarifications.",
      date: "2025-01-01",
      helpful: 15,
      categories: ["Pace", "Interaction"]
    }
  ];

  const improvementSuggestions = [
    {
      id: 1,
      category: "Engagement",
      suggestion: "Incorporate more interactive polls and Q&A sessions during lectures",
      priority: "high",
      impact: "Increase student participation by 25%",
      effort: "Low"
    },
    {
      id: 2,
      category: "Content Delivery",
      suggestion: "Add more real-world examples and case studies to theoretical concepts",
      priority: "medium",
      impact: "Improve concept retention by 20%",
      effort: "Medium"
    },
    {
      id: 3,
      category: "Assessment",
      suggestion: "Provide more frequent formative assessments and feedback",
      priority: "medium",
      impact: "Better learning outcomes tracking",
      effort: "High"
    }
  ];

  const currentMetrics = qualityMetrics?.[selectedTimeframe];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error bg-error/10 border-error/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < rating ? 'text-warning fill-current' : 'text-border'}
      />
    ));
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Teaching Quality Analytics</h2>
        <div className="flex items-center space-x-2">
          {['month', 'semester']?.map((timeframe) => (
            <Button
              key={timeframe}
              variant={selectedTimeframe === timeframe ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedTimeframe(timeframe)}
            >
              {timeframe?.charAt(0)?.toUpperCase() + timeframe?.slice(1)}
            </Button>
          ))}
        </div>
      </div>
      {/* Overall Rating Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1">
          <div className="bg-primary/5 rounded-lg p-6 border border-primary/20 text-center">
            <div className="text-4xl font-bold text-primary mb-2">{currentMetrics?.overallRating}</div>
            <div className="flex items-center justify-center space-x-1 mb-2">
              {renderStars(Math.round(currentMetrics?.overallRating))}
            </div>
            <p className="text-sm text-text-secondary">Based on {currentMetrics?.totalRatings} ratings</p>
            <div className="mt-4 flex items-center justify-center space-x-2">
              <Icon 
                name={currentMetrics?.trend === 'improving' ? 'TrendingUp' : 'Minus'} 
                size={16} 
                className={currentMetrics?.trend === 'improving' ? 'text-success' : 'text-warning'} 
              />
              <span className={`text-sm ${currentMetrics?.trend === 'improving' ? 'text-success' : 'text-warning'}`}>
                {currentMetrics?.trend === 'improving' ? 'Improving' : 'Stable'}
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-lg font-medium text-text-primary mb-4">Rating Distribution</h3>
          <div className="space-y-3">
            {currentMetrics?.ratingDistribution?.map((rating) => (
              <div key={rating?.stars} className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 w-16">
                  <span className="text-sm text-text-secondary">{rating?.stars}</span>
                  <Icon name="Star" size={14} className="text-warning fill-current" />
                </div>
                <div className="flex-1 bg-border rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${rating?.percentage}%` }}
                  />
                </div>
                <div className="w-16 text-right">
                  <span className="text-sm text-text-secondary">{rating?.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Recent Feedback */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-text-primary">Recent Feedback</h3>
          <Button variant="outline" size="sm" iconName="MessageSquare">
            View All Feedback
          </Button>
        </div>

        <div className="space-y-4">
          {recentFeedback?.map((feedback) => (
            <div key={feedback?.id} className="bg-muted/30 rounded-lg p-4 border border-border/50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    {renderStars(feedback?.rating)}
                  </div>
                  <span className="text-sm text-text-secondary">{feedback?.subject}</span>
                </div>
                <span className="text-sm text-text-secondary">{feedback?.date}</span>
              </div>
              
              <p className="text-text-primary mb-3">{feedback?.comment}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {feedback?.categories?.map((category) => (
                    <span key={category} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                      {category}
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-1 text-sm text-text-secondary">
                  <Icon name="ThumbsUp" size={14} />
                  <span>{feedback?.helpful} helpful</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Improvement Suggestions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-text-primary">AI-Powered Improvement Suggestions</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-sm text-text-secondary">AI Analysis Active</span>
          </div>
        </div>

        <div className="space-y-4">
          {improvementSuggestions?.map((suggestion) => (
            <div key={suggestion?.id} className="bg-muted/30 rounded-lg p-4 border border-border/50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium text-text-primary">{suggestion?.category}</h4>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(suggestion?.priority)}`}>
                      {suggestion?.priority?.charAt(0)?.toUpperCase() + suggestion?.priority?.slice(1)} Priority
                    </span>
                  </div>
                  <p className="text-text-secondary mb-2">{suggestion?.suggestion}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Icon name="Target" size={14} className="text-success" />
                      <span className="text-text-secondary">Impact: {suggestion?.impact}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} className="text-warning" />
                      <span className="text-text-secondary">Effort: {suggestion?.effort}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Button variant="outline" size="sm" iconName="BookOpen">
                    Learn More
                  </Button>
                  <Button variant="default" size="sm" iconName="CheckSquare">
                    Implement
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeachingQuality;
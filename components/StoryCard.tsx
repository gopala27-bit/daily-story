
import React from 'react';
import { Story } from '../types';

interface StoryCardProps {
  story: Story;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
  const formattedDate = new Date(story.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <p className="font-semibold text-slate-800">{story.authorUsername}</p>
        <p className="text-sm text-slate-500">{formattedDate}</p>
      </div>
      <p className="text-slate-600 font-serif leading-relaxed whitespace-pre-wrap">{story.content}</p>
    </div>
  );
};

export default StoryCard;

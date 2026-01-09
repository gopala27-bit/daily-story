
import React from 'react';

interface PromptCardProps {
  prompt: string;
  title?: string;
}

export const PromptCard: React.FC<PromptCardProps> = ({ prompt, title = "Today's Prompt" }) => {
  return (
    <div className="bg-slate-100 border border-slate-200 rounded-lg p-6 text-center">
      <p className="text-sm font-semibold text-slate-500 mb-2">✍️ {title}</p>
      <p className="text-lg font-serif font-medium text-slate-800">"{prompt}"</p>
    </div>
  );
};

export default PromptCard;

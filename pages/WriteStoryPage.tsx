
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PromptCard from '../components/PromptCard';
import { useStories } from '../hooks/useStories';

const WriteStoryPage: React.FC = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { addStory, hasWrittenToday } = useStories();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim().length === 0) return;
    
    setLoading(true);
    try {
      await addStory(content);
      navigate('/home');
    } catch (error) {
      console.error("Failed to publish story", error);
      // You might want to show an error message to the user here
    } finally {
      setLoading(false);
    }
  };

  if (hasWrittenToday) {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-3xl mx-auto text-center bg-white p-12 rounded-lg border border-slate-200 shadow-sm">
                <h1 className="text-3xl font-bold font-serif text-slate-800">You've Written Today's Story</h1>
                <p className="mt-4 text-slate-600">You can only write one story per day. Come back tomorrow to write another.</p>
                <p className="mt-2 text-slate-600">"Today is important. Write it before it becomes a memory."</p>
            </div>
        </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold font-serif text-slate-800">Write Today’s Story</h1>
        </header>
        
        <div className="space-y-6">
          <PromptCard prompt="Describe a small moment that mattered more than it seemed." />
          
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing your story here… Keep it honest. Keep it yours."
              className="w-full h-80 p-4 font-serif text-lg leading-relaxed border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 resize-y"
            />
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-slate-500">
                You can write only <strong>one story per day</strong>.<br /> Make it count.
              </p>
              <button
                type="submit"
                disabled={loading || content.trim().length === 0}
                className="bg-slate-800 text-white font-semibold py-2 px-6 rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Publishing...' : 'Publish Today’s Story'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WriteStoryPage;

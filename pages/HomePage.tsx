
import React from 'react';
import { Link } from 'react-router-dom';
import StoryCard from '../components/StoryCard';
import PromptCard from '../components/PromptCard';
import { useStories } from '../hooks/useStories';

const HomePage: React.FC = () => {
  const { todaysStories, loading } = useStories();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold font-serif text-slate-800">Today’s Stories</h1>
        <p className="mt-2 text-lg text-slate-600">Real people. One story each. Written today.</p>
      </header>

      <div className="max-w-3xl mx-auto space-y-8">
        <PromptCard prompt="What moment today will you remember five years from now?" />

        <div className="border-t border-slate-200 pt-8">
          <p className="text-center text-slate-500 mb-8">
            Every story here was written today.
            <br />
            No likes. No follows. Just words.
          </p>

          {loading ? (
             <div className="text-center text-slate-500">Loading stories...</div>
          ) : todaysStories.length > 0 ? (
            <div className="space-y-6">
              {todaysStories.map(story => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          ) : (
            <div className="text-center bg-white p-12 rounded-lg border border-slate-200">
                <h3 className="text-2xl font-serif text-slate-700">Today is quiet.</h3>
                <p className="text-slate-500 mt-2 mb-4">Be the first to write a story.</p>
                <Link to="/write" className="inline-block bg-slate-800 text-white font-semibold py-2 px-5 rounded-md hover:bg-slate-700 transition-colors">
                    Write Your Story
                </Link>
            </div>
          )}
        </div>
        
        <div className="text-center mt-12 pt-8 border-t border-slate-200">
            <p className="font-serif text-xl text-slate-700 italic">Today matters.</p>
            <p className="font-serif text-xl text-slate-700 italic">Not because it went viral.</p>
            <p className="font-serif text-xl text-slate-700 italic">Not because someone liked it.</p>
            <p className="font-serif text-xl text-slate-700 italic">But because you lived it.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

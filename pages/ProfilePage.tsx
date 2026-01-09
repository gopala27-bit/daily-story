
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useStories } from '../hooks/useStories';
import StoryCard from '../components/StoryCard';
import { Link } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { userStories, loading } = useStories();

  const totalStories = userStories.length;
  // A simple way to calculate "days showed up", more complex logic would be needed for a real app
  const daysWritten = new Set(userStories.map(story => new Date(story.date).toDateString())).size;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto">
        <header className="bg-white p-8 rounded-lg border border-slate-200 shadow-sm mb-8">
          <h1 className="text-3xl font-bold font-serif text-slate-800">Your Story Space</h1>
          <div className="flex space-x-8 mt-4 pt-4 border-t border-slate-200">
            <div>
              <p className="text-sm text-slate-500">Pen Name</p>
              <p className="text-lg font-semibold text-slate-800">{user?.username}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Total stories written</p>
              <p className="text-lg font-semibold text-slate-800">{totalStories}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Days you showed up</p>
              <p className="text-lg font-semibold text-slate-800">{daysWritten}</p>
            </div>
          </div>
        </header>

        <section>
          <h2 className="text-2xl font-bold font-serif text-slate-800 mb-6">Your Daily Stories</h2>
          {loading ? (
            <div className="text-center text-slate-500">Loading your stories...</div>
          ) : userStories.length > 0 ? (
            <div className="space-y-6">
              {userStories.map(story => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          ) : (
             <div className="text-center bg-white p-12 rounded-lg border border-slate-200">
                <h3 className="text-2xl font-serif text-slate-700">You haven’t written a story yet.</h3>
                <p className="text-slate-500 mt-2 mb-4">Today is a good day to start.</p>
                <Link to="/write" className="inline-block bg-slate-800 text-white font-semibold py-2 px-5 rounded-md hover:bg-slate-700 transition-colors">
                    Write Today's Story
                </Link>
            </div>
          )}
        </section>

        <aside className="mt-12 bg-slate-100 border border-slate-200 rounded-lg p-6 text-center">
            <p className="text-slate-600">This is not social media.</p>
            <p className="text-slate-600">No followers. No messages.</p>
            <p className="text-slate-600">Just your stories, day by day.</p>
        </aside>

      </div>
    </div>
  );
};

export default ProfilePage;


import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { Story } from '../types';
import { AuthContext } from './AuthContext';

interface StoryContextType {
  stories: Story[];
  userStories: Story[];
  todaysStories: Story[];
  hasWrittenToday: boolean;
  addStory: (content: string) => Promise<void>;
  loading: boolean;
}

export const StoryContext = createContext<StoryContextType | undefined>(undefined);

// Mock data
const MOCK_STORIES: Story[] = [
  {
    id: 'story-1',
    authorId: 'user-2',
    authorUsername: 'JaneDoe',
    content: 'Today, I saw the most beautiful sunset. The sky was a mix of orange, pink, and purple. It reminded me that even on a normal day, there can be moments of magic. I stood there for a long time, just watching, feeling a sense of peace wash over me. It was a simple moment, but one I will cherish.',
    date: new Date().toISOString(),
  },
  {
    id: 'story-2',
    authorId: 'user-3',
    authorUsername: 'AlexSmith',
    content: 'I finally finished a book I\'ve been reading for months. The ending was so satisfying, and I felt a real sense of accomplishment. It\'s the little victories that count. I spent the rest of the evening thinking about the characters and their journey. It felt like saying goodbye to old friends.',
    date: new Date().toISOString(),
  },
   {
    id: 'story-3',
    authorId: 'user-1',
    authorUsername: 'Storyteller',
    content: 'I took a walk in the park and saw a dog chasing a butterfly. It was such a pure, joyful sight. The dog was so focused, so full of life. It made me smile and forget about my worries for a while. Sometimes, the simplest things bring the most happiness. That moment will stay with me.',
    date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
  }
];

export const StoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  
  const authContext = useContext(AuthContext);
  const user = authContext?.user;

  useEffect(() => {
    // Simulate fetching stories
    setTimeout(() => {
      const storedStories = localStorage.getItem('daily-story-stories');
      if (storedStories) {
        setStories(JSON.parse(storedStories));
      } else {
        setStories(MOCK_STORIES);
        localStorage.setItem('daily-story-stories', JSON.stringify(MOCK_STORIES));
      }
      setLoading(false);
    }, 500);
  }, []);

  const addStory = async (content: string): Promise<void> => {
    if (!user) throw new Error("User not authenticated");
    
    const newStory: Story = {
      id: `story-${Date.now()}`,
      authorId: user.id,
      authorUsername: user.username,
      content,
      date: new Date().toISOString(),
    };

    return new Promise((resolve) => {
        setTimeout(() => {
            const updatedStories = [...stories, newStory];
            setStories(updatedStories);
            localStorage.setItem('daily-story-stories', JSON.stringify(updatedStories));
            resolve();
        }, 500);
    });
  };

  const isToday = (someDate: Date) => {
    const today = new Date();
    return someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear();
  }

  const userStories = stories.filter(s => s.authorId === user?.id).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const todaysStories = stories.filter(s => isToday(new Date(s.date)));
  const hasWrittenToday = userStories.some(s => isToday(new Date(s.date)));

  return (
    <StoryContext.Provider value={{ stories, userStories, todaysStories, hasWrittenToday, addStory, loading }}>
      {children}
    </StoryContext.Provider>
  );
};


import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { Story } from '../types';
import { AuthContext } from './AuthContext';
import { db } from '../services/db';

interface StoryContextType {
  stories: Story[];
  userStories: Story[];
  todaysStories: Story[];
  hasWrittenToday: boolean;
  addStory: (content: string) => Promise<void>;
  loading: boolean;
}

export const StoryContext = createContext<StoryContextType | undefined>(undefined);

export const StoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  
  const authContext = useContext(AuthContext);
  const user = authContext?.user;

  useEffect(() => {
    const fetchStories = async () => {
      setLoading(true);
      try {
        const fetchedStories = await db.getStories();
        setStories(fetchedStories);
      } catch (error) {
        console.error("Failed to fetch stories", error);
        // Optionally set an error state here
      } finally {
        setLoading(false);
      }
    };
    
    fetchStories();
  }, []);

  const addStory = async (content: string): Promise<void> => {
    if (!user) throw new Error("User not authenticated");
    
    const newStoryData = {
      authorId: user.id,
      authorUsername: user.username,
      content,
      date: new Date().toISOString(),
    };

    const newStory = await db.createStory(newStoryData);
    setStories(prevStories => [...prevStories, newStory]);
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

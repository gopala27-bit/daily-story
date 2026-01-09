
import { User, Story } from '../types';

// --- MOCK DATA SEED ---
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

const MOCK_USERS: User[] = [
    { id: 'user-1', username: 'Storyteller', email: 'storyteller@example.com' },
    { id: 'user-2', username: 'JaneDoe', email: 'jane@example.com' },
    { id: 'user-3', username: 'AlexSmith', email: 'alex@example.com' },
];

const DB_DELAY = 500; // ms to simulate network latency

// --- DB INITIALIZATION ---
const initializeDB = () => {
    if (!localStorage.getItem('daily-story-stories')) {
        localStorage.setItem('daily-story-stories', JSON.stringify(MOCK_STORIES));
    }
    if (!localStorage.getItem('daily-story-users')) {
        localStorage.setItem('daily-story-users', JSON.stringify(MOCK_USERS));
    }
};

initializeDB();

// --- API ---
export const db = {
    async loginUser(email: string, pass: string): Promise<User> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const users: User[] = JSON.parse(localStorage.getItem('daily-story-users') || '[]');
                // NOTE: In a real app, you would check a hashed password.
                const user = users.find(u => u.email === email); 
                if (user) {
                    resolve(user);
                } else {
                    reject(new Error('User not found or password incorrect'));
                }
            }, DB_DELAY);
        });
    },

    async signupUser(username: string, email: string, pass: string): Promise<User> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const users: User[] = JSON.parse(localStorage.getItem('daily-story-users') || '[]');
                if (users.some(u => u.email === email)) {
                    return reject(new Error('Email already in use'));
                }
                const newUser: User = { id: `user-${Date.now()}`, username, email };
                const updatedUsers = [...users, newUser];
                localStorage.setItem('daily-story-users', JSON.stringify(updatedUsers));
                resolve(newUser);
            }, DB_DELAY);
        });
    },

    async getStories(): Promise<Story[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const stories: Story[] = JSON.parse(localStorage.getItem('daily-story-stories') || '[]');
                resolve(stories);
            }, DB_DELAY);
        });
    },

    async createStory(storyData: Omit<Story, 'id'>): Promise<Story> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const stories: Story[] = JSON.parse(localStorage.getItem('daily-story-stories') || '[]');
                const newStory: Story = {
                    ...storyData,
                    id: `story-${Date.now()}`
                };
                const updatedStories = [...stories, newStory];
                localStorage.setItem('daily-story-stories', JSON.stringify(updatedStories));
                resolve(newStory);
            }, DB_DELAY);
        });
    }
};

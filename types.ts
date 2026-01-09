
export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Story {
  id: string;
  authorId: string;
  authorUsername: string;
  content: string;
  date: string; // ISO string format
}

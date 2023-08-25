export interface Post {
  id: number;
  title: string;
  body: string;
  date: string;
  userId: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
}

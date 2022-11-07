export interface Post {
  title: string;
  date: string;
  description: string;
  slug?: string;
  image?: string;
  imageAlt?: string;
}

export interface Note {
  title: string;
  description: string;
  date: string;
  dateRead: string;
  amazon: string;
  image: string;
}

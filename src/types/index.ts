export interface CollectionItem {
  id: string;
  number: string;
  badge: string;
  image: string;
  title: string;
  subtitle?: string;
  collectionName: string;
  description: string;
  carats?: string;
  category: string;
  spanCol?: 'hero-7' | 'tall-5' | 'standard-4';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
}

export type PageRoute = 'home' | 'collections';

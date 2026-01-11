export interface CommonFormType {
  id: number;
  name: string;
  slug: string;
  description_title: string;
  description_keypoints: (string | null)[];
}

export interface Review {
  id: string
  studentName: string
  rating: number
  comment: string
  course: string
  year: number
  date: string
}


export interface FilterOptions {
  search: string
  states: string[]
  streams: string[]
  courses: string[]
  instituteTypes: string[]
  feeRange: [number, number]
  rating: number
  hostel: string[]
  facilities: string[]
  studyMode: string[]
  exams: string[]
  levels: string[]
  degrees: string[]
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
}


// new

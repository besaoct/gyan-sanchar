
export interface Course {
  id: string;
  title: string;
  description: string;
  duration: number; // in years
  fees: {
    min: number;
    max: number;
  };
  mode: (
    | "Regular"
    | "Distance"
    | "Part-time"
    | "Regular / Distance / Part-time"
    | "Regular/ Distance"
    | "Regular/part-time"
  )[];
  level: "Bachelors" | "Masters" | "Phd";
  image: string;
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
  instituteTypes: string[]
  feeRange: [number, number]
  rating: number
  hostel: string[]
  facilities: string[]
  studyMode: string[]
  exams: string[]
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

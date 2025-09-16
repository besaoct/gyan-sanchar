
export interface Course {
  id: string
  name: string
  duration: string
  fees: number
  eligibility: string
  seats: number
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

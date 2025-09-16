export interface College {
  id: string
  name: string
  location: {
    city: string
    state: string
  }
  type: "Government" | "Private" | "Public"
  rating: number
  reviews: number
  fees: {
    min: number
    max: number
  }
  ranking: {
    nirf?: number
    category: string
  }
  image: string
  description: string
  established: number
  accreditation: string[]
  streams: ("Engineering" | "Management" | "Agriculture" | "IT")[]
  courses: Course[]
  facilities: string[]
  hostel: {
    boys: boolean
    girls: boolean
  }
  studyMode: ("Full-time" | "Part-time" | "Distance / Online")[]
  admissionProcess: {
    exams: string[]
    criteria: string
  }
  placement: {
    averagePackage: number
    highestPackage: number
    placementRate: number
    topRecruiters: string[]
  }
  campusLife: {
    studentStrength: number
    facultyRatio: string
    clubs: string[]
  }
  gallery: string[]
  reviews_data: Review[]
}

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

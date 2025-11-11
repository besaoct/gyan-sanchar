export interface College {
  id: string
  name: string
  location: {
    city: string
    state: string
  }
  type: string
  rating: number
  reviews: number
  fees: {
    min: number
    max: number
  }
  ranking: {
    nirf: number
    category: string
  }
  image: string
  short_description: string 
  description: string // rich text editor
  established: number
  accreditation: string[]
  streams: string[]
  courses: {
    id: string
    name: string
    duration: string
    fees: number
    eligibility: string
    seats: number
    highlights: string
  }[]
  facilities: string[]
  hostel: {
    boys: boolean
    girls: boolean
  }
  hostelDetails: string
  campusSize: number
  campusHighlights: string
  visionMission: string
  notableAlumni: { name: string; achievement: string }[]
  additionalFees: {
    hostel: number
    mess: number
  }
  scholarships: { name: string; description: string }[]
  studyMode: string[]
  admissionProcess: {
    exams: string[]
    criteria: string
    applicationFee: number
    importantDates: { event: string; date: string }[]
  }
  placement: {
    averagePackage: number
    highestPackage: number
    placementRate: number
    topRecruiters: string[]
    highlights: string[]
    placementProcess: string
  }
  campusLife: {
    studentStrength: number
    facultyRatio: string
    clubs: string[]
  }
  gallery: string[]
  reviews_data: {
    id: string
    studentName: string
    rating: number
    comment: string
    course: string
    year: number
    date: string
  }[]
}

export const collegesData: College[] = [
  {
    id: "1",
    name: "IIT Madras",
    location: { city: "Chennai", state: "Tamil Nadu" },
    type: "Government",
    rating: 4.8,
    reviews: 9,
    fees: { min: 5000, max: 231000 },
    ranking: { nirf: 1, category: "Engineering" },
    image: "/iit-madras-campus-aerial-view.jpg",
    short_description:
     "IIT Chennai, also known as IIT Madras, is the top-ranked engineering college in India as per NIRF ranking, and the institute also holds a good rank in world university rankings. IIT Chennai is popular for its engineering programmes - B.Tech and M.Tech in various specialisations.",
    description:
      "IIT Chennai, also known as IIT Madras, is the top-ranked engineering college in India as per NIRF ranking, and the institute also holds a good rank in world university rankings. IIT Chennai is popular for its engineering programmes - B.Tech and M.Tech in various specialisations.",
    established: 1959,
    accreditation: ["AICTE", "UGC", "NBA"],
    streams: ["Engineering", "IT"],
    courses: [
      {
        id: "c1",
        name: "B.Tech Computer Science",
        duration: "4 years",
        fees: 200000,
        eligibility: "JEE Advanced",
        seats: 120,
        highlights: "Industry-aligned curriculum with focus on AI, ML, and software engineering.",
      },
      {
        id: "c2",
        name: "M.Tech Data Science",
        duration: "2 years",
        fees: 150000,
        eligibility: "GATE",
        seats: 60,
        highlights: "Advanced training in data analytics, machine learning, and big data technologies.",
      },
    ],
    facilities: ["Library", "Sports Complex", "Wi-Fi", "Medical", "Transportation", "Cafeteria", "Labs", "Auditorium"],
    hostel: { boys: true, girls: true },
    hostelDetails:
      "Modern hostels with Wi-Fi, 24/7 security, recreational areas, and separate facilities for boys and girls.",
    campusSize: 620,
    campusHighlights:
      "Sprawling 620-acre campus with state-of-the-art labs, lush green spaces, and a vibrant student community.",
    visionMission:
      "To create and disseminate knowledge through innovative education and research, fostering global leaders in technology.",
    notableAlumni: [
      { name: "Sundar Pichai", achievement: "CEO of Google" },
      { name: "Anand Rajaraman", achievement: "Co-founder of Kosmix and Venture Partner at Cambrian Ventures" },
    ],
    additionalFees: { hostel: 50000, mess: 30000 },
    scholarships: [
      {
        name: "Merit-cum-Means Scholarship",
        description: "For students with academic excellence and financial need, covering up to 100% of tuition fees.",
      },
      { name: "Institute Scholarship", description: "For top-ranking students, providing partial fee waivers." },
    ],
    studyMode: ["Full-time"],
    admissionProcess: {
      exams: ["JEE Advanced", "GATE"],
      criteria: "Merit-based selection through JEE Advanced for B.Tech and GATE for M.Tech programs",
      applicationFee: 1000,
      importantDates: [
        { event: "Application Start", date: "April 1, 2026" },
        { event: "Application Deadline", date: "May 15, 2026" },
        { event: "Counseling", date: "June 20, 2026" },
      ],
    },
    placement: {
      averagePackage: 1800000,
      highestPackage: 10000000,
      placementRate: 95,
      topRecruiters: ["Google", "Microsoft", "Amazon", "Goldman Sachs", "McKinsey"],
      highlights: [
        "Record-breaking placement offers from top tech firms in 2025.",
        "Over 90% students placed within first month of placement season.",
      ],
      placementProcess:
        "The placement cell organizes campus drives, pre-placement talks, and training sessions to prepare students for interviews and job roles.",
    },
    campusLife: {
      studentStrength: 10000,
      facultyRatio: "1:8",
      clubs: ["Robotics Club", "Cultural Society", "Sports Club", "Literary Society"],
    },
    gallery: [
      "/iit-madras-main-building.jpg",
      "/iit-madras-library.jpg",
      "/iit-madras-hostel.jpg",
      "/iit-madras-sports-complex.jpg",
    ],
    reviews_data: [
      {
        id: "r1",
        studentName: "Rahul Kumar",
        rating: 5,
        comment: "Excellent faculty and infrastructure. Great placement opportunities.",
        course: "B.Tech CSE",
        year: 2023,
        date: "2024-01-15",
      },
      {
        id: "r2",
        studentName: "Priya Sharma",
        rating: 4.5,
        comment: "World-class research facilities and vibrant campus life.",
        course: "M.Tech Data Science",
        year: 2024,
        date: "2024-06-10",
      },
    ],
  },
  {
    id: "2",
    name: "IIT Delhi",
    location: { city: "New Delhi", state: "Delhi" },
    type: "Government",
    rating: 4.7,
    reviews: 12,
    fees: { min: 8000, max: 250000 },
    ranking: { nirf: 2, category: "Engineering" },
    image: "/iit-delhi-campus-main-gate.jpg",
        short_description:
        "IIT Delhi is one of the premier engineering institutions in India, known for its cutting-edge research and excellent academic programs. The institute offers undergraduate, postgraduate, and doctoral programs in various engineering disciplines.",
    description:
      "IIT Delhi is one of the premier engineering institutions in India, known for its cutting-edge research and excellent academic programs. The institute offers undergraduate, postgraduate, and doctoral programs in various engineering disciplines.",
    established: 1961,
    accreditation: ["AICTE", "UGC", "NBA"],
    streams: ["Engineering", "IT"],
    courses: [
      {
        id: "c3",
        name: "B.Tech Mechanical Engineering",
        duration: "4 years",
        fees: 220000,
        eligibility: "JEE Advanced",
        seats: 100,
        highlights: "Hands-on training in robotics, thermodynamics, and manufacturing.",
      },
      {
        id: "c4",
        name: "MBA",
        duration: "2 years",
        fees: 400000,
        eligibility: "CAT",
        seats: 80,
        highlights: "Focus on leadership, strategy, and global business trends.",
      },
    ],
    facilities: ["Library", "Sports Complex", "Wi-Fi", "Medical", "Transportation", "Cafeteria", "Labs", "Auditorium"],
    hostel: { boys: true, girls: true },
    hostelDetails:
      "Well-equipped hostels with modern amenities, including high-speed internet and study rooms.",
    campusSize: 320,
    campusHighlights:
      "A 320-acre campus with advanced research centers, sports facilities, and a vibrant student community.",
    visionMission:
      "To contribute to India and the world through excellence in scientific and technical education and research.",
    notableAlumni: [
      { name: "Vinod Khosla", achievement: "Co-founder of Sun Microsystems" },
      { name: "Chetan Bhagat", achievement: "Renowned Author and Columnist" },
    ],
    additionalFees: { hostel: 60000, mess: 35000 },
    scholarships: [
      {
        name: "IIT Delhi Merit Scholarship",
        description: "For top 10% of students, covering full tuition fees.",
      },
      { name: "Need-Based Financial Aid", description: "For economically disadvantaged students." },
    ],
    studyMode: ["Full-time"],
    admissionProcess: {
      exams: ["JEE Advanced", "CAT", "GATE"],
      criteria: "Merit-based selection through respective entrance examinations",
      applicationFee: 1200,
      importantDates: [
        { event: "Application Start", date: "March 15, 2026" },
        { event: "Application Deadline", date: "April 30, 2026" },
        { event: "Counseling", date: "June 10, 2026" },
      ],
    },
    placement: {
      averagePackage: 1700000,
      highestPackage: 12000000,
      placementRate: 93,
      topRecruiters: ["Microsoft", "Google", "Amazon", "Flipkart", "Uber"],
      highlights: [
        "Consistently high placement rates with top-tier companies.",
        "Strong industry connections for internships and jobs.",
      ],
      placementProcess:
        "Dedicated placement cell conducts workshops, mock interviews, and campus recruitment drives.",
    },
    campusLife: {
      studentStrength: 8500,
      facultyRatio: "1:9",
      clubs: ["Photography Club", "Dance Society", "Debate Club", "Tech Club"],
    },
    gallery: [
      "/iit-delhi-academic-block.jpg",
      "/iit-delhi-student-center.jpg",
      "/iit-delhi-research-lab.jpg",
      "/iit-delhi-campus-green-area.jpg",
    ],
    reviews_data: [
      {
        id: "r2",
        studentName: "Priya Sharma",
        rating: 4,
        comment: "Great academic environment and research opportunities.",
        course: "M.Tech",
        year: 2023,
        date: "2024-02-10",
      },
      {
        id: "r3",
        studentName: "Vikram Singh",
        rating: 4.8,
        comment: "Excellent faculty and vibrant campus culture.",
        course: "B.Tech Mechanical",
        year: 2024,
        date: "2024-07-05",
      },
    ],
  },
  {
    id: "3",
    name: "BITS Pilani",
    location: { city: "Pilani", state: "Rajasthan" },
    type: "Private",
    rating: 4.6,
    reviews: 15,
    fees: { min: 350000, max: 450000 },
    ranking: { nirf: 25, category: "Engineering" },
    image: "/bits-pilani-campus-clocktower.jpg",
        short_description:
     "BITS Pilani, also known as BITS Pilani, is the top-ranked engineering college in India as per NIRF ranking, and the institute also holds a good rank in world university rankings. BITS Pilani is popular for its engineering programmes - B.Tech and M.Tech in various specialisations.",
    description:
      "BITS Pilani is a premier private technological university known for its innovative curriculum and excellent industry connections. The institute offers integrated programs and has a strong alumni network in top companies worldwide.",
    established: 1964,
    accreditation: ["AICTE", "UGC"],
    streams: ["Engineering", "IT"],
    courses: [
      {
        id: "c5",
        name: "B.E. Computer Science",
        duration: "4 years",
        fees: 400000,
        eligibility: "BITSAT",
        seats: 150,
        highlights: "Cutting-edge curriculum with focus on software development and AI.",
      },
      {
        id: "c6",
        name: "M.Sc. Mathematics",
        duration: "2 years",
        fees: 300000,
        eligibility: "BITSAT",
        seats: 40,
        highlights: "Advanced study in pure and applied mathematics with research opportunities.",
      },
    ],
    facilities: ["Library", "Sports Complex", "Wi-Fi", "Medical", "Transportation", "Cafeteria", "Labs"],
    hostel: { boys: true, girls: true },
    hostelDetails:
      "Comfortable hostels with recreational facilities, Wi-Fi, and 24/7 security.",
    campusSize: 328,
    campusHighlights:
      "328-acre campus with modern infrastructure, cultural festivals, and innovation hubs.",
    visionMission:
      "To provide an environment that fosters innovation, creativity, and academic excellence.",
    notableAlumni: [
      { name: "Sabeer Bhatia", achievement: "Co-founder of Hotmail" },
      { name: "Baba Kalyani", achievement: "Chairman of Bharat Forge" },
    ],
    additionalFees: { hostel: 70000, mess: 40000 },
    scholarships: [
      {
        name: "BITS Merit Scholarship",
        description: "For top performers, covering up to 50% of tuition fees.",
      },
      { name: "Alumni Scholarship", description: "Funded by alumni for deserving students." },
    ],
    studyMode: ["Full-time"],
    admissionProcess: {
      exams: ["BITSAT"],
      criteria: "Merit-based selection through BITSAT examination",
      applicationFee: 1500,
      importantDates: [
        { event: "Application Start", date: "January 15, 2026" },
        { event: "Application Deadline", date: "March 31, 2026" },
        { event: "BITSAT Exam", date: "May 20, 2026" },
      ],
    },
    placement: {
      averagePackage: 1500000,
      highestPackage: 8000000,
      placementRate: 90,
      topRecruiters: ["Amazon", "Microsoft", "Goldman Sachs", "Adobe", "Cisco"],
      highlights: [
        "Strong industry partnerships ensure high placement rates.",
        "Multiple internship opportunities during the program.",
      ],
      placementProcess:
        "The placement cell facilitates internships, training, and campus recruitment with top companies.",
    },
    campusLife: {
      studentStrength: 4000,
      facultyRatio: "1:12",
      clubs: ["Music Club", "Drama Club", "Entrepreneurship Cell", "Coding Club"],
    },
    gallery: [
      "/bits-pilani-library-interior.jpg",
      "/bits-pilani-hostel-rooms.jpg",
      "/bits-pilani-auditorium.jpg",
      "/bits-pilani-campus-festival.jpg",
    ],
    reviews_data: [
      {
        id: "r3",
        studentName: "Arjun Patel",
        rating: 5,
        comment: "Amazing campus culture and excellent placement support.",
        course: "B.E. CSE",
        year: 2022,
        date: "2024-01-20",
      },
      {
        id: "r4",
        studentName: "Neha Gupta",
        rating: 4.5,
        comment: "Innovative curriculum and great industry exposure.",
        course: "M.Sc. Mathematics",
        year: 2023,
        date: "2024-05-15",
      },
    ],
  },
  {
    id: "4",
    name: "IIM Ahmedabad",
    location: { city: "Ahmedabad", state: "Gujarat" },
    type: "Government",
    rating: 4.9,
    reviews: 8,
    fees: { min: 2300000, max: 2500000 },
    ranking: { nirf: 1, category: "Management" },
    image: "/placeholder.svg?height=200&width=300",
        short_description:
    "IIM Ahmedabad is the premier management institute in India, known for its rigorous academic programs and exceptional placement records. The institute has produced numerous business leaders and entrepreneurs.",
    description:
      "IIM Ahmedabad is the premier management institute in India, known for its rigorous academic programs and exceptional placement records. The institute has produced numerous business leaders and entrepreneurs.",
    established: 1961,
    accreditation: ["AICTE", "AACSB"],
    streams: ["Management"],
    courses: [
      {
        id: "c7",
        name: "Post Graduate Programme in Management (PGP)",
        duration: "2 years",
        fees: 2500000,
        eligibility: "CAT",
        seats: 395,
        highlights: "Rigorous program with focus on leadership and strategic management.",
      },
      {
        id: "c8",
        name: "Fellow Programme in Management (FPM)",
        duration: "4-5 years",
        fees: 100000,
        eligibility: "CAT/GMAT",
        seats: 30,
        highlights: "Research-oriented program for aspiring academics and researchers.",
      },
    ],
    facilities: ["Library", "Sports Complex", "Wi-Fi", "Medical", "Cafeteria", "Auditorium"],
    hostel: { boys: true, girls: true },
    hostelDetails:
      "Premium hostels with modern amenities, including study rooms and high-speed internet.",
    campusSize: 102,
    campusHighlights:
      "Iconic 102-acre campus designed by Louis Kahn, with world-class academic and recreational facilities.",
    visionMission:
      "To transform lives through innovative management education and thought leadership.",
    notableAlumni: [
      { name: "Raghuram Rajan", achievement: "Former Governor of RBI" },
      { name: "Deepak Parekh", achievement: "Chairman of HDFC" },
    ],
    additionalFees: { hostel: 100000, mess: 50000 },
    scholarships: [
      {
        name: "IIM-A Merit Scholarship",
        description: "For top CAT performers, covering full tuition fees.",
      },
      { name: "Need-Based Scholarship", description: "For students with financial constraints." },
    ],
    studyMode: ["Full-time"],
    admissionProcess: {
      exams: ["CAT"],
      criteria: "CAT score, Academic Performance, Work Experience, and Personal Interview",
      applicationFee: 2000,
      importantDates: [
        { event: "Application Start", date: "August 1, 2025" },
        { event: "Application Deadline", date: "September 15, 2025" },
        { event: "Interview", date: "January 10, 2026" },
      ],
    },
    placement: {
      averagePackage: 3400000,
      highestPackage: 7000000,
      placementRate: 100,
      topRecruiters: ["McKinsey & Company", "Boston Consulting Group", "Bain & Company", "Goldman Sachs", "JP Morgan"],
      highlights: [
        "100% placement rate for the past five years.",
        "Global consulting firms dominate recruitment.",
      ],
      placementProcess:
        "The placement cell organizes cluster-based recruitment with pre-placement offers and final placements.",
    },
    campusLife: {
      studentStrength: 850,
      facultyRatio: "1:6",
      clubs: ["Consulting Club", "Finance Club", "Marketing Club", "Operations Club"],
    },
    gallery: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    reviews_data: [
      {
        id: "r4",
        studentName: "Sneha Gupta",
        rating: 5,
        comment: "World-class faculty and unparalleled learning experience.",
        course: "PGP",
        year: 2023,
        date: "2024-03-05",
      },
      {
        id: "r5",
        studentName: "Rohan Patel",
        rating: 4.8,
        comment: "Exceptional peer group and industry exposure.",
        course: "PGP",
        year: 2024,
        date: "2024-08-20",
      },
    ],
  },
  {
    id: "5",
    name: "Punjab Agricultural University",
    location: { city: "Ludhiana", state: "Punjab" },
    type: "Government",
    rating: 4.3,
    reviews: 6,
    fees: { min: 25000, max: 80000 },
    ranking: { nirf: 3, category: "Agriculture" },
    image: "/placeholder.svg?height=200&width=300",
        short_description:
        "Punjab Agricultural University is a leading agricultural university in India, known for its contributions to the Green Revolution. The university offers comprehensive programs in agriculture, veterinary sciences, and allied fields.",
    description:
      "Punjab Agricultural University is a leading agricultural university in India, known for its contributions to the Green Revolution. The university offers comprehensive programs in agriculture, veterinary sciences, and allied fields.",
    established: 1962,
    accreditation: ["ICAR", "UGC"],
    streams: ["Agriculture"],
    courses: [
      {
        id: "c9",
        name: "B.Sc. Agriculture",
        duration: "4 years",
        fees: 60000,
        eligibility: "Class 12 with PCM/PCB",
        seats: 200,
        highlights: "Practical training in modern farming techniques and agribusiness.",
      },
      {
        id: "c10",
        name: "M.Sc. Agronomy",
        duration: "2 years",
        fees: 40000,
        eligibility: "B.Sc. Agriculture",
        seats: 50,
        highlights: "Advanced study in crop production and soil management.",
      },
    ],
    facilities: ["Library", "Research Farms", "Wi-Fi", "Medical", "Transportation", "Cafeteria", "Labs"],
    hostel: { boys: true, girls: true },
    hostelDetails:
      "Affordable hostels with essential amenities and a focus on student comfort.",
    campusSize: 1510,
    campusHighlights:
      "1510-acre campus with extensive research farms and modern agricultural labs.",
    visionMission:
      "To advance agricultural education and research for sustainable development and food security.",
    notableAlumni: [
      { name: "Dr. Gurdev Khush", achievement: "World Food Prize Laureate" },
      { name: "Dr. Baldev Singh Dhillon", achievement: "Former Vice-Chancellor, PAU" },
    ],
    additionalFees: { hostel: 30000, mess: 25000 },
    scholarships: [
      {
        name: "PAU Merit Scholarship",
        description: "For top-ranking students in entrance exams, covering tuition fees.",
      },
      { name: "Rural Student Scholarship", description: "For students from rural backgrounds." },
    ],
    studyMode: ["Full-time"],
    admissionProcess: {
      exams: ["PAU CET"],
      criteria: "Merit-based selection through entrance examination and academic performance",
      applicationFee: 800,
      importantDates: [
        { event: "Application Start", date: "May 1, 2026" },
        { event: "Application Deadline", date: "June 15, 2026" },
        { event: "Entrance Exam", date: "July 10, 2026" },
      ],
    },
    placement: {
      averagePackage: 400000,
      highestPackage: 1200000,
      placementRate: 75,
      topRecruiters: ["IFFCO", "Mahindra Agri", "Bayer CropScience", "Syngenta", "UPL"],
      highlights: [
        "Strong placements in agribusiness and research organizations.",
        "Growing demand for agriculture graduates in private sector.",
      ],
      placementProcess:
        "The placement cell collaborates with agribusiness firms for campus recruitment and internships.",
    },
    campusLife: {
      studentStrength: 3500,
      facultyRatio: "1:15",
      clubs: ["Agriculture Club", "Environmental Club", "Rural Development Society", "Farmers Club"],
    },
    gallery: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    reviews_data: [
      {
        id: "r5",
        studentName: "Harpreet Singh",
        rating: 4,
        comment: "Great practical exposure and research opportunities in agriculture.",
        course: "B.Sc. Agriculture",
        year: 2022,
        date: "2024-02-28",
      },
      {
        id: "r6",
        studentName: "Manpreet Kaur",
        rating: 4.2,
        comment: "Supportive faculty and excellent field training.",
        course: "M.Sc. Agronomy",
        year: 2023,
        date: "2024-09-01",
      },
    ],
  },
  {
    id: "6",
    name: "IIIT Hyderabad",
    location: { city: "Hyderabad", state: "Telangana" },
    type: "Public",
    rating: 4.5,
    reviews: 11,
    fees: { min: 200000, max: 300000 },
    ranking: { nirf: 15, category: "Engineering" },
    image: "/placeholder.svg?height=200&width=300",
        short_description:
      "IIIT Hyderabad is a premier institute focused on information technology and computer science education. Known for its research-oriented approach and strong industry partnerships, it produces highly skilled IT professionals.",
    description:
      "IIIT Hyderabad is a premier institute focused on information technology and computer science education. Known for its research-oriented approach and strong industry partnerships, it produces highly skilled IT professionals.",
    established: 1998,
    accreditation: ["AICTE", "UGC"],
    streams: ["IT", "Engineering"],
    courses: [
      {
        id: "c11",
        name: "B.Tech Computer Science",
        duration: "4 years",
        fees: 280000,
        eligibility: "JEE Main",
        seats: 120,
        highlights: "Focus on AI, cybersecurity, and software engineering with industry projects.",
      },
      {
        id: "c12",
        name: "M.Tech Artificial Intelligence",
        duration: "2 years",
        fees: 200000,
        eligibility: "GATE",
        seats: 40,
        highlights: "Specialized training in machine learning and AI applications.",
      },
    ],
    facilities: ["Library", "Sports Complex", "Wi-Fi", "Medical", "Cafeteria", "Labs", "Auditorium"],
    hostel: { boys: true, girls: true },
    hostelDetails:
      "Modern hostels with high-speed internet, recreational areas, and secure accommodations.",
    campusSize: 66,
    campusHighlights:
      "Compact 66-acre campus with cutting-edge labs and a focus on technology innovation.",
    visionMission:
      "To be a global leader in IT education and research, fostering innovation and entrepreneurship.",
    notableAlumni: [
      { name: "Kris Gopalakrishnan", achievement: "Co-founder of Infosys" },
      { name: "Srini Raju", achievement: "Founder of iLabs" },
    ],
    additionalFees: { hostel: 65000, mess: 35000 },
    scholarships: [
      {
        name: "IIIT-H Merit Scholarship",
        description: "For top JEE Main performers, covering 50% of tuition fees.",
      },
      { name: "Financial Assistance Program", description: "For economically weaker students." },
    ],
    studyMode: ["Full-time"],
    admissionProcess: {
      exams: ["JEE Main", "GATE"],
      criteria: "Merit-based selection through JEE Main for B.Tech and GATE for M.Tech",
      applicationFee: 1300,
      importantDates: [
        { event: "Application Start", date: "February 1, 2026" },
        { event: "Application Deadline", date: "April 10, 2026" },
        { event: "Counseling", date: "June 5, 2026" },
      ],
    },
    placement: {
      averagePackage: 1600000,
      highestPackage: 9000000,
      placementRate: 95,
      topRecruiters: ["Google", "Microsoft", "Amazon", "Facebook", "Adobe"],
      highlights: [
        "High demand for graduates in AI and tech sectors.",
        "Strong alumni network in top tech companies.",
      ],
      placementProcess:
        "The placement cell organizes hackathons, internships, and campus drives with leading tech firms.",
    },
    campusLife: {
      studentStrength: 2000,
      facultyRatio: "1:10",
      clubs: ["Coding Club", "AI/ML Club", "Robotics Club", "Gaming Club"],
    },
    gallery: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    reviews_data: [
      {
        id: "r6",
        studentName: "Ananya Reddy",
        rating: 5,
        comment: "Excellent research opportunities and industry exposure.",
        course: "B.Tech CSE",
        year: 2023,
        date: "2024-01-12",
      },
      {
        id: "r7",
        studentName: "Sai Krishna",
        rating: 4.7,
        comment: "Top-notch faculty and cutting-edge labs.",
        course: "M.Tech AI",
        year: 2024,
        date: "2024-07-25",
      },
    ],
  },
]

export const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
]

export const streams = ["Engineering", "Management", "Agriculture", "IT"]

export const exams = [
  "JEE Main",
  "JEE Advanced",
  "GATE",
  "CAT",
  "BITSAT",
  "VITEEE",
  "SRMJEEE",
  "COMEDK",
  "MHT CET",
  "KCET",
  "EAMCET",
  "WBJEE",
  "OJEE",
  "GUJCET",
  "UPSEE",
]

export const facilities = [
  "Library",
  "Sports Complex",
  "Wi-Fi",
  "Medical",
  "Transportation",
  "Cafeteria",
  "Labs",
  "Auditorium",
]
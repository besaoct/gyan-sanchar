import { College } from "./colleges-data";

export interface CourseDetails {
  slug: string;
  basicInfo: BasicInfo;
  overview: Overview;
  eligibility: Eligibility;
  syllabus: Syllabus;
  colleges_offering: CollegesOffering;
  careerProspects: CareerProspects;
  faqs: Faq[];
}


export interface BasicInfo {
  courseName: string;
  courseType: string;
  duration: string;
  mode: string;
  affiliatedUniversity: string;
  offeredBy: string;
  accreditation: string[];
  averageFees: string;
  averageSalary: string;
  level: string;
  heroImage: string;
}

export interface Overview {
  introduction: string;
  highlights: string[];
}

export interface Eligibility {
  criteria: string[];
  entranceExamsAccepted: string[];
  ageLimit: string;
}

export interface SyllabusSubject {
  name: string;
  description: string;
  outcome: string;
}

export interface SyllabusSemester {
  semester: number;
  title: string;
  description: string;
  subjects: SyllabusSubject[];
}

export interface Syllabus {
  semesterWiseSubjects: SyllabusSemester[];
}

export interface CollegesOffering {
  totalColleges: number;
  colleges: College[];
}

export interface CareerProspects {
  jobRoles: string[];
  recruiters: string[];
  averageSalaryRange: string;
}

export interface Faq {
  question: string;
  answer: string;
}


export const courseDetails: CourseDetails = {
  slug: "btech-computer-science-engineering",
  basicInfo: {
    courseName:
      "Bachelor of Technology (B.Tech) in Computer Science and Engineering",
    courseType: "Undergraduate",
    duration: "4 Years",
    mode: "Full-time",
    affiliatedUniversity: "XYZ University",
    offeredBy: "ABC Institute of Technology",
    accreditation: ["AICTE", "UGC"],
    averageFees: "INR 1,50,000 per year",
    averageSalary: "INR 4.5 LPA",
    level: "Graduate",
    heroImage: "/course/demo.jpg",
  },
  overview: {
    introduction:
      "The B.Tech in Computer Science and Engineering is a four-year undergraduate program designed to provide students with strong foundations in computer science, software development, algorithms, and emerging technologies such as AI, ML, Cloud Computing, and Cybersecurity.",
    highlights: [
      "Focus on programming, data structures, and algorithms.",
      "Industry-oriented curriculum with internships.",
      "Hands-on lab sessions and projects.",
      "Exposure to AI, Machine Learning, Cloud, and Big Data.",
      "Opportunities for research and innovation.",
    ],
  },
  eligibility: {
    criteria: [
      "Candidates must have completed 10+2 with Physics, Chemistry, and Mathematics.",
      "A minimum aggregate score of 50% in 10+2 (relaxation for reserved categories).",
      "Valid scores in entrance exams like JEE Main / State CET / Institute Entrance Test.",
    ],
    entranceExamsAccepted: ["JEE Main", "BITSAT", "VITEEE", "State CET"],
    ageLimit:
      "No specific age limit, but candidates must meet institute guidelines.",
  },

  syllabus: {
    semesterWiseSubjects: [
      {
        semester: 1,
        title: "Semester 1: Foundational Concepts",
        description:
          "This semester lays the groundwork for the entire course, focusing on fundamental sciences and introductory engineering principles.",
        subjects: [
          {
            name: "Engineering Mathematics I",
            description:
              "An introduction to differential calculus, integral calculus, and linear algebra.",
            outcome:
              "Students will be able to solve complex engineering problems using mathematical principles.",
          },
          {
            name: "Engineering Physics",
            description:
              "Covers classical mechanics, electromagnetism, and quantum mechanics.",
            outcome:
              "A strong foundation in physics to understand and apply in engineering disciplines.",
          },
          {
            name: "Basic Electrical Engineering",
            description:
              "Fundamentals of electrical circuits, machines, and measurements.",
            outcome: "Ability to design and analyze basic electrical circuits.",
          },
          {
            name: "Engineering Graphics",
            description:
              "Introduction to engineering drawing and visualization.",
            outcome: "Skills to create and interpret technical drawings.",
          },
          {
            name: "Programming in C",
            description:
              "Learning the basics of programming using the C language.",
            outcome: "Ability to write, debug, and execute C programs.",
          },
        ],
      },
      {
        semester: 2,
        title: "Semester 2: Core Computer Science",
        description:
          "Building upon the first semester, this one introduces core concepts of computer science.",
        subjects: [
          {
            name: "Engineering Mathematics II",
            description:
              "Advanced topics in calculus, differential equations, and complex variables.",
            outcome:
              "Enhanced mathematical skills for solving advanced engineering problems.",
          },
          {
            name: "Data Structures",
            description:
              "Study of fundamental data structures like arrays, linked lists, stacks, queues, trees, and graphs.",
            outcome:
              "Ability to choose and implement appropriate data structures for specific problems.",
          },
          {
            name: "Digital Logic Design",
            description:
              "Understanding of digital systems, logic gates, and combinational and sequential circuits.",
            outcome: "Ability to design and analyze digital circuits.",
          },
          {
            name: "Chemistry",
            description:
              "Covers topics relevant to engineering like materials science and environmental chemistry.",
            outcome:
              "Understanding the chemical properties of materials used in engineering.",
          },

          {
            name: "Communication Skills",
            description:
              "Developing written and verbal communication skills for a professional environment.",
            outcome:
              "Improved ability to communicate effectively in technical and non-technical settings.",
          },
        ],
      },
    ],
  },

  colleges_offering: {
    totalColleges: 20,
    colleges: [
      // Same as colleges-data.ts structure

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
            highlights:
              "Industry-aligned curriculum with focus on AI, ML, and software engineering.",
          },
          {
            id: "c2",
            name: "M.Tech Data Science",
            duration: "2 years",
            fees: 150000,
            eligibility: "GATE",
            seats: 60,
            highlights:
              "Advanced training in data analytics, machine learning, and big data technologies.",
          },
        ],
        facilities: [
          "Library",
          "Sports Complex",
          "Wi-Fi",
          "Medical",
          "Transportation",
          "Cafeteria",
          "Labs",
          "Auditorium",
        ],
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
          {
            name: "Anand Rajaraman",
            achievement:
              "Co-founder of Kosmix and Venture Partner at Cambrian Ventures",
          },
        ],
        additionalFees: { hostel: 50000, mess: 30000 },
        scholarships: [
          {
            name: "Merit-cum-Means Scholarship",
            description:
              "For students with academic excellence and financial need, covering up to 100% of tuition fees.",
          },
          {
            name: "Institute Scholarship",
            description:
              "For top-ranking students, providing partial fee waivers.",
          },
        ],
        studyMode: ["Full-time"],
        admissionProcess: {
          exams: ["JEE Advanced", "GATE"],
          criteria:
            "Merit-based selection through JEE Advanced for B.Tech and GATE for M.Tech programs",
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
          topRecruiters: [
            "Google",
            "Microsoft",
            "Amazon",
            "Goldman Sachs",
            "McKinsey",
          ],
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
          clubs: [
            "Robotics Club",
            "Cultural Society",
            "Sports Club",
            "Literary Society",
          ],
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
            comment:
              "Excellent faculty and infrastructure. Great placement opportunities.",
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
            highlights:
              "Hands-on training in robotics, thermodynamics, and manufacturing.",
          },
          {
            id: "c4",
            name: "MBA",
            duration: "2 years",
            fees: 400000,
            eligibility: "CAT",
            seats: 80,
            highlights:
              "Focus on leadership, strategy, and global business trends.",
          },
        ],
        facilities: [
          "Library",
          "Sports Complex",
          "Wi-Fi",
          "Medical",
          "Transportation",
          "Cafeteria",
          "Labs",
          "Auditorium",
        ],
        hostel: { boys: true, girls: true },
        hostelDetails:
          "Well-equipped hostels with modern amenities, including high-speed internet and study rooms.",
        campusSize: 320,
        campusHighlights:
          "A 320-acre campus with advanced research centers, sports facilities, and a vibrant student community.",
        visionMission:
          "To contribute to India and the world through excellence in scientific and technical education and research.",
        notableAlumni: [
          {
            name: "Vinod Khosla",
            achievement: "Co-founder of Sun Microsystems",
          },
          {
            name: "Chetan Bhagat",
            achievement: "Renowned Author and Columnist",
          },
        ],
        additionalFees: { hostel: 60000, mess: 35000 },
        scholarships: [
          {
            name: "IIT Delhi Merit Scholarship",
            description: "For top 10% of students, covering full tuition fees.",
          },
          {
            name: "Need-Based Financial Aid",
            description: "For economically disadvantaged students.",
          },
        ],
        studyMode: ["Full-time"],
        admissionProcess: {
          exams: ["JEE Advanced", "CAT", "GATE"],
          criteria:
            "Merit-based selection through respective entrance examinations",
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
          clubs: [
            "Photography Club",
            "Dance Society",
            "Debate Club",
            "Tech Club",
          ],
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
    ],
  },

  careerProspects: {
    jobRoles: [
      "Software Developer",
      "Data Scientist",
      "System Analyst",
      "AI/ML Engineer",
      "Cybersecurity Specialist",
      "Cloud Solutions Architect",
    ],
    recruiters: [
      "Google",
      "Microsoft",
      "Amazon",
      "Infosys",
      "TCS",
      "Wipro",
      "Accenture",
    ],
    averageSalaryRange: "INR 3.5 - 10 LPA",
  },

  faqs: [
    {
      question: "What is the average fee for B.Tech CSE?",
      answer:
        "The average fee ranges from INR 1,00,000 to INR 2,50,000 per year depending on the institute.",
    },
    {
      question: "Is there any lateral entry option?",
      answer:
        "Yes, diploma holders can take admission in the second year through lateral entry.",
    },
    {
      question: "Are internships mandatory?",
      answer:
        "Yes, most universities mandate internships in the 7th or 8th semester.",
    },
  ],
};

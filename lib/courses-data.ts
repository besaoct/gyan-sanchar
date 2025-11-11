export interface Course {
  id: string;
  title: string;
  description: string; //rich text description
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

export const coursesData: Course[] = [
  {
    id: "1",
    title: "Bachelor of Technology (B.Tech)",
    description: "A comprehensive undergraduate program in engineering with a focus on practical skills and innovation.",
    duration: 4,
    fees: { min: 400000, max: 1200000 },
    mode: ["Regular"],
    level: "Bachelors",
    image: "b-tech.jpg",
  },
  {
    id: "2",
    title: "Master of Business Administration (MBA)",
    description: "A postgraduate program designed to develop business and management skills for leadership roles.",
    duration: 2,
    fees: { min: 800000, max: 2500000 },
    mode: ["Regular", "Distance"],
    level: "Masters",
    image: "mba.jpg",
  },
  {
    id: "3",
    title: "Bachelor of Science (B.Sc) in Computer Science",
    description: "An undergraduate program focusing on the theoretical and practical aspects of computer science.",
    duration: 3,
    fees: { min: 200000, max: 600000 },
    mode: ["Regular"],
    level: "Bachelors",
    image: "bsc-cs.jpg",
  },
  {
    id: "4",
    title: "Doctor of Philosophy (PhD) in Physics",
    description: "A doctoral program for advanced research in the field of physics.",
    duration: 5,
    fees: { min: 100000, max: 300000 },
    mode: ["Regular"],
    level: "Phd",
    image: "phd-physics.jpg",
  },
  {
    id: "5",
    title: "Bachelor of Arts (BA) in Economics",
    description: "An undergraduate program covering microeconomics, macroeconomics, and other economic theories.",
    duration: 3,
    fees: { min: 100000, max: 400000 },
    mode: ["Regular", "Distance", "Part-time"],
    level: "Bachelors",
    image: "ba-economics.jpg",
  },
  {
    id: "6",
    title: "Master of Technology (M.Tech)",
    description: "A postgraduate program for specialized engineering disciplines.",
    duration: 2,
    fees: { min: 300000, max: 800000 },
    mode: ["Regular/part-time"],
    level: "Masters",
    image: "m-tech.jpg",
  },
];

export const courseLevels: Course["level"][] = ["Bachelors", "Masters", "Phd"];
export const courseModes: Course["mode"] = [
    "Regular",
    "Distance",
    "Part-time",
    "Regular / Distance / Part-time",
    "Regular/ Distance",
    "Regular/part-time",
  ];

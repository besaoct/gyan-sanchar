
export interface AdmissionCollege {
  id: string;
  name: string;
  location: string;
  image: string;
}

export interface AdmissionCourse {
  id: string;
  name: string;
  collegeId: string;
}

export const admissionColleges: AdmissionCollege[] = [
  {
    id: '1',
    name: 'Global University',
    location: 'New York, USA',
    image: '/college/college-1.jpg',
  },
  {
    id: '2',
    name: 'National Institute of Technology',
    location: 'Delhi, India',
    image: '/college/college-2.jpg',
  },
  {
    id: '3',
    name: 'State Engineering College',
    location: 'Mumbai, India',
    image: '/college/college-3.jpg',
  },
  {
    id: '4',
    name: 'City Business School',
    location: 'London, UK',
    image: '/college/college-4.jpg',
  },
];

export const admissionCourses: AdmissionCourse[] = [
  { id: '101', name: 'Computer Science', collegeId: '1' },
  { id: '102', name: 'Business Administration', collegeId: '1' },
  { id: '103', name: 'Mechanical Engineering', collegeId: '1' },
  { id: '201', name: 'Electronics and Communication', collegeId: '2' },
  { id: '202', name: 'Civil Engineering', collegeId: '2' },
  { id: '301', name: 'Information Technology', collegeId: '3' },
  { id: '302', name: 'Chemical Engineering', collegeId: '3' },
  { id: '401', name: 'Finance', collegeId: '4' },
  { id: '402', name: 'Marketing', collegeId: '4' },
  { id: '403', name: 'Human Resources', collegeId: '4' },
];

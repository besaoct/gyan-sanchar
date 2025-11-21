# **README**

## **Project Structure**

The **config** folder contains the **constants** and **urls** files, which store the **base URL** and all **API endpoint URLs** used throughout the project.

The **data** folder is organized into subfolders and files according to the APIs.
Each file contains its respective API logic implemented using **Axios**, with proper **error handling** and **headers**.
The configuration is designed to be **dynamic**, supporting APIs that **require authorization** as well as those that **do not**.

---

## **Base URL**

```bash
https://gitcsdemoserver.online/gyansanchar/public
```

---

**DAY 1:**

## **Authentication APIs**

### **1. Login API**

**Endpoint:**

```bash
/api/v1/auth/login
```

**Request Body:**

```json
{
  "email": "rahul@gmail.com",
  "password": "12345678"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "name": "Rahul",
      "email": "rahul@gmail.com"
    },
    "token": "40|IjI9cT70IyWaIZ3J1POcVdjco3aEziKEr2ezlXGS52132a89",
    "token_type": "Bearer"
  }
}
```

---

### **2. Register API**

**Endpoint:**

```bash
/api/v1/auth/register
```

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "password_confirmation": "123456"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": {
      "id": 4,
      "name": "John Doe",
      "email": "johnd@example.com"
    },
    "token": "41|HyiIPt2XAwt061LXgEsAXD4Uanz3HE9BgBCPxwi20ad4d8ff",
    "token_type": "Bearer"
  }
}
```

**Error (422 Unprocessable Entity):**

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": [
      "The email has already been taken."
    ]
  }
}
```

**Other Error Examples:**

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": ["The email field is required."]
  }
}
```

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": ["The email field is required."],
    "password": [
      "The password field must be at least 6 characters.",
      "The password field confirmation does not match."
    ]
  }
}
```

---

## **College APIs**

### **1. Get All Colleges**

**Endpoint:**

```bash
GET /api/v1/colleges
```

**Response:**

```json
{
  "success": true,
  "message": "Colleges fetched successfully",
  "data": [
    {
      "id": "1",
      "name": "ABC Engineering College",
      "location": {
        "city": "Pune",
        "state": "Maharashtra"
      },
      "type": "Private",
      "rating": 4.2,
      "reviews": 135,
      "fees": {
        "min": 60000,
        "max": 120000
      },
      "ranking": {
        "nirf": 45,
        "category": "Engineering"
      },
      "image": "uploads/campus/abc.jpg",
      "short_description": "A premier institute for engineering.",
      "description": "<p>Full detailed description...</p>",
      "established": 1988,
      "accreditation": ["NAAC A+", "AICTE Approved"],
      "streams": ["Engineering", "Management"],
      "courses": [
        {
          "id": "1",
          "name": null,
          "duration": 3,
          "fees": 0,
          "eligibility": null,
          "seats": 0,
          "highlights": null
        },
        {
          "id": "2",
          "name": null,
          "duration": 2,
          "fees": 0,
          "eligibility": null,
          "seats": 0,
          "highlights": null
        }
      ],
      "facilities": ["Library", "Cafeteria", "Hostel", "Gym"],
      "hostel": {
        "boys": true,
        "girls": true
      },
      "hostelDetails": "Well-furnished hostels with Wi-Fi",
      "campusSize": 25,
      "campusHighlights": "Green campus with modern infrastructure",
      "visionMission": "To promote innovation and excellence.",
      "notableAlumni": [
        {
          "name": "Rajesh Kumar",
          "achievement": "CEO, TechCorp"
        }
      ],
      "additionalFees": {
        "hostel": 30000,
        "mess": 15000
      },
      "scholarships": [
        {
          "name": "Merit Scholarship",
          "description": "For top 10% students"
        }
      ],
      "studyMode": ["Full-time", "Online"],
      "admissionProcess": {
        "exams": ["JEE Main", "MHT-CET"],
        "criteria": "Merit-based",
        "applicationFee": 500,
        "importantDates": [
          {
            "event": "Application Start",
            "date": "2025-01-10"
          },
          {
            "event": "Exam",
            "date": "2025-03-15"
          }
        ]
      },
      "placement": {
        "averagePackage": 600000,
        "highestPackage": 1500000,
        "placementRate": 92,
        "topRecruiters": ["TCS", "Google", "Infosys"],
        "highlights": ["Strong alumni network", "Industry tie-ups"],
        "placementProcess": "Campus interviews followed by tests"
      },
      "campusLife": {
        "studentStrength": 4500,
        "facultyRatio": "1:20",
        "clubs": ["Coding Club", "Sports Club"]
      },
      "gallery": ["uploads/gallery/img1.jpg", "uploads/gallery/img2.jpg"],
      "reviews_data": [
        {
          "id": "101",
          "studentName": "Anjali Sharma",
          "rating": 4.5,
          "comment": "Excellent faculty and infrastructure.",
          "course": "B.Tech CSE",
          "year": 2024,
          "date": "2024-11-01"
        }
      ]
    }
  ]
}
```

---

### **2. Get College by ID**

**Endpoint:**

```bash
GET /api/v1/college/1
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "ABC Engineering College",
    "campus_image": "uploads/campus/abc.jpg",
    "nirf_rank": 45,
    "nirf_category": "Engineering",
    "type": "Private",
    "rating": "4.20",
    "review_count": 135,
    "city": "Pune",
    "state": "Maharashtra",
    "fees_min": "60000.00",
    "fees_max": "120000.00",
    "avg_fees": "90000.00",
    "description": "<p>Full detailed description...</p>",
    "short_description": "A premier institute for engineering.",
    "established_year": 1988,
    "accreditation": ["NAAC A+", "AICTE Approved"],
    "streams": ["Engineering", "Management"],
    "facilities": ["Library", "Cafeteria", "Hostel", "Gym"],
    "hostel_boys": 1,
    "hostel_girls": 1,
    "hostel_details": "Well-furnished hostels with Wi-Fi",
    "campus_size": "25.00",
    "campus_highlights": "Green campus with modern infrastructure",
    "vision_mission": "To promote innovation and excellence.",
    "notable_alumni": [
      {
        "name": "Rajesh Kumar",
        "achievement": "CEO, TechCorp"
      }
    ],
    "additional_fees": {
      "hostel": 30000,
      "mess": 15000
    },
    "scholarships": [
      {
        "name": "Merit Scholarship",
        "description": "For top 10% students"
      }
    ],
    "study_mode": ["Full-time", "Online"],
    "admission_process": {
      "exams": ["JEE Main", "MHT-CET"],
      "criteria": "Merit-based",
      "applicationFee": 500,
      "importantDates": [
        { "event": "Application Start", "date": "2025-01-10" },
        { "event": "Exam", "date": "2025-03-15" }
      ]
    },
    "placement": {
      "averagePackage": 600000,
      "highestPackage": 1500000,
      "placementRate": 92,
      "topRecruiters": ["TCS", "Google", "Infosys"],
      "highlights": ["Strong alumni network", "Industry tie-ups"],
      "placementProcess": "Campus interviews followed by tests"
    },
    "campus_life": {
      "studentStrength": 4500,
      "facultyRatio": "1:20",
      "clubs": ["Coding Club", "Sports Club"]
    },
    "gallery": ["uploads/gallery/img1.jpg", "uploads/gallery/img2.jpg"],
    "created_at": "2025-11-11T11:06:17.000000Z",
    "updated_at": "2025-11-11T11:06:17.000000Z"
  }
}
```

---

## **College Reviews APIs**

### **1. Get Reviews by College ID**

**Endpoint:**

```bash
GET /api/v1/college-reviews/1
```

**Response:**

```json
{
  "success": true,
  "college_id": "1",
  "total_reviews": 2,
  "average_rating": 4.8,
  "data": [
    {
      "id": 102,
      "student_name": "Rahul Kumar",
      "rating": "5.00",
      "comment": "Amazing faculty and placement support!",
      "course": "B.Tech Computer Science",
      "year": 2025,
      "date": "2025-09-20"
    },
    {
      "id": 101,
      "student_name": "Anjali Sharma",
      "rating": "4.50",
      "comment": "Excellent faculty and infrastructure.",
      "course": "B.Tech CSE",
      "year": 2024,
      "date": "2024-11-01"
    }
  ]
}
```

---

### **2. Submit a Review**

**Endpoint:**

```bash
POST /api/v1/college-reviews
```

Add Authorization header (Bearer).

**Request Body:**

```json
{
  "college_id": 1,
  "student_name": "Rahul Kumar",
  "rating": 5,
  "comment": "Amazing faculty and placement support!",
  "course": "B.Tech Computer Science",
  "year": "2025",
  "date": "2025-09-20"

}
```

**Response:**

```json
{
  "success": true,
  "message": "Review submitted successfully.",
  "data": {
    "id": 103,
    "college_id": 1,
    "student_name": "Rahul Kumar",
    "rating": 5,
    "comment": "Amazing faculty and placement support!",
    "course": "B.Tech Computer Science",
    "year": "2025",
    "date": "2025-09-20"
  }
}
```

---

**DAY 2:**
/api/v1/settings [GET]

{
    "success": true,
    "message": "Settings retrieved successfully",
    "data": {
        "id": 1,
        "site_name": "Gyan Sanchar",
        "site_logo": "https://gitcsdemoserver.online/gyansanchar/public/uploads/settings/1762328666_logo.png",
        "site_favicon": "https://gitcsdemoserver.online/gyansanchar/public/uploads/settings/1762328666_favicon.png",
        "meta_title": "Gyan Sanchar Title",
        "meta_description": "Gyan Sanchar Description",
        "contact_email": "gs@gmail.com",
        "contact_phone": "1234567890",
        "address": "test address",
        "facebook": "https://www.facebook.com/",
        "twitter": "https://x.com/?lang=en",
        "instagram": "https://www.instagram.com/",
        "linkedin": "https://www.linkedin.com/",
        "youtube": "https://www.youtube.com/",
        "created_at": "2025-11-04T00:08:53.000000Z",
        "updated_at": "2025-11-05T02:14:26.000000Z"
    }
}

---

/api/v1/articles [GET]

{
    "success": true,
    "data": [
        {
            "id": "2",
            "slug": "ai-and-robotics-revolution-in-2025",
            "title": "AI and Robotics Revolution in 2025",
            "excerpt": "Artificial Intelligence and Robotics are reshaping industries with unprecedented speed.",
            "content": "From automation to healthcare, AI and robotics are transforming the way we live and work. Experts predict massive growth in AI-driven innovations by 2025.",
            "image": "https://gitcsdemoserver.online/gyansanchar/public/images/news/ai_robotics.jpg",
            "author": "Rohan Patel",
            "date": null,
            "category": "Technology",
            "tags": [
                "Engineering",
                "Top Colleges",
                "NIRF"
            ]
        },
        {
            "id": "1",
            "slug": "top-10-engineering-colleges-in-india-2025",
            "title": "Top 10 Engineering Colleges in India 2025",
            "excerpt": "India is home to some of the world's best engineering colleges. This list is curated to help students make informed decisions for their future.",
            "content": "India is home to some of the world's best engineering colleges. Rankings are based on NIRF, academic excellence, faculty-student ratio, infrastructure, and placement records.\r\n\r\n1. IIT Madras\r\n2. IIT Delhi\r\n3. IIT Bombay\r\n4. IIT Kanpur\r\n5. IIT Kharagpur",
            "image": "https://gitcsdemoserver.online/gyansanchar/public/images/news/top_engineering_colleges.jpg",
            "author": "Priya Sharma",
            "date": null,
            "category": "Education",
            "tags": [
                "Engineering",
                "NIRF"
            ]
        }
    ]
}


/api/v1/article/ai-and-robotics-revolution-in-2025 [GET]

{
    "success": true,
    "data": {
        "id": "2",
        "slug": "ai-and-robotics-revolution-in-2025",
        "title": "AI and Robotics Revolution in 2025",
        "excerpt": "Artificial Intelligence and Robotics are reshaping industries with unprecedented speed.",
        "content": "From automation to healthcare, AI and robotics are transforming the way we live and work. Experts predict massive growth in AI-driven innovations by 2025.",
        "image": "https://gitcsdemoserver.online/gyansanchar/public/images/news/ai_robotics.jpg",
        "author": "Rohan Patel",
        "date": null,
        "category": "Technology",
        "tags": [
            "Engineering",
            "Top Colleges",
            "NIRF"
        ]
    }
}

--

/api/v1/courses [GET]

{
    "success": true,
    "message": "Courses fetched successfully",
    "data": [
        {
            "id": "1",
            "slug": "bachelor-of-computer-applications",
            "title": "Bachelor of Computer Applications",
            "description": "<p>Learn fundamentals of IT and software.</p>",
            "duration": 3,
            "fees": {
                "min": 25000,
                "max": 75000
            },
            "mode": [
                "Regular",
                "Distance",
                "Part-time"
            ],
            "level": "Bachelors",
            "image": "https://gitcsdemoserver.online/gyansanchar/public/storage/courses/bca.jpg"
        },
        {
            "id": "2",
            "slug": "mba-in-finance",
            "title": "MBA in Finance",
            "description": "<p>Master's program specializing in finance.</p>",
            "duration": 2,
            "fees": {
                "min": 50000,
                "max": 150000
            },
            "mode": [
                "Regular",
                "Part-time"
            ],
            "level": "Masters",
            "image": "https://gitcsdemoserver.online/gyansanchar/public/storage/courses/mba.jpg"
        },
        {
            "id": "3",
            "slug": "ssdpc-college",
            "title": "SSDPC College",
            "description": "<p>sdgsgdgsdgsgd</p>",
            "duration": 7,
            "fees": {
                "min": 1000,
                "max": 2000
            },
            "mode": [
                "Regular",
                "Part-time"
            ],
            "level": "Bachelors",
            "image": null
        }
    ]
}


api/v1/course/ssdpc-college [GET]

{
    "slug": "ssdpc-college",
    "basicInfo": {
        "courseName": "SSDPC College",
        "courseType": "Bachelors",
        "duration": 7,
        "mode": [
            "Regular",
            "Part-time"
        ],
        "averageFees": "INR 1,500 per year",
        "level": "Bachelors",
        "heroImage": null
    },
    "overview": {
        "introduction": "<p>sdgsgdgsdgsgd</p>",
        "highlights": [
            "dgdgdfg",
            "gdgdfg",
            "gdfgfdg"
        ]
    },
    "colleges_offering": {
        "totalColleges": 1,
        "colleges": [
            {
                "id": 1,
                "name": "ABC Engineering College",
                "location": {
                    "city": "Pune",
                    "state": "Maharashtra"
                },
                "type": "Private",
                "rating": "4.20",
                "reviews": 3,
                "fees": {
                    "min": "60000.00",
                    "max": "120000.00"
                },
                "image": null,
                "description": "<p>Full detailed description...</p>",
                "established": null,
                "accreditation": [
                    "NAAC A+",
                    "AICTE Approved"
                ],
                "reviews_data": [
                    {
                        "id": 101,
                        "studentName": "Anjali Sharma",
                        "rating": 4.5,
                        "comment": "Excellent faculty and infrastructure.",
                        "course": "B.Tech CSE",
                        "year": 2024,
                        "date": "2024-11-01"
                    },
                    {
                        "id": 102,
                        "studentName": "Rahul Kumar",
                        "rating": 5,
                        "comment": "Amazing faculty and placement support!",
                        "course": "B.Tech Computer Science",
                        "year": 2025,
                        "date": "2025-09-20"
                    },
                    {
                        "id": 103,
                        "studentName": "Rahul Kumar",
                        "rating": 5,
                        "comment": "Amazing faculty and placement support!",
                        "course": "B.Tech Computer Science",
                        "year": 2025,
                        "date": "2025-09-20"
                    }
                ]
            }
        ]
    },
    "careerProspects": {
        "jobRoles": [
            "adasdsad",
            "dasdal",
            "dasdsdsa"
        ],
        "recruiters": [
            "fdfsf",
            "fsdfsdfsdf",
            "fsdfsdfsf"
        ],
        "averageSalaryRange": "INR 3.5 - 10 LPA"
    },
    "faqs": []
}


/api/v1/enquiries [post]

{
  "type": "eligibility",
  "name": "Priya Singh",
  "mobile": "9876543222",
  "email": "priya@example.com",
  "interested_online_degree": false,
  "enable_whatsapp_updates": true
}

--

/api/v1/applications [post]

{
    "full_name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+91 1234567890",
    "date_of_birth": "1999-05-15",
    "address": "123, Main Street, Anytown"
}

---

/api/v1/live-consultation [post]

{
  "name": "Rahul Kumar",
  "email": "rahul@example.com",
  "country_code": "+91",
  "mobile": "9876543210",
  "preferred_date": "2025-11-15",
  "preferred_time": "11:00 AM - 12:00 PM",
  "message": "I want to discuss career options in B.Tech CSE."
}
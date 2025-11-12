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

--- Done ---

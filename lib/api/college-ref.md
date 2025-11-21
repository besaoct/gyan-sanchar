# College Reference

## Structure explanation with

- Example JSON response (exactly what the frontend will receive from API)
- Detailed admin panel field mapping (using Laravel + FilamentPHP or custom Blade forms – but written in a way any Laravel backend developer will instantly understand)
- How to store each field in the database (MySQL tables + relationships)
- Recommended form UI components in admin

### 1. Example API Response (JSON)

```json
{
  "slug": "iit-delhi",
  "name": "Indian Institute of Technology Delhi",
  "location": {
    "city": "New Delhi",
    "state": "Delhi"
  },
  "type": "Public",
  "rating": 4.8,
  "reviews": 342,
  "fees": {
    "min": 200000,
    "max": 850000
  },
  "additionalFees": {
    "hostel": 75000,
    "mess": 45000
  },
  "feesStructure": "<table><tr><td>B.Tech</td><td>₹2,20,000</td></tr>...<table>", // HTML from CKEditor/TipTap
  "nirf_ranking": {
    "rank": 2,
    "category": "Engineering"
  },
  "rankings": [
    {
      "ranking_body": "QS World",
      "category": "Engineering",
      "rank": 174,
      "ranking_year": 2025
    }
  ],
  "image": "https://cdn.example.com/colleges/iit-delhi-campus.jpg",
  "short_description": "Premier engineering institute known for excellence in research and placements.",
  "description": "<p>IIT Delhi is one of the top...</p>", // Rich text HTML
  "established": 1961,
  "accreditation": ["NBA", "NAAC A++", "NIRF"],
  "streams": ["Engineering", "Management", "Design", "Sciences"],
  "courses": [
    {
      "id": "1",
      "name": "B.Tech Computer Science",
      "duration": "4 Years",
      "fees": 850000,
      "eligibility": "JEE Advanced",
      "seats": 120,
      "highlights": "100% placement, top recruiters Google, Microsoft"
    }
  ],
  "facilities": ["Wi-Fi", "Central Library", "Sports Complex", "Medical Center"],
  "hostel": {
    "boys": true,
    "girls": true
  },
  "hostelDetails": "<p>13 hostels with AC and non-AC options...</p>",
  "campusSize": 325,
  "campusHighlights": "<ul><li>Olympic-size swimming pool...</li></ul>",
  "visionMission": "<h3>Vision</h3><p>To be a globally...</p>",
  "notableAlumni": [
    { "name": "Vinod Khosla", "achievement": "Co-founder Sun Microsystems" },
    { "name": "Chetan Bhagat", "achievement": "Author & Columnist" }
  ],
  "scholarships": [
    { "name": "Merit-cum-Means Scholarship", "description": "Full tuition waiver + ₹1000/month" }
  ],
  "studyMode": ["Full Time", "Part Time"],
  "admissionProcess": {
    "exams": ["JEE Advanced", "GATE", "CAT"],
    "criteria": "Based on entrance exam rank + interview",
    "applicationFee": 1500,
    "importantDates": [
      { "event": "Application Start", "date": "2025-12-01" },
      { "event": "JEE Advanced", "date": "2025-05-25" }
    ]
  },
  "placement": {
    "averagePackage": 2300000,
    "highestPackage": 20000000,
    "placementRate": 94.5,
    "topRecruiters": ["Google", "Microsoft", "Goldman Sachs", "Bain & Co"],
    "highlights": ["500+ companies visited", "100+ PPOs"],
    "placementProcess": "<ol><li>Registration...</li></ol>"
  },
  "campusLife": {
    "studentStrength": 11000,
    "facultyRatio": "1:12",
    "clubs": ["Robotics Club", "Drama Club", "Literary Society"]
  },
  "gallery": [
    "https://cdn.example.com/gallery/iitd-1.jpg",
    "https://cdn.example.com/gallery/iitd-2.jpg"
  ],
  "reviews_data": [
    {
      "id": "1",
      "studentName": "Rahul Sharma",
      "rating": 5,
      "comment": "Best college for CSE in India!",
      "course": "B.Tech CSE",
      "year": 2024,
      "date": "2025-11-15"
    }
  ],
  "videoReels": [
    {
      "id": "1",
      "type": "youtube",
      "youtubeId": "AbCdEf12345",
      "title": "IIT Delhi Campus Tour 2025",
      "thumbnail": "https://i.ytimg.com/vi/AbCdEf12345/maxresdefault.jpg"
    },
    {
      "id": "2",
      "type": "local",
      "src": "/storage/reels/iitd-fest.mp4",
      "title": "Rendezvous 2024 Highlights",
      "thumbnail": "/storage/reels/thumbs/iitd-fest.jpg"
    }
  ]
}
```

### 2. Database Structure (MySQL + Laravel)

```php
// colleges table
Schema::create('colleges', function (Blueprint $table) {
    $table->id();
    $table->string('slug')->unique();
    $table->string('name');
    $table->string('city');
    $table->string('state');
    $table->string('type'); // Public, Private, Deemed etc
    $table->decimal('rating', 2, 1)->nullable();
    $table->integer('reviews')->default(0);
    
    // Fees
    $table->integer('fees_min');
    $table->integer('fees_max');
    $table->integer('hostel_fee')->nullable();
    $table->integer('mess_fee')->nullable();
    $table->longText('fees_structure')->nullable(); // HTML
    
    // Rankings
    $table->integer('nirf_rank')->nullable();
    $table->string('nirf_category')->nullable();
    
    $table->string('image'); // URL or path
    $table->text('short_description');
    $table->longText('description'); // Rich text HTML
    
    $table->year('established');
    $table->json('accreditation'); // ["NBA", "NAAC"]
    $table->json('streams');
    $table->json('facilities');
    
    $table->boolean('hostel_boys')->default(false);
    $table->boolean('hostel_girls')->default(false);
    $table->longText('hostel_details')->nullable();
    $table->integer('campus_size_acres')->nullable();
    $table->longText('campus_highlights')->nullable();
    $table->longText('vision_mission')->nullable();
    
    $table->json('study_mode');
    
    // Placement
    $table->integer('avg_package')->nullable();
    $table->integer('highest_package')->nullable();
    $table->decimal('placement_rate', 5, 2)->nullable();
    $table->json('top_recruiters')->nullable();
    $table->json('placement_highlights')->nullable();
    $table->longText('placement_process')->nullable();
    
    // Campus Life
    $table->integer('student_strength')->nullable();
    $table->string('faculty_ratio')->nullable(); // "1:12"
    $table->json('clubs')->nullable();
    
    $table->json('gallery');
    
    $table->timestamps();
});
```

#### Separate Related Tables (with foreign key college_id)

```php
// college_rankings
id | college_id | ranking_body | category | rank | year

// courses
id | college_id | name | duration | fees | eligibility | seats | highlights(text)

// notable_alumni
id | college_id | name | achievement

// scholarships
id | college_id | name | description(text)

// admission_exams (pivot)
college_id | exam_name

// admission_important_dates
id | college_id | event | date (date)

// reviews
id | college_id | student_name | rating | comment | course | batch_year | created_at

// college_reels
id | college_id | type (local/youtube) | src | youtube_id | thumbnail | title
```

### 3. Admin Panel Fields (FilamentPHP or Custom Blade)

| Section                  | Field Type in Admin (Filament)                              | Notes / Component                                      |
|--------------------------|-------------------------------------------------------------|--------------------------------------------------------|
| Basic Info               | TextInput, Select (type)                                    | slug auto-generated from name                          |
| Location                 | TextInput (city, state)                                     |                                                        |
| Fees                     | TextInput (min, max, hostel, mess)                          |                                                        |
| Fees Structure           | RichEditor (TipTap / CKEditor)                              | HTML stored directly                                   |
| NIRF Ranking             | TextInput + Select                                          | Optional                                               |
| Other Rankings           | Repeater (ranking_body, category, rank, year)               | + icon to add more                                     |
| Main Image               | FileUpload (single, disk=s3/public)                         |                                                        |
| Short & Full Description | TextInput + RichEditor                                      |                                                        |
| Established              | TextInput (year)                                            |                                                        |
| Accreditation / Streams / Facilities / Study Mode | TagsInput or Repeater                                      | TagsInput is cleaner                                   |
| Courses                  | Repeater (all course fields)                                | Very important – allow add/remove                       |
| Hostel Availability      | Toggle (boys/girls)                                         |                                                        |
| Hostel Details           | RichEditor                                                  |                                                        |
| Campus Size              | TextInput                                                   |                                                        |
| Campus Highlights / Vision & Mission | RichEditor                                     |                                                        |
| Notable Alumni           | Repeater (name, achievement)                                |                                                        |
| Scholarships             | Repeater (name, description)                                |                                                        |
| Admission Process        | - Exams: TagsInput<br>- Criteria: RichEditor<br>- Application Fee<br>- Important Dates: Repeater |                                                        |
| Placement                | All fields + Repeater for recruiters & highlights           |                                                        |
| Campus Life              | Numbers + Repeater for clubs                                |                                                        |
| Gallery                  | FileUpload (multiple, ->multiple())                         |                                                        |
| Video Reels              | Repeater<br> → Select (Local / YouTube)<br> → Conditional: FileUpload OR TextInput (youtubeId)<br> → TextInput title & thumbnail | Critical for good UX                                   |
| Reviews                  | Separate ReviewsResource (approvable)                       | Can be moderated                                              |

### Recommendation for Backend Developer (Laravel)

- Use Spatie MediaLibrary for image, gallery, and video thumbnails
- Use laravel-sluggable for auto slug
- Use TipTap or Filament's built-in RichEditor for all longText HTML fields
- Use Repeater for all multi-entry fields (rankings, courses, alumni, reels, etc.)
- Store all JSON arrays as json columns (accreditation, facilities, etc.)
- Make separate tables + relationships for heavy repeaters (courses, reviews, reels, rankings)

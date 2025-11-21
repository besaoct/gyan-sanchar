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

### 3. Admin Panel → College Resource (FilamentPHP v3 Recommended Structure)

| Section (Collapsible)                  | Exact Field Name (DB/JSON)              | Admin Label (Exactly as you want it displayed)                  | Filament Component & Details                                                                 |
|----------------------------------------|-----------------------------------------|-----------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| **Basic Information**                  | name                                    | Name                                                            | TextInput → required → auto-generate slug                              |
|                                        | slug                                    | Slug                                                            | TextInput → unique → disabled or auto-filled                           |
|                                        | type                                    | Type                                                            | Select → options: Public, Private, Deemed University, Autonomous      |
|                                        | image                                   | Image (Campus Image)                                            | FileUpload → single image → required                                   |
| **Location**                           | location.city                           | City                                                            | TextInput → required                                                   |
|                                        | location.state                          | State                                                           | TextInput → required                                                   |
| **SEO & Description**                  | short_description                       | Short Description                                               | Textarea → max 255 chars → required                                    |
|                                        | description                             | Description                                                     | RichEditor (TipTap/CKEditor) → required → full width                   |
| **General Info**                       | established                             | Established                                                     | TextInput → numeric (year)                                             |
|                                        | campusSize                              | Campus Size (in acres)                                          | TextInput → numeric                                                    |
| **Fees**                               | fees.min                                | Fees → Min                                                      | TextInput → numeric → prefix ₹                                         |
|                                        | fees.max                                | Fees → Max                                                      | TextInput → numeric → prefix ₹                                         |
|                                        | additionalFees.hostel                   | Additional Fees → Hostel                                        | TextInput → numeric → prefix ₹                                         |
|                                        | additionalFees.mess                     | Additional Fees → Mess                                          | TextInput → numeric → prefix ₹                                         |
|                                        | feesStructure                           | Fees Structure                                                  | RichEditor → allow tables, bold, etc.                                  |
| **Rankings**                           | nirf_ranking.rank                       | NIRF Ranking → Rank                                             | TextInput → numeric                                                    |
|                                        | nirf_ranking.category                   | NIRF Ranking → Category                                         | TextInput                                                              |
|                                        | rankings                                | Rankings                                                        | Repeater (+ icon) → fields: ranking_body, category, rank, ranking_year |
| **Accreditations & Streams**           | accreditation                           | Accreditation                                                   | TagsInput or Repeater (+ icon)                                         |
|                                        | streams                                 | Streams                                                         | TagsInput or Repeater (+ icon)                                         |
|                                        | studyMode                               | Study Mode                                                      | TagsInput or Repeater (+ icon)                                         |
| **Courses**                            | courses                                 | Courses                                                         | Repeater (+ icon) → fields: name, duration, fees, eligibility, seats, highlights |
| **Facilities**                         | facilities                              | Facilities                                                      | TagsInput                                                              |
| **Hostel**                             | hostel.boys                             | Hostel → Boys                                                   | Toggle                                                                 |
|                                        | hostel.girls                            | Hostel → Girls                                                  | Toggle                                                                 |
|                                        | hostelDetails                           | Hostel Details                                                  | RichEditor                                                             |
| **Campus**                             | campusHighlights                        | Campus Highlights                                               | RichEditor                                                             |
|                                        | visionMission                           | Vision & Mission                                                | RichEditor                                                             |
| **Notable Alumni**                     | notableAlumni                           | Notable Alumni                                                  | Repeater (+ icon) → name, achievement                                  |
| **Scholarships**                       | scholarships                            | Scholarships                                                    | Repeater (+ icon) → name, description                                  |
| **Admission Process**                  | admissionProcess.exams                  | Admission Process → Exams                                       | TagsInput or Repeater (+ icon)                                         |
|                                        | admissionProcess.criteria               | Admission Process → Criteria                                    | RichEditor or Textarea                                                 |
|                                        | admissionProcess.applicationFee         | Admission Process → Application Fee                            | TextInput → numeric → prefix ₹                                         |
|                                        | admissionProcess.importantDates         | Admission Process → Important Dates                            | Repeater (+ icon) → event, date (DatePicker)                           |
| **Placement**                          | placement.averagePackage                | Placement → Average Package                                     | TextInput → numeric → prefix ₹ or LPA                                  |
|                                        | placement.highestPackage                | Placement → Highest Package                                     | TextInput → numeric → prefix ₹ or Cr                                   |
|                                        | placement.placementRate                 | Placement → Placement Rate (%)                                  | TextInput → numeric → suffix %                                         |
|                                        | placement.topRecruiters                 | Placement → Top Recruiters                                      | TagsInput or Repeater (+ icon)                                         |
|                                        | placement.highlights                    | Placement → Highlights                                          | TagsInput or Repeater (+ icon)                                         |
|                                        | placement.placementProcess              | Placement → Placement Process                                   | RichEditor                                                             |
| **Campus Life**                        | campusLife.studentStrength              | Campus Life → Student Strength                                  | TextInput → numeric                                                    |
|                                        | campusLife.facultyRatio                 | Campus Life → Faculty Ratio                                     | TextInput → e.g., 1:12                                                 |
|                                        | campusLife.clubs                        | Campus Life → Clubs                                             | TagsInput or Repeater (+ icon)                                         |
| **Media**                              | gallery                                 | Gallery                                                         | FileUpload → multiple → reorderable (+ icon)                           |
|                                        | videoReels                              | Video Reels                                                     | Repeater (+ icon) → type (local/youtube), src or youtubeId, thumbnail, title |
| **Reviews**                            | reviews_data                            | Reviews Data                                                    | Separate moderated resource (not in main form) or Repeater (optional) |
| **Rating & Reviews Count**             | rating                                  | Rating (Average)                                                | TextInput → numeric → disabled (auto-calculated)                       |
|                                        | reviews                                 | Reviews (Count)                                                 | Placeholder or TextInput → disabled (auto-calculated)                  |

```php
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\ToggleButtons;
use Filament\Forms\Components\DatePicker;
```

| Section (Collapsible)              | Field Name → Filament Component                                                                                   | Label / Hint / Rules                                                                                     |
|------------------------------------|--------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| **Basic Information**              | `TextInput::make('name')->required()->reactive()->afterStateUpdated(fn ($state, $set) => $set('slug', Str::slug($state)))` | College Full Name                                                                                       |
|                                    | `TextInput::make('slug')->unique(table: College::class, column: 'slug', ignoreRecord: true)->required()`       | Auto-generated from name                                                                                |
|                                    | `TextInput::make('type')->required()`                                                                             | e.g., Public, Private, Deemed, Autonomous                                                              |
|                                    | `Select::make('type')->options(['Public', 'Private', 'Deemed University', 'Autonomous'])->required()`           | Better UX than free text                                                                                |
|                                    | `FileUpload::make('image')->image()->disk('public')->directory('colleges')->required()`                           | Main Campus Image (1600x900 recommended)                                                                |
| **Location**                       | `TextInput::make('location.city')->label('City')->required()`                                                     |                                                                                                         |
|                                    | `TextInput::make('location.state')->label('State')->required()`                                                  |                                                                                                         |
| **Overview & SEO**                 | `TextInput::make('short_description')->maxLength(255)->required()`                                               | 150–160 chars ideal for meta description                                                                |
|                                    | `RichEditor::make('description')->required()->columnSpanFull()`                                                  | Full college description (TipTap / Tiptap recommended)                                                  |
| **Key Stats**                      | `TextInput::make('established')->numeric()->minValue(1800)->maxValue(now()->year)`                                | Year of Establishment                                                                                   |
|                                    | `TextInput::make('campusSize')->label('Campus Size (acres)')->numeric()`                                         |                                                                                                         |
|                                    | `TextInput::make('campusLife.studentStrength')->label('Total Students')->numeric()`                               |                                                                                                         |
|                                    | `TextInput::make('campusLife.facultyRatio')->label('Faculty:Student Ratio')->placeholder('1:15')`                |                                                                                                         |
| **Fees**                           | `TextInput::make('fees.min')->numeric()->prefix('₹')->required()`                                                 | Min Annual Fees                                                                                         |
|                                    | `TextInput::make('fees.max')->numeric()->prefix('₹')->required()`                                                 | Max Annual Fees                                                                                         |
|                                    | `TextInput::make('additionalFees.hostel')->numeric()->prefix('₹')->label('Hostel Fee (per year)')`              |                                                                                                         |
|                                    | `TextInput::make('additionalFees.mess')->numeric()->prefix('₹')->label('Mess Fee (per year)')`                  |                                                                                                         |
|                                    | `RichEditor::make('feesStructure')->label('Detailed Fees Structure')->columnSpanFull()`                           | Use tables, bold, etc. (optional but recommended)                                                       |
| **Rankings**                       | `Section::make('NIRF Ranking')->collapsible()`                                                                    |                                                                                                         |
|                                    | `TextInput::make('nirf_ranking.rank')->numeric()->label('NIRF Rank')`                                             |                                                                                                         |
|                                    | `TextInput::make('nirf_ranking.category')->label('NIRF Category')`                                                | e.g., Engineering, Overall, University                                                                  |
|                                    | `Repeater::make('rankings')->schema([                                                                             
|                                        TextInput::make('ranking_body')->required(),                                                                | e.g., QS, Times Higher Education                                                                        |
|                                        TextInput::make('category'),                                                                                |                                                                                                         |
|                                        TextInput::make('rank')->numeric(),                                                                         |                                                                                                         |
|                                        TextInput::make('ranking_year')->numeric()->minValue(2000),                                                 |                                                                                                         |
|                                    ])->columns(4)->collapsible()`                                                                                    | Other Rankings (QS, THE, India Today, etc.)                                                             |
| **Accreditation & Streams**        | `TagsInput::make('accreditation')->suggestions(['NAAC A++', 'NBA', 'NIRF', 'ABEC', 'UGC'])->separator(',')`      |                                                                                                         |
|                                    | `TagsInput::make('streams')->suggestions(['Engineering', 'Medical', 'Management', 'Law', 'Design', ...])`        |                                                                                                         |
|                                    | `TagsInput::make('studyMode')->suggestions(['Full Time', 'Part Time', 'Distance', 'Online'])`                    |                                                                                                         |
| **Courses Offered**                | `Repeater::make('courses')->schema([                                                                              
|                                        TextInput::make('name')->required(),                                                                        | e.g., B.Tech CSE                                                                                        |
|                                        TextInput::make('duration')->required(),                                                                    | e.g., 4 Years                                                                                           |
|                                        TextInput::make('fees')->numeric()->prefix('₹'),                                                            |                                                                                                         |
|                                        TextInput::make('eligibility')->required(),                                                                 | e.g., JEE Main + JoSAA                                                                                  |
|                                        TextInput::make('seats')->numeric(),                                                                        | Total Seats                                                                                             |
|                                        Textarea::make('highlights')->rows(2),                                                                      |                                                                                                         |
|                                    ])->columns(3)->collapsible()->itemLabel(fn (array $state): ?string => $state['name'] ?? null)`                 | Most important section — allow reorder                                                                  |
| **Facilities**                     | `TagsInput::make('facilities')->suggestions([...common facilities like Wi-Fi, Library, Labs, Gym...])`           |                                                                                                         |
| **Hostel**                         | `ToggleButtons::make('hostel')->boolean()->inline()->options(['boys' => 'Boys', 'girls' => 'Girls'])->grouped()` |                                                                                                         |
|                                    | `RichEditor::make('hostelDetails')->columnSpanFull()`                                                            | Hostel facilities, rules, photos, etc.                                                                  |
| **Campus Highlights & Vision**     | `RichEditor::make('campusHighlights')->columnSpanFull()`                                                         |                                                                                                         |
|                                    | `RichEditor::make('visionMission')->columnSpanFull()`                                                             |                                                                                                         |
| **Notable Alumni**                 | `Repeater::make('notableAlumni')->schema([                                                                        
|                                        TextInput::make('name')->required(),                                                                        |                                                                                                         |
|                                        Textarea::make('achievement')->required(),                                                                  |                                                                                                         |
|                                    ])->columns(2)->collapsible()`                                                                                    |                                                                                                         |
| **Scholarships**                   | `Repeater::make('scholarships')->schema([                                                                         
|                                        TextInput::make('name')->required(),                                                                        |                                                                                                         |
|                                        Textarea::make('description'),                                                                              |                                                                                                         |
|                                    ])->columns(2)`                                                                                                   |                                                                                                         |
| **Admission Process**              | `TagsInput::make('admissionProcess.exams')->label('Accepted Entrance Exams')`                                     | e.g., JEE Main, NEET, CAT, GATE                                                                         |
|                                    | `RichEditor::make('admissionProcess.criteria')`                                                                   | Selection process details                                                                               |
|                                    | `TextInput::make('admissionProcess.applicationFee')->numeric()->prefix('₹')`                                     |                                                                                                         |
|                                    | `Repeater::make('admissionProcess.importantDates')->schema([                                                      
|                                        TextInput::make('event')->required(),                                                                    | e.g., Application Starts                                                                                |
|                                        DatePicker::make('date'),                                                                                   |                                                                                                         |
|                                    ])->columns(2)`                                                                                                   | Key Dates (2025–26 session)                                                                             |
| **Placement Records**              | `TextInput::make('placement.averagePackage')->numeric()->prefix('₹')->label('Avg Package (LPA)')`                | Convert to LPA if needed                                                                                |
|                                    | `TextInput::make('placement.highestPackage')->numeric()->prefix('₹')->label('Highest Package')`                 |                                                                                                         |
|                                    | `TextInput::make('placement.placementRate')->suffix('%')->numeric()`                                              |                                                                                                         |
|                                    | `TagsInput::make('placement.topRecruiters')`                                                                      | Google, Microsoft, TCS, etc.                                                                            |
|                                    | `TagsInput::make('placement.highlights')`                                                                         | 100% placement, 200+ offers, etc.                                                                       |
|                                    | `RichEditor::make('placement.placementProcess')->columnSpanFull()`                                               | Step-by-step process                                                                                    |
| **Campus Life**                    | `TagsInput::make('campusLife.clubs')`                                                                             | Robotics, Cultural, NSS, etc.                                                                           |
| **Gallery**                        | `FileUpload::make('gallery')->multiple()->image()->disk('public')->directory('colleges/gallery')->reorderable()` | Min 10–15 high-quality images                                                                           |
| **Video Reels / Tours**            | `Repeater::make('videoReels')->schema([                                                                           
|                                        Select::make('type')->options(['local' => 'Uploaded Video', 'youtube' => 'YouTube'])->reactive()->required(),|                                                                                                         |
|                                        FileUpload::make('src')->visible(fn ($get) => $get('type') === 'local')->acceptedFileTypes(['video/mp4']),   | Local video upload                                                                                      |
|                                        TextInput::make('youtubeId')->label('YouTube Video ID')->visible(fn ($get) => $get('type') === 'youtube'),   | e.g., dQw4w9WgXcQ                                                                                       |
|                                        FileUpload::make('thumbnail')->image()->visible(fn ($get) => $get('type') === 'local'),                      | Optional thumbnail                                                                                      |
|                                        TextInput::make('title')->required(),                                                                       |                                                                                                         |
|                                    ])->columns(2)->collapsible()`                                                                                    | Campus tour, fest highlights, etc.                                                                     |

### Suggested Form Layout (for best UX)

```php
Forms\Components\Section::make('Basic Information')->columns(2),
Forms\Components\Section::make('Fees & Rankings')->columns(2),
Forms\Components\Section::make('Courses Offered')->collapsible(),
Forms\Components\Section::make('Admission & Placement')->columns(2),
Forms\Components\Section::make('Campus & Facilities')->collapsible(),
Forms\Components\Section::make('Media')->description('Gallery and videos')->collapsible(),
```

### Recommendation for Backend Developer (Laravel)

- Use Spatie MediaLibrary for image, gallery, and video thumbnails
- Use laravel-sluggable for auto slug
- Use TipTap or Filament's built-in RichEditor for all longText HTML fields
- Use Repeater for all multi-entry fields (rankings, courses, alumni, reels, etc.)
- Store all JSON arrays as json columns (accreditation, facilities, etc.)
- Make separate tables + relationships for heavy repeaters (courses, reviews, reels, rankings)

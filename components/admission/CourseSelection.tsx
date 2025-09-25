
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { admissionCourses, AdmissionCourse } from '@/lib/admission-data';

interface CourseSelectionProps {
  collegeId: string;
  onCourseSelect: (course: AdmissionCourse) => void;
}

export function CourseSelection({ collegeId, onCourseSelect }: CourseSelectionProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = admissionCourses.filter(
    (course) =>
      course.collegeId === collegeId &&
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select a Course</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          placeholder="Search for a course..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />
        <div className="space-y-2">
          {filteredCourses.map((course) => (
            <div key={course.id} className="border p-4 rounded-lg flex items-center justify-between">
              <h3 className="font-semibold">{course.name}</h3>
              <Button onClick={() => onCourseSelect(course)}>Select</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

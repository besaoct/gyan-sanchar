
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { admissionColleges, AdmissionCollege } from '@/lib/admission-data';
import Image from 'next/image';

interface CollegeSelectionProps {
  onCollegeSelect: (college: AdmissionCollege) => void;
}

export function CollegeSelection({ onCollegeSelect }: CollegeSelectionProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredColleges = admissionColleges.filter((college) =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select a College</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          placeholder="Search for a college..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredColleges.map((college) => (
            <div key={college.id} className="border p-4 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <Image
                  src={college.image}
                  alt={college.name}
                  width={80}
                  height={80}
                  className="rounded-md mr-4"
                />
                <div>
                  <h3 className="font-semibold">{college.name}</h3>
                  <p className="text-sm text-gray-500">{college.location}</p>
                </div>
              </div>
              <Button onClick={() => onCollegeSelect(college)}>Select</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

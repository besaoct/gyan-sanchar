"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, IndianRupee, Users, ScrollText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface College {
  slug?: string;
  name: string;
  fees: string;
  seats: number;
  eligibility_exams: string;
}

export function CourseCollegeCard({ college }: { college: College }) {
  const href = college.slug ? `/college/${college.slug}` : "#";

  return (
    <Link href={href} className="block" prefetch={false}>
      <Card className=" shadow-none bg-gray-50 transition-all duration-300 border border-gray-300 hover:border-blue-100 group cursor-pointer h-full">
        <CardHeader className="">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg  transition-colors">
                <Building2 className="w-6 h-6 text-blue-700" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900  transition-colors">
                {college.name}
              </CardTitle>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Fees */}
            <div className="flex items-center gap-3 p-4  rounded-lg border border-green-200 bg-green-100 transition-colors">
              <IndianRupee className="w-5 h-5 text-green-700" />
              <div>
                <p className="text-sm font-medium text-gray-600">Fees</p>
                <p className="text-lg font-bold text-green-700">{college.fees}</p>
              </div>
            </div>

            {/* Seats */}
            <div className="flex items-center gap-3 p-4  rounded-lg border border-purple-200 bg-purple-100 transition-colors">
              <Users className="w-5 h-5 text-purple-700" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Seats</p>
                <p className="text-lg font-bold text-purple-700">{college.seats}</p>
              </div>
            </div>

            {/* Exams */}
            <div className="flex items-center gap-3 p-4 rounded-lg border border-amber-200 bg-amber-100 transition-colors">
              <ScrollText className="w-5 h-5 text-amber-700" />
              <div>
                <p className="text-sm font-medium text-gray-600">Exams Accepted</p>
                <div className="mt-1">
                  <Badge variant="secondary" className="text-xs bg-amber-500 text-white flex-wrap">
                    {college.eligibility_exams}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>


      </Card>
    </Link>
  );
}
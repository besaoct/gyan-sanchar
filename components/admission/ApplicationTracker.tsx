
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const applications = [
  {
    id: "APP-001",
    college: "ABC Institute of Technology",
    course: "B.Tech in Computer Science",
    status: "Submitted",
  },
  {
    id: "APP-002",
    college: "XYZ University",
    course: "MBA",
    status: "In Review",
  },
  {
    id: "APP-003",
    college: "PQR College of Arts",
    course: "BA in Economics",
    status: "Accepted",
  },
];

export function ApplicationTracker() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Application ID</TableHead>
              <TableHead>College</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app.id}>
                <TableCell>{app.id}</TableCell>
                <TableCell>{app.college}</TableCell>
                <TableCell>{app.course}</TableCell>
                <TableCell>
                  <Badge 
                    className={`${app.status === 'Accepted' ? 'bg-green-500' : app.status === 'In Review' ? 'bg-yellow-500' : 'bg-blue-500'} text-white`}>
                    {app.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Compass, MessageSquare, HelpCircle } from "lucide-react";
import Link from "next/link";

const tools = [
  {
    title: "Career Compass",
    description: "Discover the right career path for you with our advanced assessment tool.",
    icon: <Compass className="h-8 w-8 text-primary" />,
    link: "/career-compass",
  },
  {
    title: "Admission Counselling",
    description: "Get expert guidance from our admission counsellors to help you choose the right college.",
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
    link: "/counselling",
  },
  {
    title: "FAQs",
    description: "Find answers to all your admission-related queries in our frequently asked questions section.",
    icon: <HelpCircle className="h-8 w-8 text-primary" />,
    link: "/faqs",
  },
];

export function ToolsAndResources() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tools & Resources</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {tools.map((tool) => (
          <div key={tool.title} className="flex items-start gap-4 p-4 border rounded-lg">
            <div>{tool.icon}</div>
            <div>
              <h3 className="font-semibold">{tool.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{tool.description}</p>
              <Link href={tool.link}>
                <Button variant="outline" size="sm" className="text-primary border-primary hover:bg-primary hover:text-white">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

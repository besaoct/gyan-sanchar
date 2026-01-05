"use client";

import * as React from "react";
import { Book, Building2, Search } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { getColleges } from "@/lib/api/data/colleges";
import { getCourses } from "@/lib/api/data/courses";
import { College } from "@/lib/api/data/colleges";
import { CourseDetails } from "@/lib/api/data/courses";
import { useDebounce } from "use-debounce";

const SearchBar = () => {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [colleges, setColleges] = React.useState<College[]>([]);
  const [courses, setCourses] = React.useState<CourseDetails[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const router = useRouter();

  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  // Keyboard shortcut: Cmd/Ctrl + K
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Show searching state immediately when user types 3+ chars
  React.useEffect(() => {
    if (searchQuery.trim().length > 2) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [searchQuery]);

  // Fetch and filter when debounced query changes
  React.useEffect(() => {
    const fetchAndFilter = async () => {
      const query = debouncedSearchQuery.trim();

      if (query.length <= 2) {
        setColleges([]);
        setCourses([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);

      try {
        const [collegeRes, courseRes] = await Promise.all([
          getColleges(),
          getCourses(),
        ]);

        let filteredColleges: College[] = [];
        let filteredCourses: CourseDetails[] = [];

        if (collegeRes.success && collegeRes.data) {
          filteredColleges = collegeRes.data
            .filter((college: College) =>
              college.name.toLowerCase().includes(query.toLowerCase())
            )
            .slice(0, 8);
        }

        if (courseRes.success && courseRes.data) {
          filteredCourses = courseRes.data
            .filter((course: CourseDetails) =>
              course.course_name.toLowerCase().includes(query.toLowerCase())
            )
            .slice(0, 8);
        }

        setColleges(filteredColleges);
        setCourses(filteredCourses);
      } catch (error) {
        console.error("Error fetching search data:", error);
        setColleges([]);
        setCourses([]);
      } finally {
        setIsSearching(false);
      }
    };

    fetchAndFilter();
  }, [debouncedSearchQuery]);

  const handleSelect = (url: string) => {
    router.push(url);
    setOpen(false);
    setSearchQuery("");
    setColleges([]);
    setCourses([]);
    setIsSearching(false);
  };

  return (
    <>
      {/* Search Trigger Button */}
      <div className="flex flex-row items-center gap-4 bg-white p-4 rounded-lg shadow-sm w-full max-w-4xl">
      
        <div className="flex items-center gap-2 text-gray-600">
          <Search className="w-5 h-5 text-gray-400" />
        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex-1 w-full sm:w-auto group"
          aria-label="Open search dialog"
        >
          <div className="border border-gray-200 h-10 bg-gray-50 hover:bg-gray-100 transition-colors py-2 px-4 flex items-center rounded-md text-left">
            <span className="text-gray-500 text-sm">
              Search for colleges, courses...
            </span>
          </div>
        </button>

        <kbd className="pointer-events-none h-10 hidden sm:flex items-center justify-center gap-1 rounded-md border bg-white p-2 font-mono text-sm font-medium text-gray-600">
          <span className="text-sm">⌘</span>K
        </kbd>
      </div>

      {/* Command Dialog */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search colleges and courses..."
          value={searchQuery}
          onValueChange={setSearchQuery}
        />

        <CommandList className="max-h-[400px] overflow-y-auto">
          {/* Loading indicator - shows immediately when typing 3+ chars */}
          {isSearching && (
            <CommandItem disabled className="py-6 border-b">
              <div className="w-full text-center text-sm text-muted-foreground">
                <div className="inline-flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-primary" />
                  Searching for "{searchQuery}"...
                </div>
              </div>
            </CommandItem>
          )}

          {/* Initial empty state */}
          {!isSearching && searchQuery.length === 0 && (
            <CommandItem disabled className="py-12">
              <div className="text-center text-sm text-muted-foreground">
                Start typing to search for colleges and courses...
              </div>
            </CommandItem>
          )}

          {/* Query too short */}
          {!isSearching && searchQuery.length > 0 && searchQuery.length <= 2 && (
            <CommandItem disabled className="py-12">
              <div className="text-center text-sm text-muted-foreground">
                Type at least 3 characters to begin search
              </div>
            </CommandItem>
          )}

          {/* No results found */}
          {!isSearching && searchQuery.length > 2 && colleges.length === 0 && courses.length === 0 && (
            <CommandItem disabled className="py-12">
              <div className="text-center text-sm text-muted-foreground">
                No results found for "<span className="font-medium">{searchQuery}</span>"
              </div>
            </CommandItem>
          )}

          {/* Colleges Group */}
          {!isSearching && colleges.length > 0 && (
            <CommandGroup heading="Colleges" className="pb-2">
              {colleges.map((college) => (
                <CommandItem
                  key={college.slug}
                  value={`college-${college.slug}`}
                  onSelect={() => handleSelect(`/college/${college.slug}`)}
                >
                  <Building2 className="mr-2 h-4 w-4 text-gray-500" />
                  <span>{college.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {/* Courses Group */}
          {!isSearching && courses.length > 0 && (
            <CommandGroup heading="Courses" className="pb-2">
              {courses.map((course) => (
                <CommandItem
                  key={course.slug}
                  value={`course-${course.slug}`}
                  onSelect={() => handleSelect(`/course/${course.slug}`)}
                >
                  <Book className="mr-2 h-4 w-4 text-gray-500" />
                  <span>{course.course_name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {/* Footer hint */}
          {!isSearching && (colleges.length > 0 || courses.length > 0) && (
            <CommandItem disabled className="py-3 text-center text-xs text-muted-foreground border-t">
              Showing top results
            </CommandItem>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchBar;
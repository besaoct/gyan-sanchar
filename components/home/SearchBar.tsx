"use client";

import * as React from "react";
import { Search } from "lucide-react";
import SearchDialog from "@/components/common/SearchDialog"; // Import the new component

const SearchBar = () => {
  const [open, setOpen] = React.useState(false);

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
      <SearchDialog open={open} onOpenChange={setOpen} />
    </>
  );
};

export default SearchBar;
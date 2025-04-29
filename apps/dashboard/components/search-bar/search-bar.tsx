import { useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearchChange?: (value: string) => void;
}

export function SearchBar({ placeholder = "Search name", onSearchChange }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearchChange?.(value);
  };

  return (
    <div className={`flex items-center`}>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          className="border-b border-gray-700 py-1 pr-8 pl-4 focus:outline-none w-96 text-sm text-gray-500"
          value={searchQuery}
          onChange={handleChange}
        />
        <button className="absolute right-0 bottom-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;

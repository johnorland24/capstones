import React, { useState, ChangeEvent } from "react";  
import { MagnifyingGlassIcon, Cross1Icon } from "@radix-ui/react-icons";  


interface SearchInputProps {  
  onSearch: (text: string) => void;  
}  

export default function SearchInput({ onSearch }: SearchInputProps) {  
  const [searchText, setSearchText] = useState("");  

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {  
    const value = e.target.value;  
    setSearchText(value);  
    onSearch(value);  // Call the onSearch with current input value  
  };  

  const clearInput = () => {  
    setSearchText("");  
    onSearch(""); // Clear the search in Navbar as well  
  };  

  const handleSearch = () => {  
    console.log("Searching for:", searchText);  
  };  

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {  
    if (e.key === 'Enter') {  
      handleSearch();  
    }  
  };  

  return (  
    <div className="flex items-center">
    <div className="relative flex-grow">
      <input
        className="w-full border-gray-600 border-solid lg:w-[500px] rounded-l-lg rounded-r-none text-sm md:text-base h-8 md:h-10 py-2 pl-10 pr-8 outline-none bg-muted border border-r-0 transition duration-300 hover:border-gradient focus:border-gradient"
        placeholder="Search here..."
        value={searchText}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      {searchText && (
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
          onClick={clearInput}
        >
          <Cross1Icon className="h-4 w-4 text-gray-500" />
        </button>
      )}
    </div>
    <button 
      className="border-gray-600 border-solid h-8 md:h-10 w-20 bg-slate-800 rounded-r-lg flex items-center justify-center border border-l-0 hover:border-gradient rounded-l-none"
      onClick={handleSearch}
    >
      <MagnifyingGlassIcon className="h-5 w-5 text-white" />
    </button>
  </div>
);}
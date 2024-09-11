import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { SearchBarProps } from "@/interfaces/common";

const SearchBar = ({ handleSearch }: SearchBarProps) => {
  const [search, setSearch] = useState("");

  const handleSearchClick = () => {
    handleSearch(search);
  };

  return (
    <div className="flex gap-4">
      <Input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button onClick={handleSearchClick}>Search</Button>
    </div>
  );
};

export default SearchBar;

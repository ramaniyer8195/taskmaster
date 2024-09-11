import { TabProps } from "@/interfaces/dashboard";
import SearchBar from "./SearchBar";
import emptyArchiveTab from "../../assets/empty_archive_tab.svg";

const ArchiveTab = ({ items }: TabProps) => {
  const handleSearch = (searchString: string) => {
    console.log(searchString);
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <SearchBar handleSearch={handleSearch} />
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-display font-bold">Archive</h2>
      </div>
      <div>
        {!items.length && (
          <div className="flex flex-col gap-2">
            <img src={emptyArchiveTab} alt="" className="h-[450px]" />
            <div className="font-display text-3xl font-bold text-center">
              No notes archived
            </div>
            <div className="font-display text-3xl font-bold text-center">
              Archived notes will not be visible in the dashboard
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArchiveTab;

import { TabProps } from "@/interfaces/dashboard";
import SearchBar from "./SearchBar";
import emptyDeletedTab from "../../assets/empty_deleted_tab.svg";

const RecentlyDeletedTab = ({ items }: TabProps) => {
  const handleSearch = (searchString: string) => {
    console.log(searchString);
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <SearchBar handleSearch={handleSearch} />
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-display">
          <span className="font-bold">Recently Deleted </span>
          <span>(Notes in trash are deleted after 7 days)</span>
        </h2>
      </div>
      <div>
        {!items.length && (
          <div className="flex flex-col gap-2">
            <img src={emptyDeletedTab} alt="" className="h-[450px]" />
            <div className="font-display text-3xl font-bold text-center">
              No notes have been deleted
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentlyDeletedTab;

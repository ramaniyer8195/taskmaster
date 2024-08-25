import { TabProps } from "@/interfaces/dashboard";
import SearchBar from "./SearchBar";
import emptyFavouriteTab from "../../assets/empty_favourite_tab.svg";

const FavouritesTab = ({ items }: TabProps) => {
  const handleSearch = (searchString: string) => {
    console.log(searchString);
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <SearchBar handleSearch={handleSearch} />
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-display font-bold">Favourites</h2>
      </div>
      <div>
        {!items.length && (
          <div className="flex flex-col gap-2">
            <img src={emptyFavouriteTab} alt="" className="h-[450px]" />
            <div className="font-display text-3xl font-bold text-center">
              No favourites added
            </div>
            <div className="font-display text-3xl font-bold text-center">
              Click on the favourite icon on an item to add it to favourites
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavouritesTab;

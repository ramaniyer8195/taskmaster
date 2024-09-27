import { TabProps } from "@/interfaces/dashboard";
import SearchBar from "./SearchBar";
import emptyFavouriteTab from "../../assets/empty_favourite_tab.svg";
import { useEffect, useState } from "react";
import { Note, Todo } from "@/interfaces/api";
import NoteCard from "./NoteCard";
import { isNote } from "@/utils/utils";
import TodoCard from "./TodoCard";
import axios from "axios";

const FavouritesTab = ({
  topics,
  handleArchive,
  handleDelete,
  handleFavourite,
  handleTopicUpdate,
  handleNoteEdit,
  handlePermanentDelete,
  handleTodoEdit,
}: TabProps) => {
  const [items, setItems] = useState<(Note | Todo)[]>([]);
  const [searchString, setSearchString] = useState("");

  const getItems = async (searchString = "") => {
    try {
      const res: { data: { data: (Note | Todo)[] } } = await axios.get(
        "/api/item/getItems",
        {
          params: {
            isFavourite: true,
            isArchived: false,
            isDeleted: false,
            ...(searchString !== "" && { search: searchString }),
          },
        }
      );

      setItems(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getItems(searchString);
  }, [searchString]);

  const handleSearch = (searchString: string) => {
    setSearchString(searchString);
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
        {items.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            {items.map((item) => {
              if (isNote(item)) {
                return (
                  <NoteCard
                    key={item._id}
                    note={item}
                    handleArchive={handleArchive}
                    handleDelete={handleDelete}
                    handleEdit={handleNoteEdit}
                    handleFavourite={handleFavourite}
                    handlePermanentDelete={handlePermanentDelete}
                    handleTopicUpdate={handleTopicUpdate}
                    topics={topics}
                  />
                );
              } else {
                return (
                  <TodoCard
                    key={item._id}
                    todo={item}
                    handleArchive={handleArchive}
                    handleDelete={handleDelete}
                    handleEdit={handleTodoEdit}
                    handleFavourite={handleFavourite}
                    handlePermanentDelete={handlePermanentDelete}
                    handleTopicUpdate={handleTopicUpdate}
                    topics={topics}
                  />
                );
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavouritesTab;

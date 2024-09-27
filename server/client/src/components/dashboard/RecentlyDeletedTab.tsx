import { TabProps } from "@/interfaces/dashboard";
import SearchBar from "./SearchBar";
import emptyDeletedTab from "../../assets/empty_deleted_tab.svg";
import { useEffect, useState } from "react";
import { Note, Todo } from "@/interfaces/api";
import { isNote } from "@/utils/utils";
import NoteCard from "./NoteCard";
import TodoCard from "./TodoCard";
import axios from "axios";

const RecentlyDeletedTab = ({
  topics,
  handleArchive,
  handleDelete,
  handleFavourite,
  handleNoteEdit,
  handlePermanentDelete,
  handleTodoEdit,
  handleTopicUpdate,
}: TabProps) => {
  const [items, setItems] = useState<(Note | Todo)[]>([]);
  const [searchString, setSearchString] = useState("");

  const getItems = async (searchString = "") => {
    try {
      const res: { data: { data: (Note | Todo)[] } } = await axios.get(
        "/api/item/getItems",
        {
          params: {
            isDeleted: true,
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

export default RecentlyDeletedTab;

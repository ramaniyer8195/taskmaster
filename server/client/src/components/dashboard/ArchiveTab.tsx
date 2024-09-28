import { TabProps } from "@/interfaces/dashboard";
import SearchBar from "./SearchBar";
import emptyArchiveTab from "../../assets/empty_archive_tab.svg";
import { useEffect, useState } from "react";
import { Content, Note, Todo } from "@/interfaces/api";
import axios from "axios";
import { isNote } from "@/utils/utils";
import NoteCard from "./NoteCard";
import TodoCard from "./TodoCard";

const ArchiveTab = ({
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
            isArchived: true,
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
  }, [searchString, topics]);

  const handleSearch = (searchString: string) => {
    setSearchString(searchString);
  };

  const handleArchiveItem = async (
    type: string,
    id: string,
    isArchived: boolean
  ) => {
    await handleArchive(type, id, isArchived);
    getItems(searchString);
  };

  const handleDeleteItem = async (
    type: string,
    id: string,
    isDeleted: boolean
  ) => {
    await handleDelete(type, id, isDeleted);
    getItems(searchString);
  };

  const handleEditNoteItem = async (
    id: string,
    content: string,
    title: string
  ) => {
    await handleNoteEdit(id, content, title);
    getItems(searchString);
  };

  const handleEditTodoItem = async (
    id: string,
    content: Content[],
    title: string
  ) => {
    await handleTodoEdit(id, content, title);
    getItems(searchString);
  };

  const handleFavouriteItem = async (
    type: string,
    id: string,
    isFavourite: boolean
  ) => {
    await handleFavourite(type, id, isFavourite);
    getItems(searchString);
  };

  const handlePermanentDeleteItem = async (type: string, id: string) => {
    await handlePermanentDelete(type, id);
    getItems(searchString);
  };

  const handleTopicUpdateItem = async (
    type: string,
    id: string,
    topicId: string | null
  ) => {
    await handleTopicUpdate(type, id, topicId);
    getItems(searchString);
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
        {items.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            {items.map((item) => {
              if (isNote(item)) {
                return (
                  <NoteCard
                    key={item._id}
                    note={item}
                    handleArchive={handleArchiveItem}
                    handleDelete={handleDeleteItem}
                    handleEdit={handleEditNoteItem}
                    handleFavourite={handleFavouriteItem}
                    handlePermanentDelete={handlePermanentDeleteItem}
                    handleTopicUpdate={handleTopicUpdateItem}
                    topics={topics}
                  />
                );
              } else {
                return (
                  <TodoCard
                    key={item._id}
                    todo={item}
                    handleArchive={handleArchiveItem}
                    handleDelete={handleDeleteItem}
                    handleEdit={handleEditTodoItem}
                    handleFavourite={handleFavouriteItem}
                    handlePermanentDelete={handlePermanentDeleteItem}
                    handleTopicUpdate={handleTopicUpdateItem}
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

export default ArchiveTab;

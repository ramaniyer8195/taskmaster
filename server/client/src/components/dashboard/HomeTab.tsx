import { HomeTabProps } from "@/interfaces/dashboard";
import { Button } from "../ui/button";
import emptyHomeTab from "../../assets/empty_home_tab.svg";
import { MouseEvent, useState } from "react";
import SearchBar from "./SearchBar";
import AddItemModal from "../modals/AddItemModal";
import NoteCard from "./NoteCard";
import TodoCard from "./TodoCard";
import { Note, Todo } from "@/interfaces/api";

const HomeTab = ({ topics, items }: HomeTabProps) => {
  const [selected, setSelected] = useState("All");
  const [openAddModal, setOpenAddModal] = useState(false);

  const handleTopicChange = (e: MouseEvent<HTMLButtonElement>) => {
    setSelected(e.currentTarget.innerText);
  };

  const handleSearch = (searchString: string) => {
    console.log(searchString);
  };

  const isNote = (item: Note | Todo): item is Note => {
    if (item.type === "note") return true;
    return false;
  };

  const handleArchive = (id: string, isArchived: boolean) => {
    console.log(id, isArchived);
  };

  const handleDelete = (id: string, isDeleted: boolean) => {
    console.log(id, isDeleted);
  };

  const handleEdit = (id: string, content: string, title: string) => {
    console.log(id, content, title);
  };

  const handleFavourite = (id: string, isFavourite: boolean) => {
    console.log(id, isFavourite);
  };

  const handlePermanentDelete = (id: string) => {
    console.log(id);
  };

  const handleTopicUpdate = (id: string, topicId: string) => {
    console.log(id, topicId);
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <SearchBar handleSearch={handleSearch} />
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant={selected === "All" ? "default" : "secondary"}
            onClick={handleTopicChange}
          >
            All
          </Button>
          {topics.map((topic, id) => (
            <Button
              key={id}
              variant={selected === topic.title ? "default" : "secondary"}
              onClick={handleTopicChange}
            >
              {topic.title}
            </Button>
          ))}
        </div>
        <AddItemModal
          open={openAddModal}
          setOpen={setOpenAddModal}
          topics={topics}
        />
      </div>
      <div>
        {!items.length && (
          <div className="flex flex-col gap-2">
            <img src={emptyHomeTab} alt="" className="h-[450px]" />
            <div className="font-display text-3xl font-bold text-center">
              No items present
            </div>
            <div className="font-display text-3xl font-bold text-center">
              Click on Add New to add your first item
            </div>
          </div>
        )}
        {items.length && (
          <div className="grid grid-cols-3 gap-4">
            {items.map((item) => {
              if (isNote(item)) {
                return (
                  <NoteCard
                    key={item._id}
                    note={item}
                    handleArchive={handleArchive}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
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
                    handleEdit={handleEdit}
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

export default HomeTab;

import { TabProps } from "@/interfaces/dashboard";
import { Button } from "../ui/button";
import emptyHomeTab from "../../assets/empty_home_tab.svg";
import { MouseEvent, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import AddItemModal from "../modals/AddItemModal";
import NoteCard from "./NoteCard";
import TodoCard from "./TodoCard";
import { Content, Note, Todo, Topic } from "@/interfaces/api";
import axios from "axios";
import { isNote } from "@/utils/utils";

const HomeTab = ({
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
  const [selected, setSelected] = useState("All");
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [searchString, setSearchString] = useState("");

  const getItems = async (selectedTopic: Topic | null, searchString = "") => {
    try {
      const res: { data: { data: (Note | Todo)[] } } = await axios.get(
        "/api/item/getItems",
        {
          params: {
            isArchived: false,
            isDeleted: false,
            ...(selectedTopic && { topicId: selectedTopic._id }),
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
    getItems(selectedTopic, searchString);
  }, [selectedTopic, searchString, topics]);

  const handleTopicChange = (
    e: MouseEvent<HTMLButtonElement>,
    topic: Topic | null = null
  ) => {
    setSelectedTopic(topic);
    setSelected(e.currentTarget.innerText);
  };

  const handleSearch = (searchString: string) => {
    setSearchString(searchString);
  };

  const handleAddItem = async (
    title: string,
    topic: string | null,
    type: string
  ) => {
    try {
      await axios.post("/api/item/addItem", {
        title,
        type,
        topicId: topic,
      });

      getItems(selectedTopic, searchString);
    } catch (error) {
      console.error(error);
    }
  };

  const handleArchiveItem = async (
    type: string,
    id: string,
    isArchived: boolean
  ) => {
    await handleArchive(type, id, isArchived);
    getItems(selectedTopic, searchString);
  };

  const handleDeleteItem = async (
    type: string,
    id: string,
    isDeleted: boolean
  ) => {
    await handleDelete(type, id, isDeleted);
    getItems(selectedTopic, searchString);
  };

  const handleEditNoteItem = async (
    id: string,
    content: string,
    title: string
  ) => {
    await handleNoteEdit(id, content, title);
    getItems(selectedTopic, searchString);
  };

  const handleEditTodoItem = async (
    id: string,
    content: Content[],
    title: string
  ) => {
    await handleTodoEdit(id, content, title);
    getItems(selectedTopic, searchString);
  };

  const handleFavouriteItem = async (
    type: string,
    id: string,
    isFavourite: boolean
  ) => {
    await handleFavourite(type, id, isFavourite);
    getItems(selectedTopic, searchString);
  };

  const handlePermanentDeleteItem = async (type: string, id: string) => {
    await handlePermanentDelete(type, id);
    getItems(selectedTopic, searchString);
  };

  const handleTopicUpdateItem = async (
    type: string,
    id: string,
    topicId: string | null
  ) => {
    await handleTopicUpdate(type, id, topicId);
    getItems(selectedTopic, searchString);
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <SearchBar handleSearch={handleSearch} />
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant={selected === "All" ? "default" : "secondary"}
            onClick={(e) => handleTopicChange(e)}
          >
            All
          </Button>
          {topics.map((topic, id) => (
            <Button
              key={id}
              variant={selected === topic.title ? "default" : "secondary"}
              onClick={(e) => handleTopicChange(e, topic)}
            >
              {topic.title}
            </Button>
          ))}
        </div>
        <AddItemModal
          open={openAddModal}
          setOpen={setOpenAddModal}
          topics={topics}
          handleAddItem={handleAddItem}
        />
      </div>
      <div className="h-[85%] overflow-y-auto">
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
        {items.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mr-4">
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

export default HomeTab;

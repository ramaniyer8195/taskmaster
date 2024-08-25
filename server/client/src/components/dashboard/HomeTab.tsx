import { HomeTabProps } from "@/interfaces/dashboard";
import { Button } from "../ui/button";
import emptyHomeTab from "../../assets/empty_home_tab.svg";
import { MouseEvent, useState } from "react";
import SearchBar from "./SearchBar";
import AddItemModal from "../modals/AddItemModal";

const HomeTab = ({ topics, items }: HomeTabProps) => {
  const [selected, setSelected] = useState("All");
  const [openAddModal, setOpenAddModal] = useState(false);

  const handleTopicChange = (e: MouseEvent<HTMLButtonElement>) => {
    setSelected(e.currentTarget.innerText);
  };

  const handleSearch = (searchString: string) => {
    console.log(searchString);
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
              variant={selected === topic.name ? "default" : "secondary"}
              onClick={handleTopicChange}
            >
              {topic.name}
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
      </div>
    </div>
  );
};

export default HomeTab;

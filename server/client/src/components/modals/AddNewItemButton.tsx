import { AddNewItemButtonProps } from "@/interfaces/modals";
import { Button } from "../ui/button";
import { FaCirclePlus } from "react-icons/fa6";

const AddNewItemButton = ({
  isBaseItem,
  handleAddNewItem,
  headingId,
}: AddNewItemButtonProps) => {
  const onAddNewItem = () => {
    handleAddNewItem(isBaseItem, headingId ? headingId : "");
  };

  return (
    <Button variant="link" onClick={onAddNewItem}>
      <div
        className={`flex gap-1 items-center ${
          isBaseItem ? "text-base" : "ml-6"
        }`}
      >
        <FaCirclePlus />
        <span>Add new item</span>
      </div>
    </Button>
  );
};

export default AddNewItemButton;

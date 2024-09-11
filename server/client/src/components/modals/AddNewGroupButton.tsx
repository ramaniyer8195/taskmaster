import { AddNewGroupButtonProps } from "@/interfaces/modals";
import { Button } from "../ui/button";
import { MdGroupAdd } from "react-icons/md";

const AddNewGroupButton = ({ handleAddNewGroup }: AddNewGroupButtonProps) => {
  return (
    <Button variant="link" onClick={handleAddNewGroup}>
      <div className="flex gap-1 items-center text-base">
        <MdGroupAdd />
        <span>Add new group</span>
      </div>
    </Button>
  );
};

export default AddNewGroupButton;

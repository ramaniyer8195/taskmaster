import { SubTodoItemProps } from "@/interfaces/modals";
import React, { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { FaTimes } from "react-icons/fa";

const SubTodoItem = ({
  handleCheck,
  handleTodoEdit,
  item,
  headingId,
  removeItem,
}: SubTodoItemProps) => {
  const [showRemove, setShowRemove] = useState(false);
  const { contentId, isCompleted, value } = item;

  const onCheckChanged = (checked: boolean) => {
    handleCheck(checked, false, contentId, headingId);
  };

  const onTodoBlur = (e: React.ChangeEvent<HTMLDivElement>) => {
    handleTodoEdit(
      e.currentTarget.innerText,
      isCompleted,
      false,
      contentId,
      headingId
    );
  };

  const onRemoveClick = () => {
    removeItem(isCompleted, false, contentId, headingId);
  };

  return (
    <div
      className="flex justify-between items-center ml-10 text-sm"
      onMouseEnter={() => setShowRemove(true)}
      onMouseLeave={() => setShowRemove(false)}
    >
      <div className="flex gap-2 items-center w-full">
        <Checkbox
          id={contentId}
          checked={isCompleted}
          onCheckedChange={onCheckChanged}
        />
        <div
          className={`focus-visible:outline-none ${
            isCompleted ? "line-through text-gray-400" : ""
          } w-full whitespace-pre-line`}
          contentEditable
          onBlur={onTodoBlur}
          suppressContentEditableWarning
        >
          {value}
        </div>
      </div>
      <FaTimes
        onClick={onRemoveClick}
        className={`text-primary cursor-pointer ${
          showRemove ? "visible" : "invisible"
        }`}
      />
    </div>
  );
};

export default SubTodoItem;

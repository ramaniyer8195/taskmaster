import { BaseTodoItemProps } from "@/interfaces/modals";
import React, { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { FaTimes } from "react-icons/fa";

const BaseTodoItem = ({
  handleCheck,
  handleTodoEdit,
  item,
  removeItem,
  isPartiallyCompleted = false,
}: BaseTodoItemProps) => {
  const [showRemove, setShowRemove] = useState(false);
  const { contentId, isCompleted, value } = item;

  const onCheckChanged = (checked: boolean) => {
    handleCheck(checked, true, contentId);
  };

  const onTodoBlur = (e: React.ChangeEvent<HTMLDivElement>) => {
    handleTodoEdit(e.currentTarget.innerText, isCompleted, true, contentId);
  };

  const onRemoveClick = () => {
    removeItem(isCompleted, true, contentId);
  };

  return (
    <div
      className="flex justify-between items-center ml-4"
      onMouseEnter={() => setShowRemove(true)}
      onMouseLeave={() => setShowRemove(false)}
    >
      <div className="flex gap-2 items-center w-full">
        <Checkbox
          id={contentId}
          checked={isCompleted ? isCompleted : isPartiallyCompleted}
          onCheckedChange={onCheckChanged}
          disabled={isPartiallyCompleted}
        />
        <div
          className={`focus-visible:outline-none ${
            isPartiallyCompleted && !isCompleted
              ? "text-gray-400"
              : isCompleted
              ? "line-through text-gray-400"
              : ""
          } w-full whitespace-pre-line`}
          contentEditable={!isPartiallyCompleted}
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

export default BaseTodoItem;

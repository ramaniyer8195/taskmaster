import { TodoCardProps } from "@/interfaces/dashboard";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { FaEdit, FaTrash, FaTrashRestore } from "react-icons/fa";
import { formatDate } from "@/utils/dateUtils";
import {
  RiInboxArchiveFill,
  RiInboxUnarchiveFill,
  RiTodoFill,
} from "react-icons/ri";
import { FaHeartCircleMinus, FaHeartCirclePlus } from "react-icons/fa6";
import { useState } from "react";
import { getContent } from "@/utils/todoUtils";

const TodoCard = ({ todo }: TodoCardProps) => {
  const [showFooter, setShowFooter] = useState(false);
  const { isArchived, isDeleted, isFavourite } = todo;

  return (
    <Card
      className={`border-${todo.color} border-t-8 max-h-[350px]`}
      onMouseEnter={() => setShowFooter(true)}
      onMouseLeave={() => setShowFooter(false)}
    >
      <CardHeader className="pb-1">
        <CardTitle className="font-display font-bold text-2xl text-ellipsis overflow-hidden text-nowrap">
          {todo.title}
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          <div>{formatDate(todo.editedAt)}</div>
          <div className="text-primary">
            <RiTodoFill className="text-lg" />
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[200px] overflow-hidden">
        <p>{getContent(todo.content)}</p>
      </CardContent>
      <CardFooter>
        <div
          className={`text-primary flex gap-4 mt-3 text-xl ${
            showFooter ? "visible" : "invisible"
          }`}
        >
          {!isDeleted && <FaEdit className="cursor-pointer" />}
          {!isDeleted && <FaTrash className="cursor-pointer" />}
          {!isDeleted ? (
            isArchived ? (
              <RiInboxUnarchiveFill className="cursor-pointer" />
            ) : (
              <RiInboxArchiveFill className="cursor-pointer" />
            )
          ) : (
            <></>
          )}
          {!isDeleted ? (
            isFavourite ? (
              <FaHeartCircleMinus className="cursor-pointer" />
            ) : (
              <FaHeartCirclePlus className="cursor-pointer" />
            )
          ) : (
            <></>
          )}
          {isDeleted && <FaTrashRestore className="cursor-pointer" />}
          {isDeleted && <FaTrash className="cursor-pointer" />}
        </div>
      </CardFooter>
    </Card>
  );
};

export default TodoCard;

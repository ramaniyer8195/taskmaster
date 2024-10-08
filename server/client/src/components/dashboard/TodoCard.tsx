import { TodoCardProps } from "@/interfaces/dashboard";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { formatDate } from "@/utils/dateUtils";
import { RiTodoFill } from "react-icons/ri";
import { useState } from "react";
import { getContent } from "@/utils/todoUtils";
import DeleteItemModal from "../modals/DeleteItemModal";
import RestoreItemModal from "../modals/RestoreItemModal";
import DeletePermanentlyModal from "../modals/DeletePermanentlyModal";
import UnarchiveItemModal from "../modals/UnarchiveItemModal";
import ArchiveItemModal from "../modals/ArchiveItemModal";
import UnfavouriteItemModal from "../modals/UnfavouriteItemModal";
import FavouriteItemModal from "../modals/FavouriteItemModal";
import TodoEditModal from "../modals/TodoEditModal";

const TodoCard = ({
  topics,
  todo,
  handleDelete,
  handlePermanentDelete,
  handleArchive,
  handleFavourite,
  handleEdit,
  handleTopicUpdate,
}: TodoCardProps) => {
  const [showFooter, setShowFooter] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openRestoreModal, setOpenRestoreModal] = useState(false);
  const [openPermanentDeleteModal, setOpenPermanentDeleteModal] =
    useState(false);
  const [openArchiveModal, setOpenArchiveModal] = useState(false);
  const [openUnarchiveModal, setOpenUnarchiveModal] = useState(false);
  const [openFavouriteModal, setOpenFavouriteModal] = useState(false);
  const [openUnfavouriteModal, setOpenUnfavouriteModal] = useState(false);
  const [openNoteEditModal, setOpenNoteEditModal] = useState(false);
  const { isArchived, isDeleted, isFavourite } = todo;

  return (
    <Card
      className={`border-${todo.color || "primary"} border-t-8 max-h-[350px]`}
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
          {!isDeleted && (
            <TodoEditModal
              open={openNoteEditModal}
              setOpen={setOpenNoteEditModal}
              todo={todo}
              topics={topics}
              handleEdit={handleEdit}
              handleTopicUpdate={handleTopicUpdate}
              handleDelete={handleDelete}
              handleArchive={handleArchive}
              handleFavourite={handleFavourite}
            />
          )}
          {!isDeleted && (
            <DeleteItemModal
              open={openDeleteModal}
              setOpen={setOpenDeleteModal}
              id={todo._id}
              type={todo.type}
              handleDelete={handleDelete}
            />
          )}
          {!isDeleted ? (
            isArchived ? (
              <UnarchiveItemModal
                open={openUnarchiveModal}
                setOpen={setOpenUnarchiveModal}
                id={todo._id}
                type={todo.type}
                handleArchive={handleArchive}
              />
            ) : (
              <ArchiveItemModal
                open={openArchiveModal}
                setOpen={setOpenArchiveModal}
                id={todo._id}
                type={todo.type}
                handleArchive={handleArchive}
              />
            )
          ) : (
            <></>
          )}
          {!isDeleted ? (
            isFavourite ? (
              <UnfavouriteItemModal
                open={openUnfavouriteModal}
                setOpen={setOpenUnfavouriteModal}
                id={todo._id}
                type={todo.type}
                handleFavourite={handleFavourite}
              />
            ) : (
              <FavouriteItemModal
                open={openFavouriteModal}
                setOpen={setOpenFavouriteModal}
                id={todo._id}
                type={todo.type}
                handleFavourite={handleFavourite}
              />
            )
          ) : (
            <></>
          )}
          {isDeleted && (
            <RestoreItemModal
              open={openRestoreModal}
              setOpen={setOpenRestoreModal}
              id={todo._id}
              type={todo.type}
              handleDelete={handleDelete}
            />
          )}
          {isDeleted && (
            <DeletePermanentlyModal
              open={openPermanentDeleteModal}
              setOpen={setOpenPermanentDeleteModal}
              id={todo._id}
              type={todo.type}
              handlePermanentDelete={handlePermanentDelete}
            />
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default TodoCard;

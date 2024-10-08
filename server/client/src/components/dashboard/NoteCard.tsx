import { NoteCardProps } from "@/interfaces/dashboard";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Fragment } from "react/jsx-runtime";
import { FaStickyNote } from "react-icons/fa";
import { formatDate } from "@/utils/dateUtils";
import { useState } from "react";
import DeleteItemModal from "../modals/DeleteItemModal";
import RestoreItemModal from "../modals/RestoreItemModal";
import DeletePermanentlyModal from "../modals/DeletePermanentlyModal";
import UnarchiveItemModal from "../modals/UnarchiveItemModal";
import ArchiveItemModal from "../modals/ArchiveItemModal";
import UnfavouriteItemModal from "../modals/UnfavouriteItemModal";
import FavouriteItemModal from "../modals/FavouriteItemModal";
import NoteViewModal from "../modals/NoteViewModal";
import NoteEditModal from "../modals/NoteEditModal";

const NoteCard = ({
  topics,
  note,
  handleDelete,
  handlePermanentDelete,
  handleArchive,
  handleFavourite,
  handleEdit,
  handleTopicUpdate,
}: NoteCardProps) => {
  const [showFooter, setShowFooter] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openRestoreModal, setOpenRestoreModal] = useState(false);
  const [openPermanentDeleteModal, setOpenPermanentDeleteModal] =
    useState(false);
  const [openArchiveModal, setOpenArchiveModal] = useState(false);
  const [openUnarchiveModal, setOpenUnarchiveModal] = useState(false);
  const [openFavouriteModal, setOpenFavouriteModal] = useState(false);
  const [openUnfavouriteModal, setOpenUnfavouriteModal] = useState(false);
  const [openNoteViewModal, setOpenNoteViewModal] = useState(false);
  const [openNoteEditModal, setOpenNoteEditModal] = useState(false);
  const { isArchived, isDeleted, isFavourite } = note;

  return (
    <Card
      className={`border-${note.color || "primary"} border-t-8 max-h-[350px]`}
      onMouseEnter={() => setShowFooter(true)}
      onMouseLeave={() => setShowFooter(false)}
    >
      <CardHeader className="pb-1">
        <CardTitle className="font-display font-bold text-2xl text-ellipsis overflow-hidden text-nowrap">
          {note.title}
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          <div>{formatDate(note.editedAt)}</div>
          <div className="text-primary">
            <FaStickyNote className="text-lg" />
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[200px] overflow-hidden">
        <p>
          {note.content.split("\n").map((line, index) => (
            <Fragment key={index}>
              <p>{line}</p>
            </Fragment>
          ))}
        </p>
      </CardContent>
      <CardFooter>
        <div
          className={`text-primary flex gap-4 mt-3 text-xl ${
            showFooter ? "visible" : "invisible"
          }`}
        >
          {!isDeleted && (
            <NoteEditModal
              open={openNoteEditModal}
              setOpen={setOpenNoteEditModal}
              note={note}
              handleEdit={handleEdit}
              handleTopicUpdate={handleTopicUpdate}
              topics={topics}
            />
          )}
          {!isDeleted && (
            <NoteViewModal
              open={openNoteViewModal}
              setOpen={setOpenNoteViewModal}
              note={note}
              handleDelete={handleDelete}
              handleArchive={handleArchive}
              handleFavourite={handleFavourite}
            />
          )}
          {!isDeleted && (
            <DeleteItemModal
              open={openDeleteModal}
              setOpen={setOpenDeleteModal}
              id={note._id}
              type={note.type}
              handleDelete={handleDelete}
            />
          )}
          {!isDeleted ? (
            isArchived ? (
              <UnarchiveItemModal
                open={openUnarchiveModal}
                setOpen={setOpenUnarchiveModal}
                id={note._id}
                type={note.type}
                handleArchive={handleArchive}
              />
            ) : (
              <ArchiveItemModal
                open={openArchiveModal}
                setOpen={setOpenArchiveModal}
                id={note._id}
                type={note.type}
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
                id={note._id}
                type={note.type}
                handleFavourite={handleFavourite}
              />
            ) : (
              <FavouriteItemModal
                open={openFavouriteModal}
                setOpen={setOpenFavouriteModal}
                id={note._id}
                type={note.type}
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
              id={note._id}
              type={note.type}
              handleDelete={handleDelete}
            />
          )}
          {isDeleted && (
            <DeletePermanentlyModal
              open={openPermanentDeleteModal}
              setOpen={setOpenPermanentDeleteModal}
              id={note._id}
              type={note.type}
              handlePermanentDelete={handlePermanentDelete}
            />
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default NoteCard;

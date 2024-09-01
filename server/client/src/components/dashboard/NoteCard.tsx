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
import { FaEdit, FaEye, FaStickyNote } from "react-icons/fa";
import { formatDate } from "@/utils/dateUtils";
import { FaHeartCircleMinus, FaHeartCirclePlus } from "react-icons/fa6";
import { useState } from "react";
import DeleteItemModal from "../modals/DeleteItemModal";
import RestoreItemModal from "../modals/RestoreItemModal";
import DeletePermanentlyModal from "../modals/DeletePermanentlyModal";
import UnarchiveItemModal from "../modals/UnarchiveItemModal";
import ArchiveItemModal from "../modals/ArchiveItemModal";

const NoteCard = ({
  note,
  handleDelete,
  handlePermanentDelete,
  handleArchive,
}: NoteCardProps) => {
  const [showFooter, setShowFooter] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openRestoreModal, setOpenRestoreModal] = useState(false);
  const [openPermanentDeleteModal, setOpenPermanentDeleteModal] =
    useState(false);
  const [openArchiveModal, setOpenArchiveModal] = useState(false);
  const [openUnarchiveModal, setOpenUnarchiveModal] = useState(false);
  const { isArchived, isDeleted, isFavourite } = note;

  return (
    <Card
      className={`border-${note.color} border-t-8 max-h-[350px]`}
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
              <br />
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
          {!isDeleted && <FaEdit className="cursor-pointer" />}
          {!isDeleted && <FaEye className="cursor-pointer" />}
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
              <FaHeartCircleMinus className="cursor-pointer" />
            ) : (
              <FaHeartCirclePlus className="cursor-pointer" />
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

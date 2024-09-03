import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { NoteViewModalProps } from "@/interfaces/modals";
import { FaEdit, FaEye } from "react-icons/fa";
import DeleteItemModal from "./DeleteItemModal";
import { useState } from "react";
import UnarchiveItemModal from "./UnarchiveItemModal";
import ArchiveItemModal from "./ArchiveItemModal";
import UnfavouriteItemModal from "./UnfavouriteItemModal";
import FavouriteItemModal from "./FavouriteItemModal";
import { formatDate } from "@/utils/dateUtils";

const NoteViewModal = ({
  open,
  setOpen,
  note,
  handleDelete,
  handleArchive,
  handleFavourite,
}: NoteViewModalProps) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openArchiveModal, setOpenArchiveModal] = useState(false);
  const [openUnarchiveModal, setOpenUnarchiveModal] = useState(false);
  const [openFavouriteModal, setOpenFavouriteModal] = useState(false);
  const [openUnfavouriteModal, setOpenUnfavouriteModal] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const { isArchived, isFavourite } = note;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <FaEye className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="min-w-[950px] border-primary border-t-8">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-bold">
            {note.title}
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className={`h-[15px] w-[15px] rounded-full bg-${note.color}`} />{" "}
          <span>{note.topic}</span>
        </div>
        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
          {note.content}
        </div>
        <DialogFooter className="justify-between ">
          <div className="text-primary flex gap-4 mt-3 text-xl">
            <FaEdit className="cursor-pointer" />
            <DeleteItemModal
              open={openDeleteModal}
              setOpen={setOpenDeleteModal}
              id={note._id}
              type={note.type}
              handleDelete={handleDelete}
            />
            {isArchived ? (
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
            )}
            {isFavourite ? (
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
            )}
          </div>
          <div className="flex gap-4 items-center">
            <p>{formatDate(note.editedAt, true)}</p>
            <Button onClick={handleClose}>Close</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NoteViewModal;

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { NoteEditModalProps } from "@/interfaces/modals";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import { formatDate } from "@/utils/dateUtils";
import UpdateTopicModal from "./UpdateTopicModal";

const NoteEditModal = ({
  open,
  setOpen,
  note,
  topics,
  handleEdit,
  handleTopicUpdate,
}: NoteEditModalProps) => {
  const [openChangeTopicModal, setOpenChangeTopicModal] = useState(false);
  const [noteContent, setNoteContent] = useState(note.content);
  const [noteTitle, setNoteTitle] = useState(note.title);

  const handleEditNote = () => {
    handleEdit(note._id, noteContent, noteTitle);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <FaEdit className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="min-w-[950px] border-primary border-t-8">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-bold">
            <div
              className="focus-visible:outline-none whitespace-pre-line"
              contentEditable
              onBlur={(e) => setNoteTitle(e.currentTarget.innerText)}
              suppressContentEditableWarning
            >
              {note.title}
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div
            className={`h-[15px] w-[15px] rounded-full bg-${
              note.color || "primary"
            }`}
          />{" "}
          <span>{note.topic || "Uncategorized"}</span>{" "}
          <span className="text-primary text-lg">
            <UpdateTopicModal
              open={openChangeTopicModal}
              setOpen={setOpenChangeTopicModal}
              handleTopicChange={handleTopicUpdate}
              itemId={note._id}
              topics={topics}
              selectedTopic={note.topic}
              type={note.type}
            />
          </span>
        </div>
        <div
          className="grid py-4 max-h-[60vh] overflow-y-auto focus-visible:outline-none whitespace-pre-line"
          contentEditable
          onBlur={(e) => setNoteContent(e.currentTarget.innerText)}
          suppressContentEditableWarning
        >
          {note.content}
        </div>
        <DialogFooter className="justify-end ">
          <div className="flex gap-4 items-center">
            <p>{formatDate(note.editedAt, true)}</p>
            <Button type="submit" onClick={handleEditNote}>
              Save
            </Button>
            <Button variant="outline" onClick={handleClose}>
              Close
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NoteEditModal;

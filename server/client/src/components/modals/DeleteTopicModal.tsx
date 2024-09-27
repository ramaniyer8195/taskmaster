import { FaTrash } from "react-icons/fa";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { DeleteTopicModalProps } from "@/interfaces/modals";

const DeleteTopicModal = ({
  open,
  setOpen,
  title,
  topicId,
  handleDeleteTopic: handleDelete,
}: DeleteTopicModalProps) => {
  const handleDeleteTopic = () => {
    handleDelete(topicId);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <FaTrash className=" cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-primary border-t-8">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-bold">
            Delete topic
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p>
            Topic "{title}" will be deleted and all the items linked to this
            topic will be moved to the "Uncategorized" topic.
          </p>
          <p>
            Are you sure you want to delete this topic? This action cannot be
            undone.
          </p>
        </div>
        <DialogFooter className="justify-end">
          <Button type="submit" onClick={handleDeleteTopic}>
            Yes
          </Button>
          <Button variant="outline" onClick={handleClose}>
            No
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTopicModal;

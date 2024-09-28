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
import { DeletePermanentlyModalProps } from "@/interfaces/modals";

const DeletePermanentlyModal = ({
  open,
  setOpen,
  id,
  type,
  handlePermanentDelete,
}: DeletePermanentlyModalProps) => {
  const handleDeletePermanently = () => {
    setOpen(false);
    handlePermanentDelete(type, id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <FaTrash className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-primary border-t-8">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-bold">
            Permanently delete {type}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p>
            Are you sure you want to permanently delete this {type}?. This
            action cannot be undone.
          </p>
        </div>
        <DialogFooter className="justify-end">
          <Button type="submit" onClick={handleDeletePermanently}>
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

export default DeletePermanentlyModal;

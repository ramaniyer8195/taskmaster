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
import { DeleteItemModalProps } from "@/interfaces/modals";

const DeleteItemModal = ({
  open,
  setOpen,
  id,
  type,
  handleDelete,
}: DeleteItemModalProps) => {
  const handleDeleteItem = () => {
    console.log(`Deleted Item`);
    setOpen(false);
    handleDelete(id, true);
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
            Delete {type}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p>
            Deleted items will be kept in trash for 7 days. Access deleted items
            in the deleted tab.
          </p>
          <p>Are you sure you want to delete this {type}?</p>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleDeleteItem}>
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

export default DeleteItemModal;

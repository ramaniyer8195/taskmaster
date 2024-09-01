import { FaTrashRestore } from "react-icons/fa";
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

const RestoreItemModal = ({
  open,
  setOpen,
  id,
  type,
  handleDelete,
}: DeleteItemModalProps) => {
  const handleRestoreItem = () => {
    console.log(`Restored Item`);
    setOpen(false);
    handleDelete(id, false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <FaTrashRestore className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-primary border-t-8">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-bold">
            Restore {type}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p>Are you sure you want to restore this {type}?</p>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleRestoreItem}>
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

export default RestoreItemModal;

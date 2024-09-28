import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ArchiveItemModalProps } from "@/interfaces/modals";
import { RiInboxUnarchiveFill } from "react-icons/ri";

const UnarchiveItemModal = ({
  open,
  setOpen,
  id,
  type,
  handleArchive,
}: ArchiveItemModalProps) => {
  const handleUnarchiveItem = () => {
    setOpen(false);
    handleArchive(type, id, false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <RiInboxUnarchiveFill className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-primary border-t-8">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-bold">
            Unarchive {type}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p>Are you sure you want to unarchive this {type}?</p>
        </div>
        <DialogFooter className="justify-end">
          <Button type="submit" onClick={handleUnarchiveItem}>
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

export default UnarchiveItemModal;

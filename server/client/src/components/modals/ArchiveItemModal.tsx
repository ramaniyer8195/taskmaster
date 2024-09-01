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
import { RiInboxArchiveFill } from "react-icons/ri";

const ArchiveItemModal = ({
  open,
  setOpen,
  id,
  type,
  handleArchive,
}: ArchiveItemModalProps) => {
  const handleArchiveItem = () => {
    console.log(`Archived Item`);
    setOpen(false);
    handleArchive(id, true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <RiInboxArchiveFill className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-primary border-t-8">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-bold">
            Archive {type}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p>
            Archived items will not be visible on your dashboard. Access
            archived items in the archived tab.
          </p>
          <p>Are you sure you want to archive this {type}?</p>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleArchiveItem}>
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

export default ArchiveItemModal;

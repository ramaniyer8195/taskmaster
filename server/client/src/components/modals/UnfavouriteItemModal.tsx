import { FaHeartCircleMinus } from "react-icons/fa6";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { FavouriteItemModalProps } from "@/interfaces/modals";

const UnfavouriteItemModal = ({
  open,
  setOpen,
  id,
  type,
  handleFavourite,
}: FavouriteItemModalProps) => {
  const handleUnfavouriteItem = () => {
    console.log(`UnFavourited Item`);
    setOpen(false);
    handleFavourite(id, false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <FaHeartCircleMinus className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-primary border-t-8">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-bold">
            Unfavourite {type}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p>Are you sure you want to unfavourite this {type}?</p>
        </div>
        <DialogFooter className="justify-end">
          <Button type="submit" onClick={handleUnfavouriteItem}>
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

export default UnfavouriteItemModal;

import { FaHeartCirclePlus } from "react-icons/fa6";
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

const FavouriteItemModal = ({
  open,
  setOpen,
  id,
  type,
  handleFavourite,
}: FavouriteItemModalProps) => {
  const handleFavouriteItem = () => {
    console.log(`Favourited Item`);
    setOpen(false);
    handleFavourite(id, true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <FaHeartCirclePlus className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-primary border-t-8">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-bold">
            Favourite {type}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p>
            Favourited items will be visible in your dashboard. Access all
            favourited items in the favourite tab.
          </p>
          <p>Are you sure you want to favourite this {type}?</p>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleFavouriteItem}>
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

export default FavouriteItemModal;

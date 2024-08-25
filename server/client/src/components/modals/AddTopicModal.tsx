import { FaPlusCircle } from "react-icons/fa";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ModalProps } from "@/interfaces/modals";
import ColorPicker from "./ColorPicker";
import { useState } from "react";
import { TOPIC_COLORS } from "@/constants/constants";

const AddTopicModal = ({ open, setOpen }: ModalProps) => {
  const [selectedColor, setSelectedColor] = useState(
    TOPIC_COLORS.ELECTRIC_BLUE
  );
  const [title, setTitle] = useState("");

  const handleAddTopic = () => {
    console.log(`Add Topic title: ${title} color: ${selectedColor}`);
    setTitle("");
    setSelectedColor(TOPIC_COLORS.ELECTRIC_BLUE);
    setOpen(false);
  };

  const handleClose = () => {
    setTitle("");
    setSelectedColor(TOPIC_COLORS.ELECTRIC_BLUE);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-primary hover:text-primary w-max"
        >
          <div className="flex items-center gap-2">
            <FaPlusCircle className="text-lg" />
            <div>Create New</div>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-primary border-t-8">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-bold">
            Create new topic
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="title">Enter topic title</Label>
            <Input
              id="title"
              className="col-span-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="color">Select topic color</Label>
            <ColorPicker
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleAddTopic}>
            Add
          </Button>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTopicModal;

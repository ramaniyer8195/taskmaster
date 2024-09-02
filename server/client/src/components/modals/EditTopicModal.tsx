import { FaEdit } from "react-icons/fa";
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
import { EditTopicModalProps } from "@/interfaces/modals";
import ColorPicker from "./ColorPicker";
import { useState } from "react";

const EditTopicModal = ({
  open,
  setOpen,
  title,
  color,
}: EditTopicModalProps) => {
  const [topicTitle, setTopicTitle] = useState(title);
  const [selectedColor, setSelectedColor] = useState(color);

  const handleEditTopic = () => {
    console.log(`Add Topic title: ${title} color: ${selectedColor}`);
    setTopicTitle(title);
    setSelectedColor(color);
    setOpen(false);
  };

  const handleClose = () => {
    setTopicTitle(title);
    setSelectedColor(color);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <FaEdit className="cursor-pointer" />
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
              value={topicTitle}
              onChange={(e) => setTopicTitle(e.target.value)}
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
        <DialogFooter className="justify-end">
          <Button type="submit" onClick={handleEditTopic}>
            Save
          </Button>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditTopicModal;

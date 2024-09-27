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
  topic,
  handleEditTopic: handleEdit,
}: EditTopicModalProps) => {
  const { title, color, _id } = topic;
  const [topicTitle, setTopicTitle] = useState(title);
  const [selectedColor, setSelectedColor] = useState(color);
  const [error, setError] = useState("");

  const handleEditTopic = () => {
    if (!topicTitle) {
      setError("Please enter a title");
      return;
    }

    handleEdit(topicTitle, selectedColor, _id);
    setOpen(false);
  };

  const handleClose = () => {
    setTopicTitle(title);
    setSelectedColor(color);
    setOpen(false);
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setTopicTitle(e.target.value);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <FaEdit className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-primary border-t-8">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-bold">
            Edit topic
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="title">Enter topic title</Label>
            <Input
              id="title"
              className="col-span-3"
              value={topicTitle}
              onChange={handleChangeTitle}
            />
            {error !== "" && (
              <p className="text-red-500 text-xs font-bold">{error}</p>
            )}
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

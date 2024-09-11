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
import { Label } from "../ui/label";
import { UpdateTopicModalProps } from "@/interfaces/modals";
import { useState } from "react";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const UpdateTopicModal = ({
  open,
  setOpen,
  topics,
  itemId,
  handleTopicChange,
}: UpdateTopicModalProps) => {
  const [selectedTopic, setSelectedTopic] = useState(topics[0].title);

  const handleChangeTopic = () => {
    const selectedTopicId = topics.filter(
      (topic) => topic.title === selectedTopic
    )[0]._id;
    console.log(
      `update Topic id: ${selectedTopicId} title: ${selectedTopic} for item: ${itemId}`
    );
    handleTopicChange(itemId, selectedTopicId);
    setSelectedTopic(topics[0].title);
    setOpen(false);
  };

  const handleClose = () => {
    setSelectedTopic(topics[0].title);
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
            Update Topic
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="title">Choose the topic</Label>
            <Select
              value={selectedTopic}
              defaultValue="Uncategorized"
              onValueChange={(value) => setSelectedTopic(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Uncategorized">Uncategorized</SelectItem>
                {topics.map((topic) => (
                  <SelectItem key={topic._id} value={topic.title}>
                    {topic.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="justify-end">
          <Button type="submit" onClick={handleChangeTopic}>
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

export default UpdateTopicModal;

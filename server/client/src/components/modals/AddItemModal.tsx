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
import { AddItemModalProps } from "@/interfaces/modals";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const AddItemModal = ({ open, setOpen, topics }: AddItemModalProps) => {
  const [type, setType] = useState("note");
  const [topic, setTopic] = useState("Uncategorized");
  const [title, setTitle] = useState("");

  const handleAddItem = () => {
    console.log(`Added Item type: ${type} topic: ${topic} title: ${title}`);
    setType("note");
    setTopic("Uncategorized");
    setTitle("");
    setOpen(false);
  };

  const handleClose = () => {
    setType("note");
    setTopic("Uncategorized");
    setTitle("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link">
          <div className="flex items-center gap-2">
            <FaPlusCircle className="text-lg" />
            <div>Add New</div>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-primary border-t-8">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-bold">
            Add new Item
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="type">Choose the type</Label>
            <Select
              value={type}
              defaultValue="note"
              onValueChange={(value) => setType(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="note">Note</SelectItem>
                <SelectItem value="todo">Todo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="title">Enter topic title</Label>
            <Select
              value={topic}
              defaultValue="Uncategorized"
              onValueChange={(value) => setTopic(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Uncategorized">Uncategorized</SelectItem>
                {topics.map((topic, id) => (
                  <SelectItem key={id} value={topic.name}>
                    {topic.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="title">Enter topic title</Label>
            <Input
              id="title"
              className="col-span-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleAddItem}>
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

export default AddItemModal;

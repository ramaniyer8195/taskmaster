import { TopicItem } from "./dashboard";

export interface ModalProps {
  open: boolean;
  setOpen: (openState: boolean) => void;
}

export interface EditTopicModalProps extends ModalProps {
  title: string;
  color: string;
}

export interface DeleteTopicModalProps extends ModalProps {
  title: string;
}

export interface AddItemModalProps extends ModalProps {
  topics: TopicItem[];
}

export interface ColorPickerProps {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}

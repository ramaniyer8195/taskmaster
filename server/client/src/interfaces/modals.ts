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

export interface ItemModalProps extends ModalProps {
  id: string;
  type: string;
}

export interface DeleteItemModalProps extends ItemModalProps {
  handleDelete: (id: string, isDeleted: boolean) => void;
}

export interface DeletePermanentlyModalProps extends ItemModalProps {
  handlePermanentDelete: (id: string) => void;
}

export interface ArchiveItemModalProps extends ItemModalProps {
  handleArchive: (id: string, isArchived: boolean) => void;
}

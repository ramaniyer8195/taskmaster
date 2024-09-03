import { Note, Topic } from "./api";

export interface ModalProps {
  open: boolean;
  setOpen: (openState: boolean) => void;
}

export interface EditTopicModalProps extends ModalProps {
  topic: Topic;
}

export interface UpdateTopicModalProps extends ModalProps {
  topics: Topic[];
  itemId: string;
  handleTopicChange: (id: string, topicId: string) => void;
}

export interface DeleteTopicModalProps extends ModalProps {
  title: string;
}

export interface AddItemModalProps extends ModalProps {
  topics: Topic[];
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

export interface FavouriteItemModalProps extends ItemModalProps {
  handleFavourite: (id: string, isFavourite: boolean) => void;
}

export interface NoteViewModalProps extends ModalProps {
  note: Note;
  handleDelete: (id: string, isDeleted: boolean) => void;
  handleArchive: (id: string, isArchived: boolean) => void;
  handleFavourite: (id: string, isFavourite: boolean) => void;
}

export interface NoteEditModalProps extends ModalProps {
  note: Note;
  topics: Topic[];
  handleEdit: (id: string, content: string, title: string) => void;
  handleTopicUpdate: (id: string, topicId: string) => void;
}

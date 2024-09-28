import { Content, Note, Todo, Topic } from "./api";

export interface ModalProps {
  open: boolean;
  setOpen: (openState: boolean) => void;
}

export interface AddTopicModalProps extends ModalProps {
  handleAddTopic: (topicTitle: string, topicColor: string) => void;
}

export interface EditTopicModalProps extends ModalProps {
  topic: Topic;
  handleEditTopic: (
    topicTitle: string,
    topicColor: string,
    topicId: string
  ) => void;
}

export interface UpdateTopicModalProps extends ModalProps {
  topics: Topic[];
  selectedTopic: string | null;
  itemId: string;
  type: string;
  handleTopicChange: (type: string, id: string, topicId: string | null) => void;
}

export interface DeleteTopicModalProps extends ModalProps {
  title: string;
  topicId: string;
  handleDeleteTopic: (topicId: string) => void;
}

export interface AddItemModalProps extends ModalProps {
  topics: Topic[];
  handleAddItem: (title: string, topic: string | null, type: string) => void;
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
  handleDelete: (type: string, id: string, isDeleted: boolean) => void;
}

export interface DeletePermanentlyModalProps extends ItemModalProps {
  handlePermanentDelete: (type: string, id: string) => void;
}

export interface ArchiveItemModalProps extends ItemModalProps {
  handleArchive: (type: string, id: string, isArchived: boolean) => void;
}

export interface FavouriteItemModalProps extends ItemModalProps {
  handleFavourite: (type: string, id: string, isFavourite: boolean) => void;
}

export interface NoteViewModalProps extends ModalProps {
  note: Note;
  handleDelete: (type: string, id: string, isDeleted: boolean) => void;
  handleArchive: (type: string, id: string, isArchived: boolean) => void;
  handleFavourite: (type: string, id: string, isFavourite: boolean) => void;
}

export interface NoteEditModalProps extends ModalProps {
  note: Note;
  topics: Topic[];
  handleEdit: (id: string, content: string, title: string) => void;
  handleTopicUpdate: (type: string, id: string, topicId: string | null) => void;
}

export interface TodoEditModalProps extends ModalProps {
  todo: Todo;
  topics: Topic[];
  handleEdit: (id: string, content: Content[], title: string) => void;
  handleTopicUpdate: (type: string, id: string, topicId: string | null) => void;
  handleDelete: (type: string, id: string, isDeleted: boolean) => void;
  handleArchive: (type: string, id: string, isArchived: boolean) => void;
  handleFavourite: (type: string, id: string, isFavourite: boolean) => void;
}

export interface BaseTodoItemProps {
  item: Content;
  removeItem: (
    isCompleted: boolean,
    isBaseItem: boolean,
    id: string,
    headingId?: string
  ) => void;
  handleCheck: (
    isChecked: boolean,
    isBaseItem: boolean,
    id: string,
    headingId?: string
  ) => void;
  handleTodoEdit: (
    value: string,
    isCompleted: boolean,
    isBaseItem: boolean,
    id: string,
    headingId?: string
  ) => void;
  isPartiallyCompleted?: boolean;
}

export interface SubTodoItemProps {
  item: Content;
  headingId: string;
  removeItem: (
    isCompleted: boolean,
    isBaseItem: boolean,
    id: string,
    headingId?: string
  ) => void;
  handleCheck: (
    isChecked: boolean,
    isBaseItem: boolean,
    id: string,
    headingId?: string
  ) => void;
  handleTodoEdit: (
    value: string,
    isCompleted: boolean,
    isBaseItem: boolean,
    id: string,
    headingId?: string
  ) => void;
}

export interface AddNewItemButtonProps {
  isBaseItem: boolean;
  handleAddNewItem: (isBaseItem: boolean, headingId?: string) => void;
  headingId?: string;
}

export interface AddNewGroupButtonProps {
  handleAddNewGroup: () => void;
}

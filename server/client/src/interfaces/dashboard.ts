import { MouseEvent } from "react";
import { Content, Note, Todo, Topic, User } from "./api";

export enum Menu {
  HOME = "Home",
  FAVOURITES = "Favourites",
  RECENTLY_DELETED = "Recently Deleted",
  ARCHIVE = "Archive",
  SETTINGS = "Settings",
}

export interface MenuItem {
  name: Menu;
  icon: JSX.Element;
  id: number;
}

export interface SidebarProps {
  user: User | null;
  selected: Menu;
  handleMenuChange: (e: MouseEvent<HTMLDivElement>) => void;
  topics: Topic[];
  handleSignOut: () => void;
  handleEditTopic: (
    topicTitle: string,
    topicColor: string,
    topicId: string
  ) => void;
  handleAddTopic: (topicTitle: string, topicColor: string) => void;
  handleDeleteTopic: (topicId: string) => void;
}

export interface TabProps {
  topics: Topic[];
  handleDelete: (type: string, id: string, isDeleted: boolean) => void;
  handleArchive: (type: string, id: string, isArchived: boolean) => void;
  handleFavourite: (type: string, id: string, isFavourite: boolean) => void;
  handleTopicUpdate: (type: string, id: string, topicId: string | null) => void;
  handlePermanentDelete: (type: string, id: string) => void;
  handleNoteEdit: (id: string, content: string, title: string) => void;
  handleTodoEdit: (id: string, content: Content[], title: string) => void;
}

export interface TopicItemProps {
  topic: Topic;
  handleEditTopic: (
    topicTitle: string,
    topicColor: string,
    topicId: string
  ) => void;
  handleDeleteTopic: (topicId: string) => void;
}

interface ItemProps {
  handleDelete: (type: string, id: string, isDeleted: boolean) => void;
  handleArchive: (type: string, id: string, isArchived: boolean) => void;
  handleFavourite: (type: string, id: string, isFavourite: boolean) => void;
  handleTopicUpdate: (type: string, id: string, topicId: string | null) => void;
  handlePermanentDelete: (type: string, id: string) => void;
  topics: Topic[];
}

export interface NoteCardProps extends ItemProps {
  handleEdit: (id: string, content: string, title: string) => void;
  note: Note;
}

export interface TodoCardProps extends ItemProps {
  handleEdit: (id: string, content: Content[], title: string) => void;
  todo: Todo;
}

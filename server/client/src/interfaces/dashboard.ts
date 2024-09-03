import { MouseEvent } from "react";
import { Note, Todo, Topic } from "./api";

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
  selected: Menu;
  handleMenuChange: (e: MouseEvent<HTMLDivElement>) => void;
  topics: Topic[];
  handleSignOut: () => void;
}

export interface TabProps {
  items: (Note | Todo)[];
}

export interface HomeTabProps extends TabProps {
  topics: Topic[];
}

export interface TopicItemProps {
  topic: Topic;
}

interface ItemProps {
  handleEdit: (id: string, content: string, title: string) => void;
  handleDelete: (id: string, isDeleted: boolean) => void;
  handleArchive: (id: string, isArchived: boolean) => void;
  handleFavourite: (id: string, isFavourite: boolean) => void;
  handleTopicUpdate: (id: string, topicId: string) => void;
  handlePermanentDelete: (id: string) => void;
  topics: Topic[];
}

export interface NoteCardProps extends ItemProps {
  note: Note;
}

export interface TodoCardProps extends ItemProps {
  todo: Todo;
}

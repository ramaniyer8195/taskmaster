import { MouseEvent } from "react";
import { Note, Todo } from "./api";

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

export interface TopicItem {
  name: string;
  colorClass: string;
}

export interface SidebarProps {
  selected: Menu;
  handleMenuChange: (e: MouseEvent<HTMLDivElement>) => void;
  topics: TopicItem[];
  handleSignOut: () => void;
}

export interface TabProps {
  items: (Note | Todo)[];
}

export interface HomeTabProps extends TabProps {
  topics: TopicItem[];
}

export interface TopicItemProps {
  topic: TopicItem;
}

interface ItemProps {
  handleEdit: (id: string, content: string) => void;
  handleDelete: (id: string, isDeleted: boolean) => void;
  handleArchive: (id: string, isArchived: boolean) => void;
  handleFavourite: (id: string, isFavourite: boolean) => void;
  handleTopicUpdate: (id: string, topicId: string) => void;
  handlePermanentDelete: (id: string) => void;
}

export interface NoteCardProps extends ItemProps {
  note: Note;
}

export interface TodoCardProps extends ItemProps {
  todo: Todo;
}

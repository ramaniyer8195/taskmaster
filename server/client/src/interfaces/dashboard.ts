import { MouseEvent } from "react";
import { Content, Note, Todo, Topic } from "./api";

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
  handleEditTopic: (
    topicTitle: string,
    topicColor: string,
    topicId: string
  ) => void;
  handleAddTopic: (topicTitle: string, topicColor: string) => void;
  handleDeleteTopic: (topicId: string) => void;
}

export interface TabProps {
  items: (Note | Todo)[];
}

export interface HomeTabProps extends TabProps {
  topics: Topic[];
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
  handleDelete: (id: string, isDeleted: boolean) => void;
  handleArchive: (id: string, isArchived: boolean) => void;
  handleFavourite: (id: string, isFavourite: boolean) => void;
  handleTopicUpdate: (id: string, topicId: string) => void;
  handlePermanentDelete: (id: string) => void;
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

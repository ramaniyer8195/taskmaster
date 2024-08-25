import { MouseEvent } from "react";

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
  items: any[];
}

export interface HomeTabProps extends TabProps {
  topics: TopicItem[];
}

export interface TopicItemProps {
  topic: TopicItem;
}

import { Menu, MenuItem } from "@/interfaces/dashboard";
import { FaHeart, FaHome, FaTrash } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { RiArchive2Fill } from "react-icons/ri";

export const MENU: MenuItem[] = [
  {
    name: Menu.HOME,
    icon: <FaHome />,
    id: 1,
  },
  {
    name: Menu.FAVOURITES,
    icon: <FaHeart />,
    id: 2,
  },
  {
    name: Menu.RECENTLY_DELETED,
    icon: <FaTrash />,
    id: 3,
  },
  {
    name: Menu.ARCHIVE,
    icon: <RiArchive2Fill />,
    id: 4,
  },
  {
    name: Menu.SETTINGS,
    icon: <FaGear />,
    id: 5,
  },
];

export const TOPIC_COLORS = {
  ELECTRIC_BLUE: "electricBlue",
  EMERALD_GREEN: "emeraldGreen",
  DARK_TEAL: "darkTeal",
  SOFT_GOLD: "softGold",
  ROYAL_PURPLE: "royalPurple",
  CRIMSON_RED: "crimsonRed",
  TURQUOISE: "turquoise",
  DEEP_SEA_BLUE: "deepSeaBlue",
  SLATE_GREY: "slateGrey",
  LIME_GREEN: "limeGreen",
  DARK_PLUM: "darkPlum",
  CHARCOAL: "charcoal",
};

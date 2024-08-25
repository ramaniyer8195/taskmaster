import { FaSignOutAlt } from "react-icons/fa";
import userImage from "../../assets/temp/user_img.png";
import { MENU } from "@/constants/constants";
import { SidebarProps } from "@/interfaces/dashboard";
import AddTopicModal from "../modals/AddTopicModal";
import { useState } from "react";
import TopicItem from "./TopicItem";

const Sidebar = ({
  selected,
  handleMenuChange,
  topics,
  handleSignOut,
}: SidebarProps) => {
  const [openTopicModal, setOpenTopicModal] = useState(false);

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-10">
        <div className="flex items-center justify-center gap-3 self-start w-full px-2">
          <img src={userImage} alt="" className="h-[50px] rounded-full" />
          <h2 className="text-xl font-display font-bold text-ellipsis overflow-hidden text-nowrap">
            Anson Abraham
          </h2>
        </div>
        <div className="flex flex-col w-full">
          {MENU.map((menu) =>
            menu.name === selected ? (
              <div
                key={menu.id}
                className="cursor-pointer bg-primary py-3 px-5 flex gap-2 items-center"
                onClick={handleMenuChange}
              >
                <div className="text-white text-lg">{menu.icon}</div>
                <div className="text-white">{menu.name}</div>
              </div>
            ) : (
              <div
                key={menu.id}
                className="cursor-pointer py-3 px-5 flex gap-2 items-center"
                onClick={handleMenuChange}
              >
                <div className="text-primary text-lg">{menu.icon}</div>
                <div className="text-primary">{menu.name}</div>
              </div>
            )
          )}
        </div>
        <div className="flex flex-col gap-3 px-5">
          <h2 className="text-xl font-display font-bold">Topics</h2>
          <div className="flex flex-col gap-2">
            {topics.map((topic, id) => (
              <TopicItem topic={topic} key={id} />
            ))}
          </div>
          <AddTopicModal open={openTopicModal} setOpen={setOpenTopicModal} />
        </div>
      </div>
      <div
        className="cursor-pointer bg-primary py-3 px-5 flex gap-2 items-center justify-center text-white"
        onClick={handleSignOut}
      >
        <FaSignOutAlt className="text-lg" />
        <div>Sign Out</div>
      </div>
    </div>
  );
};

export default Sidebar;

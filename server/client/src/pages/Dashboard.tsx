import { MouseEvent, useState } from "react";
import { Menu, TopicItem } from "@/interfaces/dashboard";
import Sidebar from "@/components/dashboard/Sidebar";
import HomeTab from "@/components/dashboard/HomeTab";
import FavouritesTab from "@/components/dashboard/FavouritesTab";
import RecentlyDeletedTab from "@/components/dashboard/RecentlyDeletedTab";
import ArchiveTab from "@/components/dashboard/ArchiveTab";
import SettingsTab from "@/components/dashboard/SettingsTab";
import { TOPIC_COLORS } from "@/constants/constants";
import { DUMMY_NOTE, DUMMY_TODO } from "@/constants/tempData";

const Dashboard = () => {
  const [selected, setSelected] = useState(Menu.HOME);
  const [topics, setTopics] = useState<TopicItem[]>([
    { name: "Personal", colorClass: TOPIC_COLORS.EMERALD_GREEN },
    { name: "Business", colorClass: TOPIC_COLORS.CHARCOAL },
  ]);

  const handleMenuChange = (e: MouseEvent<HTMLDivElement>) => {
    setSelected(e.currentTarget.innerText as Menu);
  };

  const handleSignOut = () => {
    console.log("Sign out clicked!");
  };

  return (
    <div className="w-[100vw] h-[100vh] flex justify-between">
      <div className="min-w-[15%] pt-5 bg-muted relative">
        <Sidebar
          handleMenuChange={handleMenuChange}
          selected={selected}
          topics={topics}
          handleSignOut={handleSignOut}
        />
      </div>
      <div className="w-[85%] h-full pt-5 px-5">
        {selected === Menu.HOME && (
          <HomeTab topics={topics} items={[DUMMY_NOTE, DUMMY_TODO]} />
        )}
        {selected === Menu.FAVOURITES && <FavouritesTab items={[]} />}
        {selected === Menu.RECENTLY_DELETED && (
          <RecentlyDeletedTab items={[]} />
        )}
        {selected === Menu.ARCHIVE && <ArchiveTab items={[]} />}
        {selected === Menu.SETTINGS && <SettingsTab />}
      </div>
    </div>
  );
};

export default Dashboard;

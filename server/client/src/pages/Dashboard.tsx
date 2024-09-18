import { MouseEvent, useEffect, useState } from "react";
import { Menu } from "@/interfaces/dashboard";
import Sidebar from "@/components/dashboard/Sidebar";
import HomeTab from "@/components/dashboard/HomeTab";
import FavouritesTab from "@/components/dashboard/FavouritesTab";
import RecentlyDeletedTab from "@/components/dashboard/RecentlyDeletedTab";
import ArchiveTab from "@/components/dashboard/ArchiveTab";
import SettingsTab from "@/components/dashboard/SettingsTab";
import { TOPIC_COLORS } from "@/constants/constants";
import {
  DUMMY_NOTE_1,
  DUMMY_NOTE_2,
  DUMMY_TODO_1,
  DUMMY_TODO_2,
} from "@/constants/tempData";
import { Topic } from "@/interfaces/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(Menu.HOME);
  const [topics] = useState<Topic[]>([
    { title: "Personal", color: TOPIC_COLORS.EMERALD_GREEN, _id: "1" },
    { title: "Business", color: TOPIC_COLORS.CHARCOAL, _id: "2" },
  ]);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const res = await axios.get("/api/user/getUser");
        if (res.data.data && !res.data.data.isVerified) {
          navigate("/otpVerify");
        }
      } catch (error) {
        console.error(error);
      }
    };

    getCurrentUser();
  }, []);

  const handleMenuChange = (e: MouseEvent<HTMLDivElement>) => {
    setSelected(e.currentTarget.innerText as Menu);
  };

  const handleSignOut = () => {
    console.log("Sign out clicked!");
  };

  return (
    <div className="w-[97vw] h-[100vh] flex justify-between">
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
          <HomeTab
            topics={topics}
            items={[DUMMY_NOTE_1, DUMMY_TODO_1, DUMMY_NOTE_2, DUMMY_TODO_2]}
          />
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

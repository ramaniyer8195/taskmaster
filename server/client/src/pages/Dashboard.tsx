import { MouseEvent, useEffect, useState } from "react";
import { Menu } from "@/interfaces/dashboard";
import Sidebar from "@/components/dashboard/Sidebar";
import HomeTab from "@/components/dashboard/HomeTab";
import FavouritesTab from "@/components/dashboard/FavouritesTab";
import RecentlyDeletedTab from "@/components/dashboard/RecentlyDeletedTab";
import ArchiveTab from "@/components/dashboard/ArchiveTab";
import SettingsTab from "@/components/dashboard/SettingsTab";
import { Content, Topic, User } from "@/interfaces/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const Dashboard = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(Menu.HOME);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [currUser, setCurrUser] = useState<User | null>(null);

  const getTopics = async () => {
    try {
      const res: { data: { data: (Topic & { userId: string })[] } } =
        await axios.get("/api/topic/getTopics");

      const resTopics: Topic[] = res.data.data.map((topic) => ({
        _id: topic._id,
        title: topic.title,
        color: topic.color,
      }));

      setTopics(resTopics);
    } catch (error) {
      console.error(error);
    }
  };

  const getCurrentUser = async () => {
    try {
      const res: { data: { data: User } } = await axios.get(
        "/api/user/getUser"
      );
      if (res.data.data && !res.data.data.isVerified) {
        navigate("/otpVerify");
      } else if (res.data.data) {
        setCurrUser(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
    if (user !== "") {
      getTopics();
    }
  }, []);

  const handleMenuChange = (e: MouseEvent<HTMLDivElement>) => {
    setSelected(e.currentTarget.innerText as Menu);
  };

  const handleEditTopic = async (
    topicTitle: string,
    topicColor: string,
    topicId: string
  ) => {
    try {
      await axios.put("/api/topic/modifyTopic", {
        title: topicTitle,
        color: topicColor,
        topicId,
      });

      getTopics();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTopic = async (topicTitle: string, topicColor: string) => {
    try {
      await axios.post("/api/topic/addTopic", {
        title: topicTitle,
        color: topicColor,
      });

      getTopics();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTopic = async (topicId: string) => {
    try {
      await axios.delete("/api/topic/deleteTopic", {
        data: { topicId },
      });

      getTopics();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await axios.get("/api/user/signout");
      setUser("");

      navigate("/signIn", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  const handleArchive = (id: string, isArchived: boolean) => {
    console.log(id, isArchived);
  };

  const handleDelete = (id: string, isDeleted: boolean) => {
    console.log(id, isDeleted);
  };

  const handleNoteEdit = (id: string, content: string, title: string) => {
    console.log(id, content, title);
  };

  const handleTodoEdit = (id: string, content: Content[], title: string) => {
    console.log(id, content, title);
  };

  const handleFavourite = (id: string, isFavourite: boolean) => {
    console.log(id, isFavourite);
  };

  const handlePermanentDelete = (id: string) => {
    console.log(id);
  };

  const handleTopicUpdate = (id: string, topicId: string) => {
    console.log(id, topicId);
  };

  return (
    <div className="w-[97vw] h-[100vh] flex justify-between">
      <div className="min-w-[15%] pt-5 bg-muted relative">
        <Sidebar
          user={currUser}
          handleMenuChange={handleMenuChange}
          selected={selected}
          topics={topics}
          handleSignOut={handleSignOut}
          handleEditTopic={handleEditTopic}
          handleAddTopic={handleAddTopic}
          handleDeleteTopic={handleDeleteTopic}
        />
      </div>
      <div className="w-[85%] h-full pt-5 px-5">
        {selected === Menu.HOME && (
          <HomeTab
            topics={topics}
            handleArchive={handleArchive}
            handleDelete={handleDelete}
            handleNoteEdit={handleNoteEdit}
            handleTodoEdit={handleTodoEdit}
            handleFavourite={handleFavourite}
            handlePermanentDelete={handlePermanentDelete}
            handleTopicUpdate={handleTopicUpdate}
          />
        )}
        {selected === Menu.FAVOURITES && (
          <FavouritesTab
            topics={topics}
            handleArchive={handleArchive}
            handleDelete={handleDelete}
            handleNoteEdit={handleNoteEdit}
            handleTodoEdit={handleTodoEdit}
            handleFavourite={handleFavourite}
            handlePermanentDelete={handlePermanentDelete}
            handleTopicUpdate={handleTopicUpdate}
          />
        )}
        {selected === Menu.RECENTLY_DELETED && (
          <RecentlyDeletedTab
            topics={topics}
            handleArchive={handleArchive}
            handleDelete={handleDelete}
            handleNoteEdit={handleNoteEdit}
            handleTodoEdit={handleTodoEdit}
            handleFavourite={handleFavourite}
            handlePermanentDelete={handlePermanentDelete}
            handleTopicUpdate={handleTopicUpdate}
          />
        )}
        {selected === Menu.ARCHIVE && (
          <ArchiveTab
            topics={topics}
            handleArchive={handleArchive}
            handleDelete={handleDelete}
            handleNoteEdit={handleNoteEdit}
            handleTodoEdit={handleTodoEdit}
            handleFavourite={handleFavourite}
            handlePermanentDelete={handlePermanentDelete}
            handleTopicUpdate={handleTopicUpdate}
          />
        )}
        {selected === Menu.SETTINGS && (
          <SettingsTab user={currUser} getCurrentUser={getCurrentUser} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;

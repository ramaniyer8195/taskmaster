import { TopicItemProps } from "@/interfaces/dashboard";
import { useState } from "react";
import EditTopicModal from "../modals/EditTopicModal";
import DeleteTopicModal from "../modals/DeleteTopicModal";

const TopicItem = ({
  topic,
  handleEditTopic,
  handleDeleteTopic,
}: TopicItemProps) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <div className="flex justify-between items-center">
      <div className="px-4 flex gap-2 items-center">
        <div className={`w-[15px] h-[15px] bg-${topic.color} rounded-full`} />
        <div>{topic.title}</div>
      </div>
      <div className="flex gap-2 text-primary">
        <EditTopicModal
          open={openEditModal}
          setOpen={setOpenEditModal}
          topic={topic}
          handleEditTopic={handleEditTopic}
        />
        <DeleteTopicModal
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
          title={topic.title}
          topicId={topic._id}
          handleDeleteTopic={handleDeleteTopic}
        />
      </div>
    </div>
  );
};

export default TopicItem;

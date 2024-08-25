import { TopicItemProps } from "@/interfaces/dashboard";
import { useState } from "react";
import EditTopicModal from "../modals/EditTopicModal";
import DeleteTopicModal from "../modals/DeleteTopicModal";

const TopicItem = ({ topic }: TopicItemProps) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <div className="flex justify-between items-center">
      <div className="px-4 flex gap-2 items-center">
        <div
          className={`w-[15px] h-[15px] bg-${topic.colorClass} rounded-full`}
        />
        <div>{topic.name}</div>
      </div>
      <div className="flex gap-2 text-primary">
        <EditTopicModal
          open={openEditModal}
          setOpen={setOpenEditModal}
          title={topic.name}
          color={topic.colorClass}
        />
        <DeleteTopicModal
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
          title={topic.name}
        />
      </div>
    </div>
  );
};

export default TopicItem;

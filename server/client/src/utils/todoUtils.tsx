import { Checkbox } from "@/components/ui/checkbox";
import { BaseContent, Content, HeadingContent } from "@/interfaces/api";

export const isHeading = (content: Content): content is HeadingContent => {
  if ("subList" in content) return true;
  return false;
};

export const sortContent = (content: Content[]) => {
  const completed: Content[] = [];
  const notCompleted: Content[] = [];

  content.forEach((item) => {
    if (item.isCompleted) {
      completed.push(item);
    } else {
      if (isHeading(item)) {
        const completedSubList: Content[] = [];
        const notCompletedSubList: Content[] = [];

        item.subList.forEach((subItem) => {
          if (subItem.isCompleted) {
            completedSubList.push(subItem);
          } else {
            notCompletedSubList.push(subItem);
          }
        });

        if (completedSubList.length > 0) {
          completed.push({ ...item, subList: completedSubList });
        }

        notCompleted.push({ ...item, subList: notCompletedSubList });
      } else {
        notCompleted.push(item);
      }
    }
  });

  return {
    completed,
    notCompleted,
  };
};

const getHeadingContent = (content: HeadingContent, isComplete: boolean) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-2 items-center">
        <Checkbox id={content.contentId} checked={isComplete} />
        <label
          htmlFor={content.contentId}
          className={`text-lg ${
            content.isCompleted
              ? "line-through text-gray-400"
              : isComplete
              ? "text-gray-400"
              : ""
          }`}
        >
          {content.value}
        </label>
      </div>
      <div className="ml-6">
        {content.subList.map((item, id) => {
          return (
            <div key={id} className="flex gap-2 items-center">
              <Checkbox id={item.contentId} checked={item.isCompleted} />
              <label
                htmlFor={item.contentId}
                className={`${
                  item.isCompleted ? "line-through text-gray-400" : ""
                }`}
              >
                {item.value}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const getBaseContent = (content: BaseContent) => {
  return (
    <div className="flex gap-2 items-center">
      <Checkbox id={content.contentId} checked={content.isCompleted} />
      <label
        htmlFor={content.contentId}
        className={`${content.isCompleted ? "line-through text-gray-400" : ""}`}
      >
        {content.value}
      </label>
    </div>
  );
};

export const getContent = (content: Content[]) => {
  const { completed, notCompleted } = sortContent(content);

  return (
    <div className="flex flex-col gap-2">
      {notCompleted.map((item) => {
        if (isHeading(item)) {
          return getHeadingContent(item, false);
        } else {
          return getBaseContent(item);
        }
      })}
      {completed.length > 0 && notCompleted.length > 0 && (
        <div className="bg-primary h-[1px] w-full my-2" />
      )}
      {completed.length > 0 && (
        <>
          {completed.map((item) => {
            if (isHeading(item)) {
              return getHeadingContent(item, true);
            } else {
              return getBaseContent(item);
            }
          })}
        </>
      )}
    </div>
  );
};

export const generateNewId = () => {
  return crypto.randomUUID();
};

export const buildTodoContent = (todos: {
  completedTodos: Content[];
  incompletedTodos: Content[];
}) => {
  const { completedTodos, incompletedTodos } = todos;
  let todoContent = [...incompletedTodos];

  completedTodos.forEach((item) => {
    if (isHeading(item)) {
      const existingItem = todoContent.find(
        (content) => content.contentId === item.contentId
      );

      if (existingItem && isHeading(existingItem)) {
        todoContent = todoContent.map((content) => {
          if (content.contentId === item.contentId && isHeading(content)) {
            return {
              ...content,
              subList: [...content.subList, ...item.subList],
            };
          } else {
            return content;
          }
        });
      } else {
        todoContent.push(item);
      }
    } else {
      todoContent.push(item);
    }
  });

  return todoContent;
};

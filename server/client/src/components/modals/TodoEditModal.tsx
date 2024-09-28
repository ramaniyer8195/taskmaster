import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { TodoEditModalProps } from "@/interfaces/modals";
import { FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import { formatDate } from "@/utils/dateUtils";
import UpdateTopicModal from "./UpdateTopicModal";
import FavouriteItemModal from "./FavouriteItemModal";
import UnfavouriteItemModal from "./UnfavouriteItemModal";
import ArchiveItemModal from "./ArchiveItemModal";
import UnarchiveItemModal from "./UnarchiveItemModal";
import DeleteItemModal from "./DeleteItemModal";
import AddNewItemButton from "./AddNewItemButton";
import AddNewGroupButton from "./AddNewGroupButton";
import BaseTodoItem from "./BaseTodoItem";
import SubTodoItem from "./SubTodoItem";
import {
  buildTodoContent,
  generateNewId,
  isHeading,
  sortContent,
} from "@/utils/todoUtils";
import { filter } from "lodash";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const TodoEditModal = ({
  open,
  setOpen,
  todo,
  topics,
  handleEdit,
  handleTopicUpdate,
  handleDelete,
  handleArchive,
  handleFavourite,
}: TodoEditModalProps) => {
  const [openChangeTopicModal, setOpenChangeTopicModal] = useState(false);
  const [todos, setTodos] = useState({
    completedTodos: sortContent(todo.content).completed,
    incompletedTodos: sortContent(todo.content).notCompleted,
  });
  const [todoTitle, setTodoTitle] = useState(todo.title);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openArchiveModal, setOpenArchiveModal] = useState(false);
  const [openUnarchiveModal, setOpenUnarchiveModal] = useState(false);
  const [openFavouriteModal, setOpenFavouriteModal] = useState(false);
  const [openUnfavouriteModal, setOpenUnfavouriteModal] = useState(false);

  useEffect(() => {
    const todoContent = buildTodoContent(todos);
    handleEdit(todo._id, todoContent, todoTitle);
  }, [todos, todoTitle, handleEdit, todo]);

  const handleAddNewItem = (isBaseItem: boolean, headingId = "") => {
    if (isBaseItem) {
      setTodos({
        ...todos,
        incompletedTodos: [
          ...todos.incompletedTodos,
          { contentId: generateNewId(), isCompleted: false, value: "" },
        ],
      });
    } else {
      const headingItem = todos.incompletedTodos.find(
        (item) => item.contentId === headingId
      );

      if (headingItem && isHeading(headingItem)) {
        headingItem.subList.push({
          contentId: generateNewId(),
          isCompleted: false,
          value: "",
        });

        const updatedTodos = todos.incompletedTodos.map((item) => {
          if (item.contentId === headingId) {
            return headingItem;
          } else {
            return item;
          }
        });

        setTodos({
          ...todos,
          incompletedTodos: updatedTodos,
        });
      }
    }
  };

  const handleAddNewGroup = () => {
    setTodos({
      ...todos,
      incompletedTodos: [
        ...todos.incompletedTodos,
        {
          contentId: generateNewId(),
          isCompleted: false,
          value: "",
          subList: [],
        },
      ],
    });
  };

  const removeItem = (
    isCompleted: boolean,
    isBaseItem: boolean,
    id: string,
    headingId = ""
  ) => {
    if (isBaseItem) {
      if (isCompleted) {
        setTodos({
          ...todos,
          completedTodos: filter(
            todos.completedTodos,
            (item) => item.contentId !== id
          ),
        });
      } else {
        setTodos({
          ...todos,
          incompletedTodos: filter(
            todos.incompletedTodos,
            (item) => item.contentId !== id
          ),
        });
      }
    } else {
      if (isCompleted) {
        const updatedTodos = todos.completedTodos.map((item) => {
          if (item.contentId === headingId && isHeading(item)) {
            return {
              ...item,
              subList: filter(
                item.subList,
                (subItem) => subItem.contentId !== id
              ),
            };
          } else {
            return item;
          }
        });

        setTodos({ ...todos, completedTodos: updatedTodos });
      } else {
        const updatedTodos = todos.incompletedTodos.map((item) => {
          if (item.contentId === headingId && isHeading(item)) {
            return {
              ...item,
              subList: filter(
                item.subList,
                (subItem) => subItem.contentId !== id
              ),
            };
          } else {
            return item;
          }
        });

        setTodos({ ...todos, incompletedTodos: updatedTodos });
      }
    }
  };

  const handleCheck = (
    isChecked: boolean,
    isBaseItem: boolean,
    id: string,
    headingId = ""
  ) => {
    if (isChecked) {
      if (isBaseItem) {
        const item = todos.incompletedTodos.find(
          (item) => item.contentId === id
        );

        let updatedCompletedTodos = todos.completedTodos;

        if (item) {
          if (!isHeading(item)) {
            item.isCompleted = true;
            updatedCompletedTodos = [...todos.completedTodos, item];
          } else {
            item.isCompleted = true;
            item.subList.forEach((subItem) => {
              subItem.isCompleted = true;
            });

            const isPresentInCompleted = todos.completedTodos.find(
              (completedItem) => item.contentId === completedItem.contentId
            );

            if (isPresentInCompleted) {
              updatedCompletedTodos = todos.completedTodos.map(
                (completedItem) => {
                  if (
                    completedItem.contentId === item.contentId &&
                    isHeading(completedItem)
                  ) {
                    return {
                      ...completedItem,
                      isCompleted: true,
                      subList: [...completedItem.subList, ...item.subList],
                    };
                  } else {
                    return completedItem;
                  }
                }
              );
            } else {
              updatedCompletedTodos = [...todos.completedTodos, item];
            }
          }

          setTodos({
            completedTodos: updatedCompletedTodos,
            incompletedTodos: filter(
              todos.incompletedTodos,
              (item) => item.contentId !== id
            ),
          });
        }
      } else {
        const item = todos.incompletedTodos.find(
          (item) => item.contentId === headingId
        );

        if (item && isHeading(item)) {
          const subItem = item.subList.find(
            (subItem) => subItem.contentId === id
          );

          if (subItem) {
            subItem.isCompleted = true;
            const isPresentInCompleted = todos.completedTodos.find(
              (item) => item.contentId === headingId
            );

            if (isPresentInCompleted) {
              const updatedCompletedTodos = todos.completedTodos.map((item) => {
                if (isHeading(item) && item.contentId === headingId) {
                  return {
                    ...item,
                    subList: [...item.subList, subItem],
                  };
                } else {
                  return item;
                }
              });

              const updatedIncompletedTodos = todos.incompletedTodos.map(
                (item) => {
                  if (isHeading(item) && item.contentId === headingId) {
                    return {
                      ...item,
                      subList: filter(
                        item.subList,
                        (subItem) => subItem.contentId !== id
                      ),
                    };
                  } else {
                    return item;
                  }
                }
              );

              setTodos({
                completedTodos: updatedCompletedTodos,
                incompletedTodos: updatedIncompletedTodos,
              });
            } else {
              const updatedIncompletedTodos = todos.incompletedTodos.map(
                (item) => {
                  if (isHeading(item) && item.contentId === headingId) {
                    return {
                      ...item,
                      subList: filter(
                        item.subList,
                        (subItem) => subItem.contentId !== id
                      ),
                    };
                  } else {
                    return item;
                  }
                }
              );

              setTodos({
                completedTodos: [
                  ...todos.completedTodos,
                  {
                    contentId: headingId,
                    isCompleted: false,
                    value: item.value || "",
                    subList: [subItem],
                  },
                ],
                incompletedTodos: updatedIncompletedTodos,
              });
            }
          }
        }
      }
    } else {
      if (isBaseItem) {
        const item = todos.completedTodos.find((item) => item.contentId === id);

        let updatedIncompletedTodos = todos.incompletedTodos;
        if (item) {
          if (!isHeading(item)) {
            item.isCompleted = false;
            updatedIncompletedTodos = [...todos.incompletedTodos, item];
          } else {
            item.isCompleted = false;
            item.subList.forEach((subItem) => {
              subItem.isCompleted = false;
            });

            const isPresentInNotCompleted = todos.incompletedTodos.find(
              (incompletedItem) => item.contentId === incompletedItem.contentId
            );

            if (isPresentInNotCompleted) {
              updatedIncompletedTodos = todos.incompletedTodos.map(
                (incompletedItem) => {
                  if (
                    incompletedItem.contentId === item.contentId &&
                    isHeading(incompletedItem)
                  ) {
                    return {
                      ...incompletedItem,
                      subList: [...incompletedItem.subList, ...item.subList],
                    };
                  } else {
                    return incompletedItem;
                  }
                }
              );
            } else {
              updatedIncompletedTodos = [...todos.incompletedTodos, item];
            }
          }

          setTodos({
            incompletedTodos: updatedIncompletedTodos,
            completedTodos: filter(
              todos.completedTodos,
              (item) => item.contentId !== id
            ),
          });
        }
      } else {
        const item = todos.completedTodos.find(
          (item) => item.contentId === headingId
        );

        if (item && isHeading(item)) {
          const subItem = item.subList.find(
            (subItem) => subItem.contentId === id
          );

          if (subItem) {
            item.isCompleted = false;
            subItem.isCompleted = false;
            const isPresentInNotCompleted = todos.incompletedTodos.find(
              (item) => item.contentId === headingId
            );

            if (isPresentInNotCompleted) {
              const updatedIncompletedTodos = todos.incompletedTodos.map(
                (item) => {
                  if (isHeading(item) && item.contentId === headingId) {
                    return {
                      ...item,
                      subList: subItem
                        ? [...item.subList, subItem]
                        : item.subList,
                    };
                  } else {
                    return item;
                  }
                }
              );

              const updatedCompletedTodos = todos.completedTodos
                .map((item) => {
                  if (isHeading(item) && item.contentId === headingId) {
                    return {
                      ...item,
                      subList: filter(
                        item.subList,
                        (subItem) => subItem.contentId !== id
                      ),
                    };
                  } else {
                    return item;
                  }
                })
                .filter(
                  (item) =>
                    (isHeading(item) && item.subList.length > 0) ||
                    !isHeading(item)
                );

              setTodos({
                completedTodos: updatedCompletedTodos,
                incompletedTodos: updatedIncompletedTodos,
              });
            } else {
              const updatedCompletedTodos = todos.completedTodos.map((item) => {
                if (isHeading(item) && item.contentId === headingId) {
                  return {
                    ...item,
                    subList: filter(
                      item.subList,
                      (subItem) => subItem.contentId !== id
                    ),
                  };
                } else {
                  return item;
                }
              });

              setTodos({
                completedTodos: updatedCompletedTodos,
                incompletedTodos: [
                  ...todos.incompletedTodos,
                  {
                    contentId: headingId,
                    isCompleted: false,
                    value: item.value,
                    subList: [subItem],
                  },
                ],
              });
            }
          }
        }
      }
    }
  };

  const handleTodoEdit = (
    value: string,
    isCompleted: boolean,
    isBaseItem: boolean,
    id: string,
    headingId = ""
  ) => {
    if (isCompleted) {
      if (isBaseItem) {
        const updatedTodos = todos.completedTodos.map((item) => {
          if (item.contentId === id) {
            return {
              ...item,
              value: value,
            };
          } else {
            return item;
          }
        });

        setTodos({ ...todos, completedTodos: updatedTodos });
      } else {
        const updatedTodos = todos.completedTodos.map((item) => {
          if (item.contentId === headingId && isHeading(item)) {
            const updatedSubList = item.subList.map((subItem) => {
              if (subItem.contentId === id) {
                return {
                  ...subItem,
                  value: value,
                };
              } else {
                return subItem;
              }
            });
            return {
              ...item,
              subList: updatedSubList,
            };
          } else {
            return item;
          }
        });

        setTodos({ ...todos, completedTodos: updatedTodos });
      }
    } else {
      if (isBaseItem) {
        const updatedTodos = todos.incompletedTodos.map((item) => {
          if (item.contentId === id) {
            return {
              ...item,
              value: value,
            };
          } else {
            return item;
          }
        });

        setTodos({ ...todos, incompletedTodos: updatedTodos });
      } else {
        const updatedTodos = todos.incompletedTodos.map((item) => {
          if (item.contentId === headingId && isHeading(item)) {
            const updatedSubList = item.subList.map((subItem) => {
              if (subItem.contentId === id) {
                return {
                  ...subItem,
                  value: value,
                };
              } else {
                return subItem;
              }
            });
            return {
              ...item,
              subList: updatedSubList,
            };
          } else {
            return item;
          }
        });

        setTodos({ ...todos, incompletedTodos: updatedTodos });
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { isArchived, isFavourite } = todo;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <FaEdit className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="min-w-[650px] border-primary border-t-8">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-bold">
            <div
              className="focus-visible:outline-none whitespace-pre-line"
              contentEditable
              onBlur={(e) => setTodoTitle(e.currentTarget.innerText)}
              suppressContentEditableWarning
            >
              {todo.title}
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div
            className={`h-[15px] w-[15px] rounded-full bg-${
              todo.color || "primary"
            }`}
          />{" "}
          <span>{todo.topic || "Uncategorized"}</span>{" "}
          <span className="text-primary text-lg">
            <UpdateTopicModal
              open={openChangeTopicModal}
              setOpen={setOpenChangeTopicModal}
              handleTopicChange={handleTopicUpdate}
              itemId={todo._id}
              topics={topics}
              selectedTopic={todo.topic}
              type={todo.type}
            />
          </span>
        </div>
        <div className="flex flex-col gap-2 w-full max-h-[60vh] overflow-y-auto">
          <div>
            {todos.incompletedTodos.map((item) => {
              if (isHeading(item)) {
                return (
                  <div>
                    <BaseTodoItem
                      handleCheck={handleCheck}
                      handleTodoEdit={handleTodoEdit}
                      item={item}
                      removeItem={removeItem}
                      key={item.contentId}
                    />
                    {item.subList.map((subItem) => {
                      return (
                        <SubTodoItem
                          handleCheck={handleCheck}
                          handleTodoEdit={handleTodoEdit}
                          item={subItem}
                          removeItem={removeItem}
                          headingId={item.contentId}
                          key={item.contentId}
                        />
                      );
                    })}
                    <AddNewItemButton
                      handleAddNewItem={handleAddNewItem}
                      isBaseItem={false}
                      headingId={item.contentId}
                      key={item.contentId}
                    />
                  </div>
                );
              } else {
                return (
                  <BaseTodoItem
                    handleCheck={handleCheck}
                    handleTodoEdit={handleTodoEdit}
                    item={item}
                    removeItem={removeItem}
                    key={item.contentId}
                  />
                );
              }
            })}

            <p>
              <AddNewItemButton
                handleAddNewItem={handleAddNewItem}
                isBaseItem={true}
              />
            </p>
            <p>
              <AddNewGroupButton handleAddNewGroup={handleAddNewGroup} />
            </p>
          </div>
          <div className="h-[1px] w-full bg-primary" />
          <div className="w-[99%]">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Completed</AccordionTrigger>
                <AccordionContent>
                  {todos.completedTodos.map((item) => {
                    if (isHeading(item)) {
                      return (
                        <div>
                          <BaseTodoItem
                            handleCheck={handleCheck}
                            handleTodoEdit={handleTodoEdit}
                            item={item}
                            removeItem={removeItem}
                            key={item.contentId}
                            isPartiallyCompleted
                          />
                          {item.subList.map((subItem) => {
                            return (
                              <SubTodoItem
                                handleCheck={handleCheck}
                                handleTodoEdit={handleTodoEdit}
                                item={subItem}
                                removeItem={removeItem}
                                headingId={item.contentId}
                                key={item.contentId}
                              />
                            );
                          })}
                        </div>
                      );
                    } else {
                      return (
                        <BaseTodoItem
                          handleCheck={handleCheck}
                          handleTodoEdit={handleTodoEdit}
                          item={item}
                          removeItem={removeItem}
                          key={item.contentId}
                        />
                      );
                    }
                  })}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <DialogFooter className="justify-between ">
          <div className="text-primary flex gap-4 mt-3 text-xl">
            <DeleteItemModal
              open={openDeleteModal}
              setOpen={setOpenDeleteModal}
              id={todo._id}
              type={todo.type}
              handleDelete={handleDelete}
            />
            {isArchived ? (
              <UnarchiveItemModal
                open={openUnarchiveModal}
                setOpen={setOpenUnarchiveModal}
                id={todo._id}
                type={todo.type}
                handleArchive={handleArchive}
              />
            ) : (
              <ArchiveItemModal
                open={openArchiveModal}
                setOpen={setOpenArchiveModal}
                id={todo._id}
                type={todo.type}
                handleArchive={handleArchive}
              />
            )}
            {isFavourite ? (
              <UnfavouriteItemModal
                open={openUnfavouriteModal}
                setOpen={setOpenUnfavouriteModal}
                id={todo._id}
                type={todo.type}
                handleFavourite={handleFavourite}
              />
            ) : (
              <FavouriteItemModal
                open={openFavouriteModal}
                setOpen={setOpenFavouriteModal}
                id={todo._id}
                type={todo.type}
                handleFavourite={handleFavourite}
              />
            )}
          </div>
          <div className="flex gap-4 items-center">
            <p>{formatDate(todo.editedAt, true)}</p>
            <Button onClick={handleClose}>Close</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TodoEditModal;

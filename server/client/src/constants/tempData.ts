export const DUMMY_NOTE = {
  _id: "0123456789",
  title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dui felis, rhoncus vitae metus eu, consectetur fringilla elit. Nunc quis mi ligula. Donec tristique tortor et justo vulputate tempus. Nunc et pharetra nisi. Curabitur ornare ante nec mi hendrerit, at ultrices sapien cursus. Cras non turpis at libero sagittis pulvinar. Integer venenatis a lorem vitae efficitur. Curabitur urna nisl, suscipit dapibus tincidunt vitae, bibendum eu purus. Integer nibh augue, pellentesque vel faucibus eget, ornare eget tellus. Maecenas rhoncus, diam non sagittis lobortis, turpis lorem efficitur nisl, eu ultrices sapien est eu dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent volutpat enim tristique dolor fermentum tristique.\nAenean est lorem, iaculis ut urna eget, laoreet tincidunt magna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec libero nisi, pellentesque vehicula velit nec, euismod hendrerit arcu. Aenean tempus, purus nec pretium interdum, velit sapien rutrum lorem, sed placerat neque est in dui. Nam tincidunt enim a lacus pellentesque laoreet. Praesent interdum, nisl vel congue laoreet, nibh magna aliquet lacus, in facilisis ante arcu nec ex. Proin mauris lectus, iaculis in vestibulum efficitur, semper id metus. Sed ac mi mi. Aenean varius vitae urna nec convallis.`,
  createdAt: new Date(),
  editedAt: new Date(),
  isDeleted: false,
  isArchived: false,
  isFavourite: false,
  topic: "Personal",
  color: "deepSeaBlue",
  type: "note",
};

export const DUMMY_TODO = {
  _id: "1234567890",
  title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  content: [
    {
      value: "Ingredients",
      isCompleted: false,
      id: "1",
      subList: [
        { value: "Wheat", isCompleted: true, id: "1.1" },
        { value: "Eggs", isCompleted: true, id: "1.2" },
        { value: "Whipped Cream", isCompleted: false, id: "1.3" },
      ],
    },
    { value: "Instructions", isCompleted: true, id: "2" },
  ],
  createdAt: new Date(),
  editedAt: new Date(),
  isDeleted: false,
  isArchived: false,
  isFavourite: false,
  topic: "Business",
  color: "crimsonRed",
  type: "todo",
};

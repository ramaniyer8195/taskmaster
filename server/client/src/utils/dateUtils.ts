export const formatDate = (date: Date, isEditDate = false): string => {
  const day = date.getDate();
  const month = date.toLocaleString("default", {
    month: isEditDate ? "short" : "long",
  });
  const year = date.getFullYear();

  // if edit date then we need this data
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 || 12;

  const getOrdinalSuffix = (day: number) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const ordinalSuffix = getOrdinalSuffix(day);

  let formattedDate = "";

  if (isEditDate) {
    formattedDate = `Edited ${day}${ordinalSuffix} ${month} ${formattedHours}:${minutes}${ampm}`;
  } else {
    formattedDate = `${day}${ordinalSuffix} ${month} ${year}`;
  }

  return formattedDate;
};

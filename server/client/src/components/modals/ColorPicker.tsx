import { TOPIC_COLORS } from "@/constants/constants";
import { ColorPickerProps } from "@/interfaces/modals";

const ColorPicker = ({ selectedColor, setSelectedColor }: ColorPickerProps) => {
  return (
    <div className="grid grid-cols-6 gap-4 mt-3">
      <div
        className={`cursor-pointer h-[45px] w-[45px] bg-${
          TOPIC_COLORS.ELECTRIC_BLUE
        } border-primary ${
          selectedColor === TOPIC_COLORS.ELECTRIC_BLUE
            ? "border-4"
            : "border-none"
        }`}
        onClick={() => setSelectedColor(TOPIC_COLORS.ELECTRIC_BLUE)}
      ></div>
      <div
        className={`cursor-pointer h-[45px] w-[45px] bg-${
          TOPIC_COLORS.EMERALD_GREEN
        } border-primary ${
          selectedColor === TOPIC_COLORS.EMERALD_GREEN
            ? "border-4"
            : "border-none"
        }`}
        onClick={() => setSelectedColor(TOPIC_COLORS.EMERALD_GREEN)}
      ></div>
      <div
        className={`cursor-pointer h-[45px] w-[45px] bg-${
          TOPIC_COLORS.DARK_TEAL
        } border-primary ${
          selectedColor === TOPIC_COLORS.DARK_TEAL ? "border-4" : "border-none"
        }`}
        onClick={() => setSelectedColor(TOPIC_COLORS.DARK_TEAL)}
      ></div>
      <div
        className={`cursor-pointer h-[45px] w-[45px] bg-${
          TOPIC_COLORS.SOFT_GOLD
        } border-primary ${
          selectedColor === TOPIC_COLORS.SOFT_GOLD ? "border-4" : "border-none"
        }`}
        onClick={() => setSelectedColor(TOPIC_COLORS.SOFT_GOLD)}
      ></div>
      <div
        className={`cursor-pointer h-[45px] w-[45px] bg-${
          TOPIC_COLORS.ROYAL_PURPLE
        } border-primary ${
          selectedColor === TOPIC_COLORS.ROYAL_PURPLE
            ? "border-4"
            : "border-none"
        }`}
        onClick={() => setSelectedColor(TOPIC_COLORS.ROYAL_PURPLE)}
      ></div>
      <div
        className={`cursor-pointer h-[45px] w-[45px] bg-${
          TOPIC_COLORS.CRIMSON_RED
        } border-primary ${
          selectedColor === TOPIC_COLORS.CRIMSON_RED
            ? "border-4"
            : "border-none"
        }`}
        onClick={() => setSelectedColor(TOPIC_COLORS.CRIMSON_RED)}
      ></div>
      <div
        className={`cursor-pointer h-[45px] w-[45px] bg-${
          TOPIC_COLORS.TURQUOISE
        } border-primary ${
          selectedColor === TOPIC_COLORS.TURQUOISE ? "border-4" : "border-none"
        }`}
        onClick={() => setSelectedColor(TOPIC_COLORS.TURQUOISE)}
      ></div>
      <div
        className={`cursor-pointer h-[45px] w-[45px] bg-${
          TOPIC_COLORS.DEEP_SEA_BLUE
        } border-primary ${
          selectedColor === TOPIC_COLORS.DEEP_SEA_BLUE
            ? "border-4"
            : "border-none"
        }`}
        onClick={() => setSelectedColor(TOPIC_COLORS.DEEP_SEA_BLUE)}
      ></div>
      <div
        className={`cursor-pointer h-[45px] w-[45px] bg-${
          TOPIC_COLORS.SLATE_GREY
        } border-primary ${
          selectedColor === TOPIC_COLORS.SLATE_GREY ? "border-4" : "border-none"
        }`}
        onClick={() => setSelectedColor(TOPIC_COLORS.SLATE_GREY)}
      ></div>
      <div
        className={`cursor-pointer h-[45px] w-[45px] bg-${
          TOPIC_COLORS.LIME_GREEN
        } border-primary ${
          selectedColor === TOPIC_COLORS.LIME_GREEN ? "border-4" : "border-none"
        }`}
        onClick={() => setSelectedColor(TOPIC_COLORS.LIME_GREEN)}
      ></div>
      <div
        className={`cursor-pointer h-[45px] w-[45px] bg-${
          TOPIC_COLORS.DARK_PLUM
        } border-primary ${
          selectedColor === TOPIC_COLORS.DARK_PLUM ? "border-4" : "border-none"
        }`}
        onClick={() => setSelectedColor(TOPIC_COLORS.DARK_PLUM)}
      ></div>
      <div
        className={`cursor-pointer h-[45px] w-[45px] bg-${
          TOPIC_COLORS.CHARCOAL
        } border-primary ${
          selectedColor === TOPIC_COLORS.CHARCOAL ? "border-4" : "border-none"
        }`}
        onClick={() => setSelectedColor(TOPIC_COLORS.CHARCOAL)}
      ></div>
    </div>
  );
};

export default ColorPicker;

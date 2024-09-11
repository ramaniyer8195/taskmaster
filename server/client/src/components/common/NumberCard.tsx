import { NumberCardProps } from "@/interfaces/common";

const NumberCard = ({ number, heading, subHeading }: NumberCardProps) => {
  return (
    <div className="flex flex-col items-center bg-muted py-4 px-6 rounded shadow-md min-w-[110px]">
      <h1 className="text-3xl font-extrabold font-display">{number}+</h1>
      <p className="text-xl font-bold font-display">{heading}</p>
      <p>{subHeading}</p>
    </div>
  );
};

export default NumberCard;

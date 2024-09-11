import NumberCard from "@/components/common/NumberCard";
import homepageIllustration from "../../assets/homepage_illustration.svg";

const HomePageText = () => {
  return (
    <div className="flex flex-col items-center">
      <img src={homepageIllustration} alt="Taskmaster" className="mb-4" />
      <div className="flex gap-4 mb-6">
        <NumberCard number={10} heading="Users" subHeading="Active" />
        <NumberCard number={50} heading="Notes" subHeading="Written" />
        <NumberCard number={25} heading="Todos" subHeading="Created" />
      </div>
      <p>What are you waiting for?</p>
      <p>Sign in to your account and start your journey</p>
    </div>
  );
};

export default HomePageText;

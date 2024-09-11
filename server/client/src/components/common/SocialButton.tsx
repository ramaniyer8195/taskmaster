import { SocialButtonProps, Socials } from "@/interfaces/common";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF, FaGoogle, FaLinkedinIn } from "react-icons/fa";

const SocialButton = ({ type }: SocialButtonProps) => {
  const getSocialIcon = () => {
    switch (type) {
      case Socials.FACEBOOK:
        return <FaFacebookF />;
      case Socials.TWITTER:
        return <BsTwitterX />;
      case Socials.GOOGLE:
        return <FaGoogle />;
      case Socials.LINKEDIN:
        return <FaLinkedinIn />;
    }
  };

  return (
    <div className="bg-muted w-[50px] h-[50px] rounded flex items-center justify-center">
      <div className="text-3xl text-primary cursor-pointer">
        {getSocialIcon()}
      </div>
    </div>
  );
};

export default SocialButton;

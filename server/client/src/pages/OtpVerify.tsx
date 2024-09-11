import HomePageText from "@/components/common/HomePageText";
import OtpVerifyForm from "@/components/common/OtpVerifyForm";

const OtpVerify = () => {
  return (
    <div className="flex gap-20 w-full h-full container items-center justify-between">
      <div className="w-1/2">
        <HomePageText />
      </div>
      <div className="w-1/2">
        <OtpVerifyForm />
      </div>
    </div>
  );
};

export default OtpVerify;

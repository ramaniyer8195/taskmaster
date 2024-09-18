import HomePageText from "@/components/common/HomePageText";
import OtpVerifyForm from "@/components/common/OtpVerifyForm";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OtpVerify = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const res = await axios.get("/api/user/getUser");
        if (res.data.data && res.data.data.isVerified) {
          navigate("/");
        }
      } catch (error) {
        console.error(error);
      }
    };

    getCurrentUser();

    const generateOtp = async () => {
      try {
        await axios.get("/api/user/generateOtp");
      } catch (err) {
        console.error(err);
      }
    };

    generateOtp();
  }, []);

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
